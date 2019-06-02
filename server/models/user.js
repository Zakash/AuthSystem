const mongoose = require ('mongoose'),
  bcrypt = require ('bcrypt-nodejs'),
  uniqueValidator = require('mongoose-unique-validator');

const User = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  name: {type: String, required: true},
  password: {type: String},
  createsAt: {type: String, default: Date.now()}
});

User.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

User.plugin(uniqueValidator);
module.exports = mongoose.model('User', User)
