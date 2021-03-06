var express = require('express')
var exphbs = require('express-handlebars')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var path = require('path')

var app = express()

mongoose.connect('mongodb://localhost:27017/journaldb', {
  useMongoClient: true
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

var mainRoutes = require('./routes/main')
app.use(mainRoutes)

app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist')))
app.use(express.static(path.join(__dirname, '/node_modules/popper.js/dist')))
app.use(express.static(path.join(__dirname, '/node_modules/jquery/dist')))
app.use(express.static(path.join(__dirname, '/node_modules/pc-bootstrap4-datetimepicker/build')))
app.use(express.static(path.join(__dirname, '/node_modules/font-awesome')))
app.use(express.static(path.join(__dirname, '/node_modules/moment/min')))
app.use(express.static(path.join(__dirname, '/static/')))

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.listen(3000)
