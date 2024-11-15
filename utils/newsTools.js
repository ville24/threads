const descriptionCut = (text) => {
  let found = false

  const matches = [...text.matchAll(/[a-zåöä)]\./g)]
  matches.slice(0).reverse().map(match => {
    !found && match.index < 200 && (text = text.substring(0, match.index + 2)) && (found = true)
  })
  !found && (text = text.substring(0, 200)+'...')

  return text
}

const findFixImage = (item)  => {

  let img
  
  if (item.enclosures && item.enclosures[0] && item.enclosures[0].url) {
    img = item.enclosures[0].url
  }
  else if (item.enclosures && item.enclosures[0]) {
    img = item.enclosures[0]
  }
  else if (item['media:thumbnail']) {
    img = item['media:thumbnail']
  }
  else {
    const imgMatch = item.description ? item.description.match(/<img.*?src="(.*?)".*?>/) : null
    imgMatch && imgMatch[1] && (img = imgMatch[1])
  }

  img && (img = img.replace(/images.cdn.yle.fi\/image\/upload\/(.*?)\/(.*?)\.jpg/gm, 'images.cdn.yle.fi/image/upload//w_800,q_auto/$2.jpg'))
  
  return img ? img : ''
}

const contentFilter = (item) => {
  console.log(item)
  return item['dc:creator'] && item['dc:creator']._cdata .match(/toni jalovaara/i) ? false : true
}



module.exports = { 
  descriptionCut,
  findFixImage,
  contentFilter
}