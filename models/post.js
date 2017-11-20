var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PostSchema = new Schema({
  title: String,
  content: String,
  date: Date,
  picture: String
})

module.exports = mongoose.model('Post', PostSchema)
