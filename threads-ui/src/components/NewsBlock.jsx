import React, {useState} from 'react'
import {useQuery} from '@tanstack/react-query'
import PropTypes from 'prop-types'

import {getNewsRSS} from '../requests'

import Title from './Title'
import NewsTabBar from './NewsTabBar'
import NewsItems from './NewsItems'
import Spinner from './Spinner'

const NewsBlock = (props) => {

  const defineCategories = (sources) => {

    const cats = []

    sources.map((source) => {

      !cats.find((cat) => cat === source.category) && cats.push(source.category)

    })

    return cats

  }

  const categories = defineCategories(props.newsSources)

  const [
    newsSourceId,
    setNewsSourceId
  ] = useState(props.newsSources[0].id)
  const [
    category,
    setCategory
  ] = useState(categories[0])

  const newsSourceTitles = props.newsSources.filter((source) => source.category === category).map((source) => source.title)

  const [
    newsSourceTitle,
    setNewsSourceTitle
  ] = useState(newsSourceTitles[0])

  const {isPending: isPendingNewsRSS, isError: isErrorNewsRSS, data: dataNewsRSS} = useQuery({
    queryKey: [
      'newsRSS',
      newsSourceId
    ],
    queryFn: getNewsRSS,
    retry: 1
  })

  if (isPendingNewsRSS) {

    return <Spinner />

  }

  if (isErrorNewsRSS) {

    return <div>Uutisten haku epäonnistui.</div>

  }

  const newsItems = dataNewsRSS

  const handleCategoryClick = (event) => {

    setCategory(event.target.value)

    const source = props.newsSources.filter((newsSource) => newsSource.category === event.target.value)[0]
    setNewsSourceTitle(source.title)
    setNewsSourceId(source.id)

  }

  const handleNewsSourceClick = (event) => {

    setNewsSourceTitle(event.target.value)
    setNewsSourceId(props.newsSources.filter((source) => source.title === event.target.value)[0].id)

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
      newsSourceTitle={newsSourceTitle}
      newsSourcesTitles={newsSourceTitles}
      handleNewsSourceClick={handleNewsSourceClick}
    />
    <NewsItems
      newsSourceId={newsSourceId}
      newsSourceTitle={newsSourceTitle}
      newsItems={newsItems}
    />
  </>

}

NewsBlock.propTypes = {
  newsSources: PropTypes.array.isRequired
}

export default NewsBlock
