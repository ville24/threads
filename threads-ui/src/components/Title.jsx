import React from 'react'
import PropTypes from 'prop-types'

import TitleText from './TitleText'

const Title = (props) => {

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
              props.imgurl
                ? <img src={props.imgurl} alt={
                  !props.description
                    ? props.text
                    : props.text + '\n\n' + props.description} />
                : <div className="imgPlaceholder"></div>
            }
            <TitleText text={props.text} level={props.level} />
          </a>
          : <TitleText text={props.text} level={props.level} />
      }
    </>
  )

}

Title.propTypes = {
  text: PropTypes.string.isRequired,
  level: PropTypes.number,
  description: PropTypes.string,
  url: PropTypes.string,
  imgurl: PropTypes.string
}

export default Title
