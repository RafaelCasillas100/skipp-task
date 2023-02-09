const { Schema, model } = require('mongoose');

const ContactSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  description: { type: String }
}, {
  timestamps: true
})

module.exports = model('Contact', ContactSchema);
