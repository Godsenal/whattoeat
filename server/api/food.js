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
    Foods.find({}, function(err, foods){
      if(err){
        return res.status(500).send({error: 'database error'});
      }
      res.json({foods});
    });
  }
  else{
    Foods.find({tags: {$all: req.body.tags}}, function(err, foods){
      if(err){
        return res.status(500).send({error: 'database error'});
      }
      res.json({foods});
    });
  }
  
});
/* ADD FOODS */
router.post('',function(req,res){
  req.body.foods.forEach((food) => {
    var newFood =  new Foods();
    newFood.name = food.name;
    newFood.tags = food.tags;
    newFood.save(function(err){
      if(err){
        console.error(err);
        if(err.code == 11000){
          return res.status(400).json({code: '2', error: 'DUPLICATE FOOD NAME'});
        }
        return res.status(400).json({code: '1', error: 'CANNOT SAVE FOOD'});
      }

      return res.json({isSaved: true});
    });
  });
  
});

export default router;
