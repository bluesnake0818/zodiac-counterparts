// import res from 'express/lib/response'
// import { redirect } from 'express/lib/response'
import { Zodiac } from '../models/zodiac.js'


function index(req, res) {
  // console.log("zodiac")
  res.render('zodiacs/index', {
    title: "The Zodiac Sign Pairs"
  })
}

function show(req, res) {
  Zodiac.findById(req.params.id)
  .then(zodiac => { 
    // console.log(zodiac.polls)
    const hasVoted = zodiac.polls.filter(poll => {
      // console.log("poll: " + poll)
      return poll.voter.toString() === req.user.profile._id.toString()
    }).length
    // console.log("has voted?:" + hasVoted)
    res.render('zodiacs/show', {
      zodiac,
      hasVoted,
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
  .then(zodiac => res.redirect('/zodiacs'))
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

function deleteZodiac(req, res) {
  console.log('sanity check')
  console.log(req.params.id)
  Zodiac.findByIdAndDelete(req.params.id)
  .then(zodiac => res.redirect('/zodiacs'))
  .catch(err => {
    console.log(err)
    res.json(err)
  })
}

function addVote(req, res) {
  console.log(req.params.id)
  Zodiac.findById(req.params.id)
  .then(zodiac => {
    req.body = {...req.body, voter: req.user.profile._id}
    console.log(req.body)
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
  console.log("zodiac ID " + req.params.zodiacId)
  console.log("comment ID " + req.params.commentId)
  Zodiac.findById(req.params.zodiacId)
  .then(zodiac => {
    zodiac.comments.remove({_id: req.params.commentId})
    zodiac.save()
    .then(() => {
      res.redirect(`/zodiacs/${req.params.zodiacId}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/zodiacs/${req.params.zodiacId}`)
  })
}
  


export {
  index,
  show,
  create,
  edit,
  update,
  deleteZodiac as delete,
  addVote,
  postComment,
  deleteComment,
}