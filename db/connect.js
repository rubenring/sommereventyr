const mongoose = require('mongoose');
const config = require('../config/index');
mongoose.Promise = global.Promise;
const connectToDb = () => {
    try {
        mongoose.connect(config.mongoUrl, () => {
          console.log('connected');
        });
    }
    catch (err) {
        
      console.log(err);
    }
}

module.exports = connectToDb;