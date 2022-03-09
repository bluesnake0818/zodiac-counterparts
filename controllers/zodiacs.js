// import res from 'express/lib/response'
import { Zodiac } from '../models/zodiac.js'


function index(req, res) {
  // console.log("zodiac")
  res.render('zodiacs/index', {
    title: "The Zodiac Sign Pairs"
  })
}

function show(req, res) {
  // console.log("sanity check")
  Zodiac.findById(req.params.id)
  .then(zodiac => {
    console.log("show zodiac: " + zodiac)
    res.render('zodiacs/show', {
      zodiac,
      title: `${zodiac.wZodName} vs. ${zodiac.eZodName}`
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/zodiacs')
  })
}

function create(req, res) {
  // console.log("create zodiac!")
  Zodiac.create(req.body)
  .then(zodiac => res.json(zodiac))
  .catch(err => {
    console.log(err)
    res.json(err)
  })
}

function edit(req, res) {
  Zodiac.findById(req.params.id)
  .then(zodiac => {
    res.render('zodiacs/edit', {
      zodiac, 
      title: "Take Poll"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/zodiacs')
  })
}

function update(req, res) {
  // console.log("update!")
  Zodiac.findById(req.params.id)
  .then(zodiac => {
    zodiac.updateOne(req.body, {new: true})
    .then(() => {
      res.redirect(`/zodiacs/${zodiac.id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`zodiac`)
  }) 
}

function createPoll(req, res) {
  console.log("createPoll")
  console.log(req.params.id)
  Zodiac.findById(req.params.id)
  .then(zodiac => {
    console.log(zodiac)
    zodiac.polls.push(req.body)
    zodiac.save()
    .then(() => {
      res.redirect(`/zodiacs/${req.params.id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/zodiacs/${req.params.id}`)
  })
}

function postComment(req, res) {
  console.log('post comment')
  Zodiac.findById(req.params.id)
  .then(zodiac => {
    zodiac.comments.push(req.body)
    zodiac.save()
    then(() => {
      res.redirect(`/zodiacs/${req.params.id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/zodiacs/${req.params.id}`)
  })
}

function deleteComment(req, res) {
  const a = Zodiac.findOne({ 'comments._id': req.params.id}).parent.id
  console.log(a)
}
  // .then(comment => {
  //   console.log(comment)
  // })

  // Zodiac.findById(req.params.id)
  // console.log(comments)
  // Zodiac.comments.findByIdAndRemove(req.params.id)
  // console.log(Zodiac.findByIdAndRemove(req.params.id))
  // Profile.findById(req.user.profile._id)
  // .then(profile => {
  //   profile.cats.remove({_id: req.params.id})
  //   profile.save()
  //   .then(()=> {
  //     res.redirect(`/profiles/${req.user.profile._id}`)
  //   })
  // })
  // .catch(err => {
  //   console.log(err)
  //   res.redirect(`/profiles/${req.user.profile._id}`)
  // })

  // console.log("zodiac_id: " + )
  // console.log("comment_id: " + )
  // Zodiac.findById(req.user.profile._id)
  // .then(profile => {
  //   profile.cats.remove({_id: req.params.id})
  //   profile.save()
  //   .then(()=> {
  //     res.redirect(`/profiles/${req.user.profile._id}`)
  //   })
  // })
  // .catch(err => {
  //   console.log(err)
  //   res.redirect(`/profiles/${req.user.profile._id}`)
  // })

export {
  index,
  show,
  create,
  edit,
  update,
  createPoll,
  postComment,
  deleteComment,
}