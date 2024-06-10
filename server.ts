import { load } from 'cheerio'

export const code = async () => {
  try {
    const response = await fetch(
      'https://thiago-bastos.com/carreira-de-sucesso',
    )

    if (!response.ok) {
      throw new Error('Failed to fetch the website')
    }

    const html = await response.text()

    const $ = load(html)

    return $('head').html()
  } catch (err) {
    console.error(err)

    return null
  }
}

console.log('code', await code())
