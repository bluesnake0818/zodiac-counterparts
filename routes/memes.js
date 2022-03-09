import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as memesCtrl from '../controllers/memes.js'


const router = Router()

router.get('/', memesCtrl.index)
router.get('/:id', memesCtrl.show)
router.get('/:id/edit', isLoggedIn, memesCtrl.edit)

router.post('/', isLoggedIn, memesCtrl.create)
router.put('/:id', isLoggedIn, memesCtrl.update)
router.patch('/:id/flip-funny', isLoggedIn, memesCtrl.flipFunny)
router.delete('/:id', isLoggedIn, memesCtrl.delete)


export {
  router
}