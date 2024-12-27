const {test, describe, expect} = require('@playwright/test')

describe(
  'Threads',
  () => {

    test(
      'News Threads can be opened',
      async ({page}) => {

        await page.goto('http://localhost:3004')
        await expect(page.getByText('Threads')).toBeVisible()
        await expect(page.getByText('Julkaistu').first()).toBeVisible()

      }
    )

  }

)
