var router = require('express').Router()
var ObjectId = require('mongoose').Types.ObjectId;
var dateFormat = require('dateformat')

var Post = require('../models/post')

router.get('/', function (req, res) {

    Post.find({}, function (err, posts) {
        var data = posts
        for (let index = 0; index < data.length; index++) {
            var test = data[index].date
            data[index].date2 = dateFormat((data[index].date), "dddd, mmmm dS, yyyy, h:MM:ss TT");


        }
        res.render('home', {
            posts: data
        })
    })
})

router.get('/add-post', function (req, res, next) {
    res.render('post')
})

router.post('/add-post', function (req, res, next) {
    var post = new Post()

    post.title = req.body.title || ""
    post.content = req.body.content || ""
    post.date = new Date(req.body.date || new Date().toString())
    post.picture = req.body.image || ""

    post.save(function (err) {
        if (err) throw err
        res.redirect('/')
    })
})

router.get('/edit-post/:id', function (req, res, next) {
    Post.findOne({
        "_id": new ObjectId(req.params.id)
    }, function (err, post) {
        post.date2 = dateFormat(post.date, "dddd, mmmm dS, yyyy, h:MM:ss TT");
        res.render('edit', {
            post: post
        })
    })
    // res.render('post')
})

router.post('/edit-post/:id', function (req, res, next) {
    Post.findOne({
        "_id": new ObjectId(req.params.id)
    }, function (err, post) {
        post.title = req.body.title || ""
        post.content = req.body.content || ""
        post.date = new Date(req.body.date || new Date().toString())
        post.picture = req.body.image || ""

        post.save(function (err) {
            if (err) throw err
            res.redirect('/')
        })
    })
})

router.get("/img", function (req, res) {
    var img = new Buffer(req.body.img, 'base64');

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
    });
    res.end(img);
});

module.exports = router