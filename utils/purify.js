const mongoose = require('mongoose')
const {decode} = require('html-entities')

const purifyModified = (modified) => {

  return modified && new Date(modified) != 'Invalid Date'
    ? new Date(modified)
    : false

}

const purifyTitle = (title) => {

  let result = title && typeof title !== 'boolean' && !String(title).match(/^otsikko$/i)
    ? title
    : 'Otsikko'
  if (String(title).match(/%[A-Fa-f0-9]{2}/)) {

    try {

      result = decodeURIComponent(title)

    } catch {}

  }
  result = decode(result)
  String(result).match(/^https?:\/\//) && (result = String(result)
    .replace(
      /^https?:\/\//,
      ''
    )
    .replace(
      /[\/]/g,
      ' '
    )
    .replace(
      /[\-]/g,
      ' '
    )
  )
  result = String(result)
    .replace(
      /([\s][\s]*)/g,
      ' '
    )
    .replace(
      /[^\w\sÅÄÖåäö!"#\$%&'\(\)\*\+,\-\.\/:;<=>\?@\[\\\]^_`\{\|\}~€–—\xADλπαβγδεΣΩÆæØøÜüŠšŽžß”]/g,
      '*'
    )
    .trim()
    .substring(
      0,
      1024
    )

  return result

}

const purifyDescription = (description) => {

  let result

  description && typeof description !== 'boolean' && description !== 'undefined' && (result = description)
  if (String(description).match(/%[A-Fa-f0-9]{2}/)) {

    try {

      result = decodeURIComponent(description)

    } catch {}

  }
  result && (result = result.replace(
    /<.*?>/g,
    ''
  )
  )
  result = decode(result)
  result && (result = String(result)
    .replace(
      /([ ][ ]*)/g,
      ' '
    )
    .replace(
      /([\t][\t]*)/g,
      ' '
    )
    .replace(
      /([\r][\r]*)/g,
      '\n'
    )
    .replace(
      /([\v][\v]*)/g,
      '\n'
    )
    .replace(
      /([\f][\f]*)/g,
      '\n'
    )
    .replace(
      /([\n] )/g,
      '\n'
    )
    .replace(
      /( [\n])/g,
      '\n'
    )
    .replace(
      /[^\w\sÅÄÖåäö!"#\$%&'\(\)\*\+,\-\.\/:;<=>\?@\[\\\]^_`\{\|\}~€–—\xAD\nλπαβγδεΣΩÆæØøÜüŠšŽžß”]/g,
      '*'
    )
    .trim()
    .substring(
      0,
      4096
    ))

  return result

}


const purifyURL = (url) => {

  let result
  url &&
    typeof url !== 'boolean' &&
    url !== 'undefined' &&
    (url = url.replace(
      /%3A/gi,
      ':'
    )) &&
    (url = url.replace(
      /%2F/gi,
      '/'
    )) &&
    (url = url.replace(
      /%3F/gi,
      '?'
    )) &&
    (url = url.replace(
      /%3D/gi,
      '='
    )) &&
    (String(url).match(/^https?:\/\//)
      ? true
      : url = 'https://' + url) &&
    String(url).match(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.,~#?&\/=]*)$/) &&
    (result = url)

  result && (result = String(result).substring(
    0,
    2048
  ))
  return result
    ? result
    : false

}

const purifyID = (id) => {

  return id && id.$oid
    ? mongoose.Types.ObjectId.isValid(id.$oid) && id.$oid.length === 24
      ? id.$oid
      : id = new mongoose.Types.ObjectId()
    : mongoose.Types.ObjectId.isValid(id) &&
      id.length === 24
      ? id
      : id = new mongoose.Types.ObjectId()

}

const purifyURLtoTitle = (url) => {

  return purifyTitle(url)

}

module.exports = {
  purifyModified,
  purifyTitle,
  purifyDescription,
  purifyURL,
  purifyID,
  purifyURLtoTitle
}
