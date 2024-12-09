import React from 'react'
import PropTypes from 'prop-types'

Date.propTypes = {
  value: PropTypes.string.isRequired
}

const parseRelDate = (dateString) => {

  const diff = new Date() - new Date(dateString)
  const diffDate = (new Date(new Date() + ''.substring(
    0,
    10
  )) - new Date(dateString.substring(
    0,
    10
  ))) / 86400000

  var msg
  if (diff < 60000) {

    msg = 'Julkaistu äskettäin'

  } else if (diff < 120000) {

    msg = 'Julkaistu minuutti sitten'

  } else if (diff < 3600000) {

    msg = 'Julkaistu ' + Math.floor(diff / 60 / 1000) + ' minuuttia sitten'

  } else if (diff < 7200000) {

    msg = 'Julkaistu tunti sitten'

  } else if (diffDate === 1) {

    msg = 'Julkaistu eilen'

  } else if (diff < 86400000) {

    msg = 'Julkaistu ' + Math.floor(diff / 60 / 60 / 1000) + ' tuntia sitten'

  } else if (diffDate < 3) {

    msg = 'Julkaistu toissapäivänä'

  } else {

    msg = 'Julkaistu ' + Math.floor(diffDate) + ' päivää sitten'

  }

  return msg

}

const Date = (props) => <span>{parseRelDate(props.value)}</span>

export default Date
