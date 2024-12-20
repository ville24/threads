import axios from 'axios'

const baseUrl = 'http://localhost:3004/'
// const baseUrl = 'https://super-duper-parakeet-wjwqv65q7qhx49-8081.app.github.dev/'

export const getNewsSources = async () => {

  const response = await axios.get(baseUrl + 'api/conf?type=newsSource')
  return response.data.newsSources

}

export const getNewsRSS = async (query) => {

  const response = await axios.get(baseUrl + 'api/rss/' + query.queryKey[1])
  return response.data.items

}
