var express = require('express');
var router = express.Router();
let { dataUser } = require('../utils/data')

// GET all users
router.get('/', function (req, res, next) {
  res.send(dataUser);
});

// GET user by username
router.get('/:username', function (req, res, next) {
  let username = req.params.username;
  let result = dataUser.filter(
    function (e) {
      return e.username == username;
    }
  )
  if (result.length) {
    res.send(result[0])
  } else {
    res.status(404).send({
      message: "USERNAME NOT FOUND"
    })
  }
});

// CREATE new user
router.post('/', function (req, res) {
  let newUser = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    fullName: req.body.fullName,
    avatarUrl: req.body.avatarUrl || "https://i.sstatic.net/l60Hf.png",
    status: req.body.status || true,
    loginCount: 0,
    role: req.body.role || {
      "id": "r3",
      "name": "Người dùng",
      "description": "Tài khoản người dùng thông thường"
    },
    creationAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  }
  dataUser.push(newUser);
  res.send(newUser)
})

// UPDATE user by username
router.put('/:username', function (req, res) {
  let username = req.params.username;
  let result = dataUser.filter(
    function (e) {
      return e.username == username;
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
      message: "USERNAME NOT FOUND"
    })
  }
})

// DELETE user by username
router.delete('/:username', function (req, res) {
  let username = req.params.username;
  let index = dataUser.findIndex(
    function (e) {
      return e.username == username;
    }
  )
  if (index !== -1) {
    let deletedUser = dataUser[index];
    dataUser.splice(index, 1);
    res.send({
      message: "User deleted successfully",
      user: deletedUser
    })
  } else {
    res.status(404).send({
      message: "USERNAME NOT FOUND"
    })
  }
})

module.exports = router;
