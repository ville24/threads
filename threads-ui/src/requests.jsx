import axios from 'axios'

const port = import.meta.env.VITE_APP_PORT
  ? import.meta.env.VITE_APP_PORT
  : 80

console.log(import.meta.env.VITE_APP_PORT)

const baseUrl = 'http://localhost:' + port + '/'

// const baseUrl = 'http://localhost:8081/'

// const baseUrl = 'https://super-duper-parakeet-wjwqv65q7qhx49-8081.app.github.dev/'

export const getNewsSources = async () => {

  const response = await axios.get(baseUrl + 'api/conf?type=newsSource')
  return response.data.newsSources

}

export const getNewsRSS = async (query) => {

  const response = await axios.get(baseUrl + 'api/rss/' + query.queryKey[1])
  return response.data.items

}
