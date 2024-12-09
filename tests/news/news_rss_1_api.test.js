const supertest = require('supertest')
const app = require('../../app')
const api = supertest(app)

describe(
  'RSS 2.0 tests 1',
  () => {

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
      'Item amount is 30',
      async () => {

        const response = await api
          .get('/api/rss/63de8972f17fe026ba7cfd06')
          .expect(200)

        expect(response.body.items).toHaveLength(30)
        expect(response.body.count).toBe(30)

      }
    )

    test(
      'All content fields exist for all items',
      async () => {

        const response = await api
          .get('/api/rss/63de8972f17fe026ba7cfd06')
          .expect(200)

        response.body.items.forEach((newsitem) => {

          expect(newsitem._id).toBeDefined()
          expect(newsitem.title).toBeDefined()
          expect(newsitem.url).toBeDefined()
          expect(newsitem.published).toBeDefined()
          expect(newsitem.description).toBeDefined()
          expect(newsitem.imgurl).toBeDefined()

        })

      }
    )

    test(
      'Content is correct for an item',
      async () => {

        const response = await api
          .get('/api/rss/63de8972f17fe026ba7cfd06')
          .expect(200)

        expect(response.body.items[0]._id).toMatch(/^[0-9a-f]{24}$/)
        expect(response.body.items[0].title).toBe('Kuninkaalliset | Tom Cruise ja Joan Collins mukaan Charlesin kruunajaiskonserttiin')
        expect(response.body.items[0].url).toBe('https://www.hs.fi/kulttuuri/art-2000009552098.html')
        expect(response.body.items[0].published).toBe('2023-04-29T09:04:00.000Z')
        expect(response.body.items[0].description).toBe('Kruunajaiset nähdään Suomessa suorana tv-lähetyksenä, seuraavan päivän konsertti vasta viikkoa myöhemmin.')
        expect(response.body.items[0].imgurl).toBe('https://hs.mediadelivery.fi/img/1440/dec97e491954da7cfcec53eea5430252.jpg')

      }
    )

  }
)

/*
 * data näkyy oikein                  OK
 * oikea määrä dataa                  OK
 * tulostettu formaatti oikea: json   OK
 * dataa puuttuu
 * Data on tyhjää
 * data korjataan
 * dataa ei voi korjata
 * tiedostoa ei löydy
 * tiedosto ei ole validi XML
 * lajittelu päivämäärän mukaan toimii
 * tuki eri formaateille: rss2, atom?
 */
