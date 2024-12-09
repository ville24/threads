const supertest = require('supertest')
const app = require('../../app')
const api = supertest(app)

describe(
  'RSS 2.0 tests 2',
  () => {

    test(
      'RSS document is not received',
      async () => {

        await api
          .get('/api/rss/63de8972f17fe026ba7cfd03')
          .expect(404)

      }
    )

  }
)
