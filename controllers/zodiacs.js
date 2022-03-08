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
// function update(req, res) {
//   Zodiac.findById(req.params.id)
//   .then(zodiac =>
//     // req.user.profile.hasVoted = true
//     zodiac.updateOne(req.body, {new: true})
//     .then(() => {
//       res.redirect(`/zodiac/${zodiac.id}`)
//     })
//   )
//   .catch(err => {
//     console.log(err)
//     res.redirect(`zodiac`)
//   })
// }

export {
  index,
  show,
  create,
  edit,
  // update,
}