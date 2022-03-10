import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

router.get('/', isLoggedIn, profilesCtrl.index)
router.get('/:id', isLoggedIn, profilesCtrl.show)
router.get('/:id/thoughts/:thoughtId/edit', isLoggedIn, profilesCtrl.editThought)

router.put('/:id/thoughts/:thoughtId', isLoggedIn, profilesCtrl.updateThought)

router.post('/:id/thoughts', isLoggedIn, profilesCtrl.createThought)
router.delete('/thoughts/:id', isLoggedIn, profilesCtrl.deleteThought)

export {
  router
}