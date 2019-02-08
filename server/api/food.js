const express = require('express');
const Foods = require('../models/Foods');
const router = express.Router();

// 모든 음식 리스트
router.get('/all', function(req, res) {
  Foods.find(function(err, foods) {
    if (err) {
      return res.status(500).send({ error: 'database error' });
    }
    res.json({ foods });
  });
});
// 음식 리스트
router.get('/list', function(req, res) {
  const { offsetId, limit, tags, search } = req.query;
  const query = {
    ...(offsetId && { _id: { $gt: offsetId } }),
    ...(tags && { tags: { $all: tags } }),
    name: { $regex: `${search}` },
  };
  const option = {
    ...(limit && { limit: parseInt(limit) }),
  };
  Foods.find(query, null, option, (err, foods) => {
    if (err) {
      return res.status(500).send({ error: 'database error' });
    }
    res.json({ foods });
  });
});
// 이름에 해당하는 음식
router.get('/one', function(req, res) {
  const { name } = req.query;
  Foods.findOne({ name }, function(err, food) {
    if (err) {
      return res.status(500).send({ error: 'database error' });
    }
    if (!food) {
      return res
        .status(400)
        .json({ code: '1', error: 'CANNOT FIND MATCH FOOD' });
    }
    res.json({ food });
  });
});
/* FIND FOODS BY SEARCH */
router.get('/search', function(req, res) {
  const { name } = req.query;
  const re = `${name}`;
  Foods.find({ name: { $regex: re } }, function(err, foods) {
    if (err) {
      return res.status(500).send({ error: 'database error' });
    }
    return res.json({ foods });
  });
});

/* ADD FOODS */
router.post('/', function(req, res) {
  const length = req.body.foods.length;
  Foods.insertMany(req.body.foods, { ordered: false }, function(err, r) {
    if (err) {
      if (err.code === 11000) {
        return res
          .status(400)
          .json({ code: '2', error: 'DUPLICATE FOOD NAME' });
      }
      return res.status(400).json({ code: '1', error: 'CANNOT SAVE FOOD' });
    }

    if (r.length !== length) {
      return res
        .status(400)
        .json({ code: '2', error: 'SAVE LENGTH DOES NOT MATCH' });
    }

    return res.json({ isSaved: true });
  });
});
/* UPDATE FOOD */
router.put('/', function(req, res) {
  const { id, name, tags } = req.body.food;
  Foods.findByIdAndUpdate(
    id,
    { $set: { name: name, tags: tags } },
    { new: true },
    function(err, food) {
      if (err) {
        if (err.code === 11000) {
          return res
            .status(400)
            .json({ code: '2', error: 'DUPLICATE FOOD NAME' });
        }
        return res.status(400).json({ code: '1', error: 'CANNOT UPDATE FOOD' });
      }
      return res.json({ food });
    },
  );
});
module.exports = router;
