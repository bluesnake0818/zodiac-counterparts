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

function flipFunny(req, res) {
  Meme.findById(req.params.id)
  .then(meme => {
    meme.funny = !meme.funny
    meme.save()
    .then(()=> {
      res.redirect(`/memes/${meme._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/memes')
  })
}

function edit(req, res) {
  Meme.findById(req.params.id)
  .then(meme => {
    res.render('memes/edit', {
      meme,
      title: "Edit Meme"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/memes')
  })
}

function update(req, res) {
  Meme.findById(req.params.id)
  .then(meme => {
    if (meme.author.equals(req.user.profile._id)) {
      req.body.funny = !!req.body.tasty
      meme.updateOne(req.body, {new: true})
      .then(()=> {
        res.redirect(`/memes/${meme._id}`)
      })
    } else {
      throw new Error ('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/memes`)
  })
}

function deleteMeme(req, res) {
  Meme.findById(req.params.id)
  .then(meme => {
    if (meme.author.equals(req.user.profile._id)) {
      meme.delete()
      .then(() => {
        res.redirect('/memes')
      })
    } else {
      throw new Error ('🚫 Not authorized 🚫')
    }   
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
  flipFunny,
  edit,
  update,
  deleteMeme as delete,
}