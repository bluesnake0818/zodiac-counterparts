import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'  
const router = Router()
import *  as zodiacsCtrl from '../controllers/zodiacs.js'



// GET - localhost:3000/zodiacs
router.get('/', zodiacsCtrl.index)
// GET - localhost:3000/zodiacs/:id
router.get('/:id', zodiacsCtrl.show)
// GET - localhost:3000/zodiacs/:id/edit
router.get('/:id/edit', zodiacsCtrl.edit)

// POST - localhost:3000/zodiacs
router.post('/', zodiacsCtrl.create)

// PUT - localhost:3000/zodiacs/:id
router.put('/:id', zodiacsCtrl.update)

// POST - localhost:3000/zodiacs/:id/polls
router.post('/:id/polls', isLoggedIn, zodiacsCtrl.addVote)

// POST - localhost:3000/zodiacs/:id/comments
router.post('/:id/comments', isLoggedIn, zodiacsCtrl.postComment)

// DELETE - localhost:3000/zodiacs/comments/Id
router.delete('/comments/:id', isLoggedIn, zodiacsCtrl.deleteComment)



// PUT - localhost:3000/zodiacs/:id
// router.put('/:id', zodiacsCtrl.update)

// isLoggedIn,

export {
  router
}