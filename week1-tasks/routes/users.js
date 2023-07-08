const express = require('express');
const router = express.Router();
const { profile, signUp, signIn, create, createSession, destroySession } = require('../controllers/users');

router.route('/profile').get(profile);
router.route('/sign-up').get(signUp);
router.route('/sign-in').get(signIn);
router.route('/create').post(create);
router.route('/create-session').post(createSession);
router.route('/sign-out').post(destroySession);

module.exports = router;