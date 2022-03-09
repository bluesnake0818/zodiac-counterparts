import { Meme } from '../models/meme.js'

function index(req, res) {
  Meme.find({})
  .then(memes => {
    res.render('memes/index', {
      memes,
      title: "Memes"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/memes")
  })
}

function create(req, res) {
  req.body.author = req.user.profile._id
	req.body.funny = !!req.body.funny
  Meme.create(req.body)
  .then(meme => {
    res.redirect('/memes')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/memes')
  })
}

function show(req, res) {
  Meme.findById(req.params.id)
  .populate("author")
  .then(meme => {
    res.render('memes/show', {
      meme,
      title: "🐶Meme show"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/memes')
  })
}

export {
  index, 
  create,
  show,
}