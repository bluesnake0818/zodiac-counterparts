import { Router } from 'express'
import * as memesCtrl from '../controllers/memes.js'

const router = Router()

router.get('/', memesCtrl.index)


export {
  router
}