const supertest = require('supertest')
const app = require('../../app')
const api = supertest(app)
const Conf = require('../../models/conf')
const News = require('../../models/news')
// const helper = require('../test_helper')

describe(
  'News HS test',
  () => {

    /*
     * beforeEach( async () => {
     *  await Conf.deleteMany({})
     *    await Conf.insertMany(helper.confs)
     * })
     */

    test(
      'News are returned as json',
      async () => {

        await api
          .get('/api/rss/63de8972f17fe026ba7cfd06')
          .expect(200)
          .expect(
            'Content-Type',
            /application\/json/
          )

      }
    )

    test(
      'Item amount',
      async () => {

        const response = await api
          .get('/api/rss/63de8972f17fe026ba7cfd06')
          .expect(200)

        expect(response.body.items).toHaveLength(30)
        expect(response.body.count).toBe(30)

      }
    )
/*
  test('HS RSS feed test', async () => {
    const response  = await api
      .get('/api/rss/63de8921f17fe026ba7cfcea')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.items).toHaveLength(30)
    expect(response.body.count).toBe(30)

    response.body.items.forEach(newsitem => {
      expect(newsitem.title).toBeDefined()
      expect(newsitem.url).toBeDefined()
      expect(newsitem.published).toBeDefined()
      expect(newsitem.description).toBeDefined()
      expect(newsitem.imgurl).toBeDefined()
    })
  })

  test('HS RSS feed test invalid rss - title missing', async () => {
    const response  = await api
      .get('/api/rss/63de8921f17fe026ba7cfceb')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.items).toHaveLength(30)
    expect(response.body.count).toBe(30)

    response.body.items.forEach(newsitem => {
      expect(newsitem.title).toBeDefined()
      expect(newsitem.url).toBeDefined()
      expect(newsitem.published).toBeDefined()
      expect(newsitem.description).toBeDefined()
      expect(newsitem.imgurl).toBeDefined()
    })

    expect(response.body.items[1].title).toBe('Otsikko')
  })*/
})