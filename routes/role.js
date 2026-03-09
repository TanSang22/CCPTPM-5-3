var express = require('express');
var router = express.Router();
let { dataRole } = require('../utils/data')

// GET all roles
router.get('/', function (req, res, next) {
  res.send(dataRole);
});

// GET role by id
router.get('/:id', function (req, res, next) {
  let id = req.params.id;
  let result = dataRole.filter(
    function (e) {
      return e.id == id;
    }
  )
  if (result.length) {
    res.send(result[0])
  } else {
    res.status(404).send({
      message: "ROLE NOT FOUND"
    })
  }
});

// CREATE new role
router.post('/', function (req, res) {
  let newRole = {
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    creationAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  }
  dataRole.push(newRole);
  res.send(newRole)
})

// UPDATE role by id
router.put('/:id', function (req, res) {
  let id = req.params.id;
  let result = dataRole.filter(
    function (e) {
      return e.id == id;
    }
  )
  if (result.length) {
    result = result[0];
    let keys = Object.keys(req.body);
    for (const key of keys) {
      if (result[key]) {
        result[key] = req.body[key]
      }
    }
    result.updatedAt = new Date(Date.now())
    res.send(result)
  } else {
    res.status(404).send({
      message: "ROLE NOT FOUND"
    })
  }
})

// DELETE role by id
router.delete('/:id', function (req, res) {
  let id = req.params.id;
  let index = dataRole.findIndex(
    function (e) {
      return e.id == id;
    }
  )
  if (index !== -1) {
    let deletedRole = dataRole[index];
    dataRole.splice(index, 1);
    res.send({
      message: "Role deleted successfully",
      role: deletedRole
    })
  } else {
    res.status(404).send({
      message: "ROLE NOT FOUND"
    })
  }
})

module.exports = router;
