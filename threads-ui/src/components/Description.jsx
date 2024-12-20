import React from 'react'
import PropTypes from 'prop-types'

const Description = (props) => <> { props.text && <div>{props.text}</div> } </>

Description.propTypes = {
  text: PropTypes.string
}

export default Description
