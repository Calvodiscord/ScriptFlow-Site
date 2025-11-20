const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getAllUsers, banUser, unbanUser } = require('../controllers/userController');

// Rota para admin
router.get('/', auth, getAllUsers);
router.put('/ban/:id', auth, banUser);
router.put('/unban/:id', auth, unbanUser);

module.exports = router;
