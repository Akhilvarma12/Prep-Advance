const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  tags: {
    type: [String], 
    default: []
  },
  company: {
    type: String, 
    default: ''
  },
  profileImageUrl: {
    type: String,
    required: true
  },
  profileLink: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Mentor', mentorSchema);
