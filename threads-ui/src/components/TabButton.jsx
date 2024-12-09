import React from 'react'
import PropTypes from 'prop-types'

TabButton.propTypes = {
  id: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  title: PropTypes.number.isRequired,
  name: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  handleClick: PropTypes.string.isRequired
}

const TabButton = (props) => <button
  key={props.id}
  className={props.style}
  type="button"
  name={props.name}
  value={props.value}
  onClick={props.handleClick}
>{props.title}</button>

export default TabButton
