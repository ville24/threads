import React from 'react'
import PropTypes from 'prop-types'

const Title = (props) => {

  const TitleText = () => {

    if (props.level === '1') {

      return <h1>{props.text}</h1>

    } else if (props.level === '2') {

      return <h2>{props.text}</h2>

    } else if (props.level === '3') {

      return <h3>{props.text}</h3>

    } else if (props.level === '4') {

      return <h4>{props.text}</h4>

    } else if (props.level === '5') {

      return <h5>{props.text}</h5>

    } else {

      return <h6>{props.text}</h6>

    }

  }

  return (
    <>
      {
        props.url
          ? <a href={props.url} target="_blank" rel="noreferrer" title={
            !props.description
              ? props.text
              : props.text + '\n\n' + props.description
          }>
            {
              props.imgUrl
                ? <img src={props.imgUrl} alt={
                  !props.description
                    ? props.text
                    : props.text + '\n\n' + props.description} />
                : <div className="imgPlaceholder"></div>
            }
            <TitleText />
          </a>
          : <TitleText />
      }
    </>
  )

}

Title.propTypes = {
  text: PropTypes.string.isRequired,
  level: PropTypes.number.isOptional,
  description: PropTypes.string.isOptional,
  url: PropTypes.string.isOptional,
  imgUrl: PropTypes.string.isOptional
}

export default Title
