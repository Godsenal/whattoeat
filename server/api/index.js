import express from 'express';

import food from './food';
import tag from './tag';


const router = express.Router();



router.use('/*', (req, res, next) => {
  next();
});



router.use('/food', food);
router.use('/tag', tag);
export default router;