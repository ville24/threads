
const mongoose = require('mongoose')

const getOrder = (value) => {
  if (typeof value !== 'undefined') {
     return parseFloat(value.toString())
  }
  return value
}

const confSchema = mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['newsSource'],
    unique: false,    
  },
  title: {
    type: String,
    required: false,
    validate: /^[\w\s!"#\$%&'\(\)\*\+,\-\.\/:;<=>\?@\[\\\]^_`\{\|\}~öäå€–—\xAD]*$/i,    
    minlength: 1,
    maxlength: 1024,
    unique: false
  },
  url: {
    type: String,
    required: false,
    validate: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.,~#?&\/=]*)$/,
    minlength: 0,
    maxlength: 2048,
    unique: false 
  },
  category: {
    type: String,
    required: false,
    validate: /^[\w\säöå&]*$/,
    minlength: 0,
    maxlength: 20,
  },
  order: {
    type: mongoose.Types.Decimal128,
    required: false,
    default: 0,
    get: getOrder
  },
  active: {
    type: Boolean,
    required: false,
    default: true,
  }
}, {toJSON: {getters: true}})

module.exports =  mongoose.model('Conf', confSchema)

