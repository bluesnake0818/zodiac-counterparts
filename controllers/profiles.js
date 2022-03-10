import { Profile } from '../models/profile.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
			title: "Zodiac Profiles"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .then((profile) => {
    Profile.findById(req.user.profile._id)
    .then(self => {
      const isSelf = self._id.equals(profile._id)
      res.render("profiles/show", {
        title: `${profile.name}'s profile`,
        profile,
        isSelf,
      })
    })
  })
  .catch((err) => {
    console.log(err)
    res.redirect("/")
  })
}

function createThought(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    for (let key in req.body) {
      if(req.body[key] === "") delete req.body[key]
    }
    profile.thoughts.push(req.body)
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function editThought(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    const thought = profile.thoughts.filter(thought => {
      return thought._id.toString() === req.params.thoughtId
    })[0]
    res.render('profiles/edit', {
      profile,
      thought,
      title: "edit thought"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles')
  })
}

function updateThought(req, res) {
  Profile.updateOne(
    {_id: req.params.id, "thoughts._id": req.params.thoughtId}, 
    {
      $set: 
      {
        "thoughts.$.title": req.body.title,
        "thoughts.$.mood": req.body.mood,
        "thoughts.$.comment": req.body.comment,
      }
    })
  .then(() => {
    res.redirect(`/profiles/${req.params.id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.params.id}`)
  })
}

function deleteThought(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.thoughts.remove({_id: req.params.id})
    profile.save()
    .then(()=> {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

export {
  index,
  show,
  createThought,
  deleteThought,
  editThought,
  updateThought,
}