import React from 'react'
import {useQuery} from '@tanstack/react-query'

import {getNewsSources} from '../requests'

import Title from './Title'
import NewsTabBar from './NewsTabBar'
import NewsItems from './NewsItems'
import Spinner from './Spinner'

const NewsBlock = () => {

  const {isPending: isPendingNewsSource, isError: isErrorNewsSource, data: dataNewsSource} = useQuery({
    queryKey: ['newsSources'],
    queryFn: getNewsSources,
    retry: 1
  })

  if (isPendingNewsSource) {

    return <Spinner />

  }

  if (isErrorNewsSource) {

    return <div>Tietojen haku epäonnistui.</div>

  }

  const defineCategories = (sources) => {

    const cats = []

    sources.map((newsSource) => {

      !cats.find((cat) => cat === newsSource.category) && cats.push(newsSource.category)

    })

    return cats

  }

  const newsSources = dataNewsSource.filter((item) => item.active)
  let newsSource = newsSources[0]
  const categories = defineCategories(newsSources)
  let category = categories[0]

  const handleCategoryClick = (event) => {

    category = event.target.value
    newsSource = newsSources.find((newsSource) => newsSource.category === categories[event.target.value])

  }

  const handleNewsSourceClick = (event) => {

    // newsSource = event.target.value

  }

  return <>
    <Title
      text="Uutiset"
      level={2}
    />
    <NewsTabBar
      category={category}
      categories={categories}
      handleCategoryClick={handleCategoryClick}
      newsSource={newsSource}
      newsSources={newsSources}
      handleNewsSourceClick={handleNewsSourceClick}
    />
    <NewsItems
      newsSource={newsSource}
    />
  </>

}

export default NewsBlock
