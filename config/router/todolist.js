const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../../controllers/users');

router.get('/', (r, w) => {
  registerUser(r, w)
    .then((user) => {
      w.send(user);
    })
    .catch((error) => {
      w.send({
        success: false,
      });
      console.error('Error:', error);
    });
});

router.post('/', (r, w) => {
  loginUser(r, w)
    .then((user) => {
      w.send(user);
    })
    .catch((error) => {
      w.send({
        success: false,
      });
      console.error('Error:', error);
    });
});

module.exports = router;
