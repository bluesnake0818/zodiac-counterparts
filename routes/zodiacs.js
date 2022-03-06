import { Router } from 'express'
import *  as zodiacsCtrl from '../controllers/zodiacs.js'

const router = Router()

// localhost:3000/zodiacs
router.get('/', zodiacsCtrl.index)

export {
  router
}