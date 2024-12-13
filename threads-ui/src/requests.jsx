import axios from 'axios'

const baseUrl = 'https://super-duper-parakeet-wjwqv65q7qhx49-8081.app.github.dev/'

export const getNewsSources = () => axios.get(baseUrl + 'api/conf?type=newsSource').then((res) => res.data.newsSources)

export const getNewsRSS = (id) => axios.get(baseUrl + 'api/rss/' + id.queryKey[1]).then((res) => res.data.items)
