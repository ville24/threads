const rssConf = require('../../controllers/rssConf')

describe(
  'RSS conf test',
  () => {

    test(
      'RSS conf is defined with correct data',
      () => {

        const response = rssConf(
          '63de8972f17fe026ba7cfd06',
          () => {}
        )
        expect(JSON.stringify(response._id)).toEqual('\"63de8972f17fe026ba7cfd06\"')
        expect(response.order).toEqual(3)
        expect(response.active).toEqual(true)
        expect(response.type).toEqual('newsSource')
        expect(response.category).toEqual('Uutiset')
        expect(response.title).toEqual('rss_1')

      }
    )

    test(
      'RSS conf is not found',
      () => {

        const response = rssConf(
          '63de8972f17fe026ba7cfd04',
          () => {}
        )
        expect(response).toBeUndefined()

      }
    )

    test(
      'RSS conf id is invalid',
      () => {

        const response = rssConf(
          '63de8972f17fe026ba7cfd0',
          () => {}
        )
        expect(response).toBeUndefined()

      }
    )

    test(
      'RSS conf id is missing',
      () => {

        const response = rssConf()
        expect(response).toBeUndefined()

      }
    )

  }
)

