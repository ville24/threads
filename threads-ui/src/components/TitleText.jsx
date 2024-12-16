import React from 'react'
import PropTypes from 'prop-types'

const TitleText = (props) => {

  switch (props.level) {

  case 1:
    return <h1>{props.text}</h1>

  case 2:
    return <h2>{props.text}</h2>

  case 3:
    return <h3>{props.text}</h3>

  case 4:
    return <h4>{props.text}</h4>

  case 5:
    return <h5>{props.text}</h5>

  default:
    return <h6>{props.text}</h6>

  }

}

TitleText.propTypes = {
  text: PropTypes.string.isRequired,
  level: PropTypes.number
}

export default TitleText
