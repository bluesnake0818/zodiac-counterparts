import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as memesCtrl from '../controllers/memes.js'


const router = Router()

router.get('/', memesCtrl.index)

router.post('/', isLoggedIn, memesCtrl.create)


export {
  router
}