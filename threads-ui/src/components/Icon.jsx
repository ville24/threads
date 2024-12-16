import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({type}) => {

  const svg = () => {

    switch (type) {

    case 'spinner':
      return (
        <svg
          className="loading"
          width="100"
          height="100"
          xmlns="http://www.w3.org/2000/svg"
          style={{transform: 'scale(0.1)'}}
        >
          <path
            d="M 50 10 A 40 40 0 1 1 22 22"
            style={{
              stroke: '#cccccc',
              strokeWidth: '5',
              fill: 'none'
            }}
          />
        </svg>
      )

    }

  }
  return (
    <>{ svg() }</>
  )

}

Icon.propTypes = {
  type: PropTypes.string.isRequired
}

export default Icon
