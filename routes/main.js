var router = require('express').Router()
var ObjectId = require('mongoose').Types.ObjectId
var moment = require('moment')
var multer = require('multer')

var Post = require('../models/post')

var upload = multer({
  dest: 'static/uploads/'
})

router.get('/', function (req, res) {
  Post.find({}, function (err, posts) {
    if (err) {
      console.log(err)
    }
    var data = posts
    for (let index = 0; index < data.length; index++) {
      data[index].date2 = moment(data[index].date).format('MM/DD/YYYY, hh:mm A')
      data[index].imagesrc = 'uploads/' + data[index].picture.filename
    }
    res.render('home', {
      posts: data
    })
  })
})

router.get('/add-post', function (req, res) {
  res.render('post')
})

router.post('/add-post', upload.single('image'), function (req, res, next) {
  var post = new Post()

  post.title = req.body.title || ''
  post.content = req.body.content || ''
  post.date = moment(req.body.date, 'MM/DD/YYYY, hh:mm A') || new Date()
  post.picture = {
    filename: req.file.filename,
    extension: req.file.mimetype
  }

  post.save(function (err) {
    if (err) throw err
    res.redirect('/')
  })
})

router.get('/edit-post/:id', function (req, res) {
  Post.findOne({
    '_id': new ObjectId(req.params.id)
  }, function (err, post) {
    if (err) {
      console.log(err)
    }
    post.date2 = moment(post.date).format('MM/DD/YYYY, hh:mm A')
    res.render('edit', {
      post: post
    })
  })
})

router.post('/edit-post/:id', upload.single('image'), function (req, res, next) {
  Post.findOne({
    '_id': new ObjectId(req.params.id)
  }, function (err, post) {
    if (err) {
      console.log(err)
    }
    post.title = req.body.title || ''
    post.content = req.body.content || ''
    post.date = moment(req.body.date, 'MM/DD/YYYY, hh:mm A') || new Date()
    if (req.file) {
      post.picture = {
        filename: req.file.filename,
        extension: req.file.mimetype
      }
    }

    post.save(function (err) {
      if (err) {
        console.log(err)
      }
      res.redirect('/')
    })
  })
})

module.exports = router
