import React from 'react'
import PropTypes from 'prop-types'

import Title from './Title'
import Description from './Description'
import Date from './Date'

const NewsItem = (props) => <div key={props.item._id} className="news-card">
  <div>
    <Title
      text={props.item.title}
      level="3"
      description={props.item.description}
      url={props.item.url}
      imgUrl={props.item.imgUrl}
    />
    <Description text={props.item.description} />
    <div>
      <span>{props.newsSourceTitle}</span>
      <span style={ {padding: '0 0.5em'} }>—</span>
      <Date value={props.item.published} />
    </div>
  </div>
</div>

NewsItem.propTypes = {
  item: PropTypes.string.isRequired,
  newsSourceTitle: PropTypes.string.isRequired
}

export default NewsItem
