import { Zodiac } from '../models/zodiac.js'

function index(req, res) {
  // console.log("zodiac")
  res.render('zodiacs/index', {
    title: "The Zodiac Sign Pairs"
  })
}

function show(req, res) {
  console.log("sanity check")
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

export {
  index,
  show,
  create,
}