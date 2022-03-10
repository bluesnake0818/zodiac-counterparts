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
    res.render('profiles/edit', {
      profile,
      title: "edit thought"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles')
  })
}

function updateThought(req, res) {
  Profile.findById(req.params.id)
  .then((profile) => {
    Profile.findById(req.user.profile._id)
    .then(self => {
      const isSelf = self._id.equals(profile._id)
      profile.updateOne(req.body, {new: true})
      .then(() => {
        res.redirect(`/profiles/${profile._id}`)
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles`)
  })
}
    
  // })

  // .then(profile => {
  //   if (profile._id.equals(req.user.profile._id)) {
  //     profile.updateOne(req.body, {new: true})
  //     .then(()=> {
  //       res.redirect(`/profile/${profile._id}`)
  //     })
  //   } else {
  //     throw new Error ('🚫 Not authorized 🚫')
  //   }

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