import React from 'react'
import PropTypes from 'prop-types'

NewsBlock.propTypes = {
  text: PropTypes.string.isRequired,
  level: PropTypes.number.isOptional,
  description: PropTypes.string.isOptional,
  url: PropTypes.string.isOptional,
  imgUrl: PropTypes.string.isOptional
}

const NewsBlock = (props) => {


}

export default NewsBlock
