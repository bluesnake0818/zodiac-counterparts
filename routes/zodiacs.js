import { Router } from 'express'
const router = Router()
import *  as zodiacsCtrl from '../controllers/zodiacs.js'


// localhost:3000/zodiacs
router.get('/', zodiacsCtrl.index)

export {
  router
}