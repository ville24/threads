import React from 'react'
import PropTypes from 'prop-types'

const TabButton = (props) => <button
  className={props.style}
  type="button"
  name={props.name}
  value={props.value}
  onClick={(props.handleClick)}
>{props.title}</button>

TabButton.propTypes = {
  style: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default TabButton
