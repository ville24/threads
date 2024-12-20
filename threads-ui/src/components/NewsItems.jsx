import React from 'react'
import PropTypes from 'prop-types'
// import {useQuery} from '@tanstack/react-query'

// import {getNewsRSS} from '../requests'

// import Spinner from './Spinner'
import NewsItem from './NewsItem'

const NewsItems = (props) => {

  console.log('newsSourceId2', props.newsSourceId)

  /*
  const {isPending: isPendingNewsRSS, isError: isErrorNewsRSS, data: dataNewsRSS} = useQuery({
    queryKey: [
      'newsRSS',
      props.newsSourceId
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

  const newsItems = dataNewsRSS*/

  return <div>
    {
      props.newsItems.map((newsItem) => <NewsItem key={newsItem._id} item={newsItem} newsSourceTitle={props.newsSource.title} />)
    }
  </div>

}

NewsItems.propTypes = {
  newsSourceId: PropTypes.string.isRequired,
  newsSource: PropTypes.object.isRequired,
  newsItems: PropTypes.array.isRequired
}

export default NewsItems
