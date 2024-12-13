import React from 'react'
import PropTypes from 'prop-types'

import NewsTabs from './NewsTabs'

const NewsTabBar = (props) => <>
  <NewsTabs
    type="category"
    tab={props.category}
    tabList={props.categories}
    handleClick={props.handleCategoryClick}
  />
  <NewsTabs
    type="newsSource"
    tab={props.newsSource}
    tabList={props.newsSources.map((item) => item.title)}
    handleClick={props.handleNewsSourceClick}
  />
</>

NewsTabBar.propTypes = {
  category: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  handleCategoryClick: PropTypes.func.isRequired,
  newsSource: PropTypes.string.isRequired,
  newsSources: PropTypes.array.isRequired,
  handleNewsSourceClick: PropTypes.func.isRequired
}

export default NewsTabBar
