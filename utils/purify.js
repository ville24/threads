const mongoose = require('mongoose')
const {decode} = require('html-entities')

const parseJSON = (json) => {
  try {
    return JSON.parse(json)
  }
  catch(event) {
    return json
  }
}

const purifyItem = (item) => {
  const itemP = {}
  item = parseJSON(item)
  
  if (typeof item !== 'object' || (!item.title && !item.url && !item.description)) {
    return {}
  }

  itemP.status = purifyStatus(item.status)
  item.archive === 1 && (itemP.status = 'archived')
  
  itemP.category = purifyCategory(item.category)
  item.category === 'pikalinkki' && (itemP.category = 'links')
  item.category === 'ajankohtaista' && (itemP.type = 'ajankohtainen')
  item.category === 'tallenne' && (itemP.type = 'tallenne')
  
  item.tags && item.tags.forEach(tag => {
    (tag === 'tallenne' || tag === 'tallenne:video' || tag === 'tallenne%3Avideo') ? (itemP.type = 'tallenne') : null
    tag === 'ajankohtaista' && (itemP.type = 'ajankohtainen')
  })
  purifyTags(item.tags) && (itemP.tags = purifyTags(item.tags))

  itemP.created = purifyCreated(item.created)

  purifyModified(item.modified) && (itemP.modified = purifyModified(item.modified))

  purifyURL(item.url) && (itemP.url = purifyURL(item.url))

  itemP.title = purifyTitle(item.title)
  itemP.title === 'Otsikko' && itemP.url && (itemP.title = purifyURLtoTitle(itemP.url))
  
  purifyType(item.type) && (itemP.type = purifyType(item.type))

  purifyDescription(item.description) && (itemP.description = purifyDescription(item.description))

  itemP._id = purifyID(item._id)

  return itemP
}

const purifyStatus = (status) => {
  return status === 'active' || status === 'archived' ? status : 'active'
}

const purifyCategory = (category) => {
  return category === 'links' || category === 'notes' ? category : 'bookmarks'
}

const purifyTags = (tags) => {
  if (tags && tags.length !== 0) {
    let tagList = []
    tags && tags.forEach(tag => {
      tag && 
        typeof tag !== 'boolean' &&
        (tag.match(/%[A-Fa-f0-9]{2}/) ? (tag = decodeURIComponent(tag)) : true) &&
        (tag = tag.replace(/([\s])/g, ' ')) &&
        (tag =tag.toLowerCase()) &&
        (tag = tag.replace(/[^\sabcdefghijklmnopqrstuvwxyzåöä0123456789:&]/g, '')) &&
        (tag = tag.replace(/([\s][\s]*)/g, ' ')) &&
        (tag = tag.replace(/([:][:]*)/g, ':')) &&
        (tag = tag.replace(/^([:])/, '')) &&
        (tag = tag.replace(/([:])$/, '')) &&
        (tag = tag.replace(/([\s][:])/g, ':')) &&
        (tag = tag.replace(/([:][\s])/g, ':')) &&
        (tag = tag.replace(/([:][:]*)/g, ':')) &&
        (tag = tag.replace(/^([:])/, '')) &&
        (tag = tag.replace(/([:])$/, '')) &&
        (tag = tag.trim()) &&
        (tag = tag.substring(0,100)) &&
        ((tag === 'tallenne' || tag === 'tallenne:video') ? false : true) &&
        (tag === 'ajankohtaista' ? false : true) &&
        tagList.push(tag)
    })
    tagList = tagList.sort()
    return tagList.length !== 0 ? tagList : false
  }
}

const purifyCreated = (created) => {
  return created && new Date(created) != 'Invalid Date' ? new Date(created) : new Date()
}

const purifyModified = (modified) => {
  return (modified && new Date(modified)!= 'Invalid Date') ? new Date(modified) : false
}

const purifyTitle = (title) => {
  let result = title && typeof title !== 'boolean' && !String(title).match(/^otsikko$/i) ? title : 'Otsikko'
  if (String(title).match(/%[A-Fa-f0-9]{2}/)) {
    try {
      result = decodeURIComponent(title)
    }
    catch (err) {}
  }
  result = decode(result)
  String(result).match(/^https?:\/\//) && (result = String(result)
    .replace(/^https?:\/\//, '')
    .replace(/[\/]/g, ' ')
    .replace(/[\-]/g, ' '))
    result = String(result)
    .replace(/([\s][\s]*)/g, ' ')
    .replace(/[^\w\sÅÄÖåäö!"#\$%&'\(\)\*\+,\-\.\/:;<=>\?@\[\\\]^_`\{\|\}~€–—\xADλπαβγδεΣΩÆæØøÜüŠšŽžß”]/g, '*** ')
    .trim()
    .substring(0,1024)

  return result
}

const purifyType = (type) => {
  return (type && (type === 'tallenne' || type === 'ajankohtainen')) ? type : false
}

const purifyDescription = (description) => {
  let result

  description && typeof description !== 'boolean' && description !== 'undefined' && (result = description)
  if (String(description).match(/%[A-Fa-f0-9]{2}/)) {
    try {
      result = decodeURIComponent(description)
    }
    catch (err) {}
  }
  result && (result = result.replace(/<.*?>/g, ''))
  result = decode(result)
  result && (result = String(result)
  .replace(/([ ][ ]*)/g, ' ')
  .replace(/([\t][\t]*)/g, ' ')
  .replace(/([\r][\r]*)/g, '\n')
  .replace(/([\v][\v]*)/g, '\n')
  .replace(/([\f][\f]*)/g, '\n')
  .replace(/([\n] )/g, '\n')
  .replace(/( [\n])/g, '\n')
  .replace(/[^\w\sÅÄÖåäö!"#\$%&'\(\)\*\+,\-\.\/:;<=>\?@\[\\\]^_`\{\|\}~€–—\xAD\nλπαβγδεΣΩÆæØøÜüŠšŽžß”]/g, '*** ')
  .trim()
  .substring(0,4096))

  return result
}


const purifyURL = (url) => {
  let result
  url && 
    typeof url !== 'boolean' && 
    url !== 'undefined' && 
    (url = url.replace(/%3A/gi,':')) &&
    (url = url.replace(/%2F/gi,'/')) &&
    (url = url.replace(/%3F/gi,'?')) &&
    (url = url.replace(/%3D/gi,'=')) &&
    (String(url).match(/^https?:\/\//) ? true : (url = 'https://' + url)) && 
    (String(url).match(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.,~#?&\/=]*)$/)) && 
    (result = url)

  result && (result = String(result).substring(0,2048))
  return result ? result : false
}

const purifyID = (id) => {
  return  id && id.$oid 
  ? mongoose.Types.ObjectId.isValid(id.$oid) && id.$oid.length === 24 ? id.$oid : id = new mongoose.Types.ObjectId
  : mongoose.Types.ObjectId.isValid(id) && id.length === 24 ? id : id = new mongoose.Types.ObjectId
}

const purifyURLtoTitle = (url) => {
  return purifyTitle(url)
}


module.exports = {
  purifyItem,
  purifyStatus,
  purifyCategory,
  purifyTags,
  purifyCreated,
  purifyModified,
  purifyTitle,
  purifyType,
  purifyDescription,
  purifyURL,
  purifyID,
  purifyURLtoTitle
}