import React from 'react'
import PropTypes from 'prop-types'
import {useQuery} from '@tanstack/react-query'

import {getNewsRSS} from '../requests'

import NewsItem from './NewsItem'

const NewsItems = (props) => {

  const {isPending: isPendingNewsRSS, isError: isErrorNewsRSS, data: dataNewsRSS} = useQuery({
    queryKey: [
      'newsRSS',
      props.newsSource.id
    ],
    queryFn: getNewsRSS,
    retry: 1
  })

  if (isPendingNewsRSS) {

    return <div>Ladataan...</div>

  }

  if (isErrorNewsRSS) {

    return <div>Uutisten haku epäonnistui.</div>

  }

  const newsItems = dataNewsRSS

  return <div>
    {
      newsItems.map((newsItem) => <NewsItem key={newsItem.id} item={newsItem} newsSourceTitle={props.newsSource.title} />)
    }
  </div>

}

NewsItems.propTypes = {
  newsSource: PropTypes.object.isRequired
}

export default NewsItems
