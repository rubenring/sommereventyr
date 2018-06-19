const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    level: { type: 'Number', required: true },
    username: { type: 'String', required: true },
    cuid: { type: 'String', required: false },
});

let User = mongoose.model('User', userSchema);

module.exports = User;