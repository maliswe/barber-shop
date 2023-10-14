const express = require('express');
const router = express.Router();
const controller = require('../controller/auth_controller.js');

router.post('/login', async (req, res) => {
    controller.login(req,res);
});

router.post('/refresh', (req, res) => {
    controller.refresh(req, res);
});

router.post('/logout', (req, res) => {
    controller.logout(req, res)
});

module.exports = router;

//Router for handling user authentication routes.
//This router defines routes for user authentication actions, such as logging in,
//refreshing tokens, and logging out.