const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useFindAndModify', false)

  const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author:  {
      type: String,
      required: true, 
      unique: true,
    },
    url:{
      type: String,
      required: true, 
      unique: true,
    },
    likes:{
      type: Number,
      required: true, 
      unique: true,
    }
  })
blogSchema.plugin(uniqueValidator);

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)