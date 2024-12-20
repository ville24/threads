import React, {useState} from 'react'
import {useQuery, useQueryClient} from '@tanstack/react-query'
import PropTypes from 'prop-types'

import {getNewsRSS} from '../requests'

import Title from './Title'
import NewsTabBar from './NewsTabBar'
import NewsItems from './NewsItems'
import Spinner from './Spinner'

const NewsBlock = (props) => {

  const [newsSourceId, setNewsSourceId] = useState(props.newsSources[0].id)

  const queryClient = useQueryClient()

  const defineCategories = (sources) => {

    const cats = []

    sources.map((newsSource) => {

      !cats.find((cat) => cat === newsSource.category) && cats.push(newsSource.category)

    })

    return cats

  }

  const newsSource = props.newsSources[0]
  //let newsSourceId = newsSource.id
  const categories = defineCategories(props.newsSources)
  let category = categories[0]

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

    // console.log('click category', newsSources.filter((newsSource) => newsSource.category === event.target.value)[0])
    category = event.target.value
    setNewsSourceId(props.newsSources.filter((newsSource) => newsSource.category === event.target.value)[0].id)
    // newsSource = newsSources.filter((newsSource) => newsSource.category === event.target.value)[0]
    // queryClient.invalidateQueries({queryKey: ['newsRSS']})

  }

  const handleNewsSourceClick = (event) => {

    // console.log('click newssource', event.target.value, newsSources, newsSources.filter((source) => source.title === event.target.value))
    setNewsSourceId(props.newsSources.filter((source) => source.title === event.target.value)[0].id)
    // newsSource = newsSources.filter((newsSource) => newsSource.category === event.target.value)[0]
    console.log('newsSourceId1', newsSourceId)
    // queryClient.invalidateQueries({queryKey: ['newsRSS']})

  }

  console.log('newsSourceId3', newsSourceId)

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
      newsSources={props.newsSources}
      handleNewsSourceClick={handleNewsSourceClick}
    />
    <NewsItems
      newsSourceId={newsSourceId}
      newsSource={newsSource}
      newsItems={newsItems}
    />
  </>

}

NewsBlock.propTypes = {
  newsSources: PropTypes.array.isRequired
}

export default NewsBlock
