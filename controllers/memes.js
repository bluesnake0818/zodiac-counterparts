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

export {
  index
}