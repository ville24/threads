import React from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'

const NewsItems = (props) => {

  return <div>
    {
      props.newsItems.map((newsItem) => <NewsItem key={newsItem._id} item={newsItem} newsSourceTitle={props.newsSourceTitle} />)
    }
  </div>

}

NewsItems.propTypes = {
  newsSourceId: PropTypes.string.isRequired,
  newsSourceTitle: PropTypes.string.isRequired,
  newsItems: PropTypes.array.isRequired
}

export default NewsItems
