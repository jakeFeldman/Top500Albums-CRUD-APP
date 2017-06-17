const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

router.get('/', (req, res) => {
  queries.getAll().then((albums) => {
    res.json(albums);
  })
})

router.get('/:order', (req, res) => {
  queries.getOne(req.params.order).then((album) => {
    res.json(album)
  })
})

module.exports = router;
