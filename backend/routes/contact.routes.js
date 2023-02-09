const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contact.controller');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

router.get('/contact', isAuthenticated, ContactController.getContacts);
router.get('/contact/:id', isAuthenticated, ContactController.getContact);
router.post('/contact', isAuthenticated, ContactController.createContact);
router.put('/contact', isAuthenticated, ContactController.updateContact);
router.delete('/contact/:id', isAuthenticated, ContactController.deleteContact);

module.exports = router;