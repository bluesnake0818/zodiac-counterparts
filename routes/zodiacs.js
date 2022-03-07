import { Router } from 'express'
const router = Router()
import *  as zodiacsCtrl from '../controllers/zodiacs.js'


// GET - localhost:3000/zodiacs
router.get('/', zodiacsCtrl.index)
// GET -localhost:3000/zodiacs/:id
router.get('/:id', zodiacsCtrl.show)

// POST - localhost:3000/zodiacs
router.post('/', zodiacsCtrl.create)

export {
  router
}