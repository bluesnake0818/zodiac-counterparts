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

export {
  index, 
  create,
}