const rssRouter = require('express').Router()
const axios = require('axios')
const convert = require('xml-js')

const config = require('../utils/config')
const newsTools = require('../utils/newsTools')
const purify = require('../utils/purify')
const News = require('../models/news')
const Conf = require('../models/conf')
const confs = require('../confs.json')
const confsTest = require('../confs.test.json')
confsTest


rssRouter.get(
  '/test/:title',
  async (request, response) => {

    process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
      ? response.sendFile(config.RSS_BASE_URL + request.params.title.toLowerCase() + '.rss')
      : response.status(401).json({error: 'No access rights'})

  }
)

rssRouter.get(
  '/:id',
  (request, response, next) => {

    const getRSS = async (item) => {

      const url = process.env.NODE_ENV === 'production'
        ? item.url
        : (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') && 'http://localhost:' + request.socket.localPort + '/api/rss/test/' + item.title

      const {data} = await axios(url)
      const datajs = JSON.parse(convert.xml2json(
        data,
        {
          compact: true,
          spaces: 4
        }
      ))

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
              description: item.description._text
                ? newsTools.descriptionCut(purify.purifyDescription(item.description._text))
                : newsTools.descriptionCut(purify.purifyDescription(item.description._cdata)),
              published: purify.purifyModified(item.pubDate._text)
            }
            newItem.imgurl = purify.purifyURL(newsTools.findFixImage({'enclosures': [item.enclosure && item.enclosure._attributes.url],
              'media:thumbnail': item['media:thumbnail'] && item['media:thumbnail']._attributes.url,
              'description': item.description._text
                ? item.description._text
                : item.description._cdata}))
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
      news.validate()
        .then(() => response.json(news))
        .catch((error) => {

          next(error)

        })

    }

    const conf = new Conf({
      _id: request.params.id,
      type: 'newsSource'
    })
    const error = conf.validateSync()
    if (error) {

      next(error)

    } else {

      const confFile = process.env.NODE_ENV === 'production'
        ? new Conf(confs)
        : (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') && new Conf(confsTest)

      const error = confFile.validateSync()
      if (error) {

        next(error)

      } else {

        getRSS(confFile.newsSources.filter((o) => o.id === request.params.id)[0])

      }

    }

  }
)

module.exports = rssRouter
