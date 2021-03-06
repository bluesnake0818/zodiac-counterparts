import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'  
const router = Router()
import *  as zodiacsCtrl from '../controllers/zodiacs.js'



// GET - localhost:3000/zodiacs
router.get('/', zodiacsCtrl.index)
// GET - localhost:3000/zodiacs/:id
router.get('/:id', zodiacsCtrl.show)
// GET - localhost:3000/zodiacs/:id/edit
router.get('/:id/edit', isLoggedIn, zodiacsCtrl.edit)

// POST - localhost:3000/zodiacs
router.post('/', isLoggedIn, zodiacsCtrl.create)

// PUT - localhost:3000/zodiacs/:id
router.put('/:id', isLoggedIn, zodiacsCtrl.update)

// POST - localhost:3000/zodiacs/:id/polls
router.post('/:id/polls', isLoggedIn, zodiacsCtrl.addVote)

// DELETE - localhost:3000/zodiacs/:id
router.delete('/:id', isLoggedIn, zodiacsCtrl.delete)

// POST - localhost:3000/zodiacs/:id/comments
router.post('/:id/comments', isLoggedIn, zodiacsCtrl.postComment)

// DELETE - localhost:3000/zodiacs/:zodiacId/comments/:commentId
router.delete('/:zodiacId/comments/:commentId', isLoggedIn, zodiacsCtrl.deleteComment)

// router.get('/:zodiacId/comments/', isLoggedIn, zodiacsCtrl.commentsIndex)

export {
  router
}