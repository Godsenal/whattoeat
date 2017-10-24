import express from 'express';
import Foods from '../models/Foods';
const router = express.Router();

/* FIND ALL FOODS */
router.get('/all',function(req, res){
  Foods.find(function(err, foods){
    if(err){
      return res.status(500).send({error: 'database error'});
    }
    res.json({foods});
  });
});
/* FIND FOODS BY SCROLL */
router.get('/scroll',function(req, res){
  Foods.find()
    .limit(15)
    .exec(function(err, foods){
      if(err){
        return res.status(500).send({error: 'database error'});
      }
      res.json({foods});
    });

});
/* FIND FOODS BY SCROLL AFTER ID */
router.get('/scroll/:id',function(req, res){
  Foods.find({_id:{$gt: req.params.id}})
    .limit(15)
    .exec(function(err, foods){
      if(err){
        return res.status(500).send({error: 'database error'});
      }
      res.json({foods});
    });

});
/* FIND ONE FOOD BY NAME */
router.get('/name/:name',function(req,res){
  Foods.findOne({name: req.params.name},function(err, food){
    if(err){
      return res.status(500).send({error: 'database error'});
    }
    if(!food){
      return res.status(400).json({code: '1', error: 'CANNOT FIND MATCH FOOD'});
    }
    res.json({food});
  });
});
/* FIND ALL FOODS THAT MATHCES THE TAG */
router.get('/tag/:tag',function(req,res){
  Foods.find({tags: req.params.tag},function(err, foods){
    if(err){
      return res.status(500).send({error: 'database error'});
    }
    res.json({foods});
  });
});
/* FIND ALL FOODS THAT MATHCES THE TAGS */
router.post('/tags',function(req, res){
  if(req.body.tags.length == 0){
    Foods.find({tags: { $nin: req.body.untags}}, function(err, foods){
      if(err){
        return res.status(500).send({error: 'database error'});
      }
      res.json({foods});
    });
  }
  else{
    Foods.find({$and:[{tags: {$all: req.body.tags}},{tags: { $nin: req.body.untags}}]}, function(err, foods){
      if(err){
        return res.status(500).send({error: 'database error'});
      }
      res.json({foods});
    });
  }
  
});
/* FIND FOODS BY SEARCH */
router.get('/search/:name',function(req,res){
  var re = '';
  if(req.params.name){
    re = '^' + req.params.name;
  }
  Foods.find({name: {$regex: re}}, function(err, foods){
    if(err){
      return res.status(500).send({error: 'database error'});
    }
    return res.json({foods});
  });
});

/* ADD FOODS */
router.post('',function(req,res){
  var length = req.body.foods.length;
  Foods.insertMany(req.body.foods,{ ordered: false },function(err,r){
    if(err){
      if(err.code === 11000){
        return res.status(400).json({code: '2', error: 'DUPLICATE FOOD NAME'});
      }
      return res.status(400).json({code: '1', error: 'CANNOT SAVE FOOD'});
    }
    
    if(r.length !== length){
      return res.status(400).json({code: '2', error: 'SAVE LENGTH DOES NOT MATCH'});
    }

    return res.json({isSaved: true});
  });
});
/* UPDATE FOOD */
router.put('',function(req,res){
  const {id, name, tags} = req.body.food;
  Foods.findByIdAndUpdate(id, { $set: { name: name, tags: tags }}, { new: true }, function (err, food) {
    if (err){
      if(err.code === 11000){
        return res.status(400).json({code: '2', error: 'DUPLICATE FOOD NAME'});
      }
      return res.status(400).json({code: '1', error: 'CANNOT UPDATE FOOD'});
    }
    return res.json({food});
  });
});
export default router;
