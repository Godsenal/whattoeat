import express from 'express';
import Tags from '../models/Tags';

const router = express.Router();

router.get('/all',function(req,res){
  Tags.find(function(err,tags){
    if(err){
      return res.status(500).send({error: 'database error'});
    }
    if(tags.length == 0){
      return res.status(400).json({code: '1', error: 'CANNOT FIND ANY TAG'});
    }

    res.json({tags});
  });
});
router.get('/random/:size',function(req,res){
  const size = parseInt(req.params.size);
  Tags.aggregate({$sample: {size: size}}, function(err, tags){
    if(err){
      return res.status(500).send({error: 'database error'});
    }
    if(tags.length == 0){
      return res.status(400).json({code: '1', error: 'CANNOT FIND ANY TAG'});
    }

    res.json({tags});
  });
});
router.get('/search/:name',function(req,res){
  var re = '';
  if(req.params.name){
    re = '^' + req.params.name;
  }
  Tags.find({name: {$regex: re}}, function(err, tags){
    if(err){
      return res.status(500).send({error: 'database error'});
    }
    return res.json({tags});
  });
});

router.get('/search',function(req,res){
  let tags = [];
  res.json({tags});
});

router.post('',function(req,res){
  Tags.insertMany(req.body.tags,{ ordered: false },function(err,r){
    if(err && err.code !== 11000){ // DO NOT NEED TO HANDLE DUPLICATE TAG NAME
      return res.status(400).json({code: '1', error: 'CANNOT SAVE TAG'});
    }
    return res.json({isSaved: true});
  });
  
});

export default router;