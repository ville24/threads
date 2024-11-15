const mongoose = require('mongoose')

const newsSchema = mongoose.Schema({
  items: {
    default: undefined,
    required: false,
    type: [
      {
        _id: {
          type: mongoose.Types.ObjectId,
          required: true
        },
        published: {
          type: Date,
          required: true,
        },
        title: {
          type: String,
          required: true,
          validate: /^[\w\s!"#\$%&'\(\)\*\+,\-\.\/:;<=>\?@\[\\\]^_`\{\|\}~öäå€–—\xADλπαβγδεΣΩÆæØøÜüŠšŽžß”]*$/i,    
          minlength: 1,
          maxlength: 1024,
          unique: false
        },
        description: {
          type: String,
          required: false,
          validate: /^[\w\s!"#\$%&'\(\)\*\+,\-\.\/:;<=>\?@\[\\\]^_`\{\|\}~öäå€–—\xADλπαβγδεΣΩÆæØøÜüŠšŽžß”]*$/i,
          minlength: 0,
          maxlength: 4096,
          unique: false  
        },
        url: {
          type: String,
          required: true,
          validate: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.,~#?&\/=]*)$/,
          minlength: 0,
          maxlength: 2048,
          unique: false 
        },
        imgurl: {
          type: String,
          required: false,
          validate: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.,~#?&\/=]*)$/,
          minlength: 1,
          maxlength: 2048,
          unique: false 
        } 
      }
    ]
  },
  count: {
    type: Number,
    min: 0,
    max: 30,
    required: true,
    unique: false
  }
})

module.exports =  mongoose.model('News', newsSchema)



