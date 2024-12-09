import React from 'react'
import PropTypes from 'prop-types'

Description.propTypes = {
  text: PropTypes.string.isOptional
}

const Description = (props) => <> { props.text && <div>{props.text}</div> } </>

export default Description
