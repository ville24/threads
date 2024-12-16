const rssRouter = require('express').Router()
const axios = require('axios')
const convert = require('xml-js')
const fs = require('node:fs')

const config = require('../utils/config')
const newsTools = require('../utils/newsTools')
const purify = require('../utils/purify')
const News = require('../models/news')
const rssConf = require('./rssConf')

rssRouter.get(
  '/:id',
  (request, response, next) => {

    const parseDatajs = (datajs) => {

      const news = new News({
        items: [],
        count: 0
      })
      if (datajs.rss) {

        datajs.rss.channel.item.forEach((item, index) => {

          if (index < 30 && newsTools.contentFilter(item)) {

            const newItem = {
              _id: purify.purifyID(item.id),
              title: item.title._text
                ? purify.purifyTitle(item.title._text)
                : purify.purifyTitle(item.title._cdata),
              url: purify.purifyURL(item.link._text),
              description: item.description && (item.description._text
                ? newsTools.descriptionCut(purify.purifyDescription(item.description._text))
                : newsTools.descriptionCut(purify.purifyDescription(item.description._cdata))),
              published: purify.purifyModified(item.pubDate._text)
            }
            newItem.imgurl = purify.purifyURL(newsTools.findFixImage({'enclosure': item.enclosure && item.enclosure._attributes.url,
              'media:thumbnail': item['media:thumbnail'] && item['media:thumbnail']._attributes.url,
              'description': item.description && (item.description._text
                ? item.description._text
                : item.description._cdata)}))
            !newItem.imgurl && delete newItem.imgurl
            news.items.push(newItem)
            news.count = index + 1

          }

        })

      }

      if (datajs.feed) {

        datajs.feed.entry.forEach((item, index) => {

          if (index < 30 && newsTools.contentFilter(item)) {

            const newItem = {
              _id: purify.purifyID(item.id),
              title: item.title._text
                ? purify.purifyTitle(item.title._text)
                : purify.purifyTitle(item.title._cdata),
              url: purify.purifyURL(item.link._attributes.href),
              description: newsTools.descriptionCut(purify.purifyDescription(item['media:group']['media:description']._text)),
              published: purify.purifyModified(item.published._text)
            }
            newItem.imgurl = purify.purifyURL(newsTools.findFixImage({
              'enclosures': [item.enclosure && item.enclosure._attributes.url],
              'media:thumbnail': (item['media:thumbnail'] && item['media:thumbnail']._attributes.url) || (item['media:group']['media:thumbnail'] && item['media:group']['media:thumbnail']._attributes.url)
            }))
            !newItem.imgurl && delete newItem.imgurl
            news.items.push(newItem)
            news.count = index + 1

          }

        })

      }


      news.items.sort((a, b) => b.published - a.published)
      return news

    }

    const convertXMLtoJSON = (dataXML) => {

      return JSON.parse(convert.xml2json(
        dataXML,
        {
          compact: true,
          spaces: 4
        }
      ))

    }

    let newsSource

    try {

      newsSource = rssConf(request.params.id)

    } catch (error) {

      next(error)

    }

    try {

      if (process.env.NODE_ENV === 'production') {

        const url = newsSource.url

        axios(url)
          .then((res) => {

            const rssJSON = convertXMLtoJSON(res.data)

            const rssParsed = parseDatajs(rssJSON)

            rssParsed.validate()
              .then(() => response.json(rssParsed))
              .catch((error) => {

                next(error)

              })

          })

      } else if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {

        const rssJSON = convertXMLtoJSON(fs.readFileSync(
          config.RSS_BASE_URL + newsSource.title + '.rss',
          'utf8'
        ))

        const rssParsed = parseDatajs(rssJSON)

        rssParsed.validate()
          .then(() => response.json(rssParsed))
          .catch((error) => {

            next(error)

          })

      } else {

        throw new Error({
          name: 'SyntaxError',
          message: 'Invalid environment'
        })

      }

    } catch (error) {

      next(error)

    }

  }

)

module.exports = rssRouter
