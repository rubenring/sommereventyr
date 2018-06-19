const User = require('../models/User');
const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');

const UserController = {};

UserController.getUser = (req, res) => {
  User.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });
    console.log(userMap)
    res.send(userMap);  
  });
  // try{
  //     User.findOne({ username: req.params.username }).exec((err, user) => {
  //         if (err) {
  //             res.status(500).send(err);
  //         }
  //         console.log(user);
  //         res.json({ user });

  //     });
  // }
  // catch(err){
  //   res.send(err);
  // }
}

UserController.addUser = async (req, res) => {
  try {
      if (!req.body.user.level || !req.body.user.username) {
          res.status(403).end();
      }

      const newUser = new User(req.body.user);

      // Sanitize inputs
      newUser.title = sanitizeHtml(newUser.level);
      newUser.content = sanitizeHtml(newUser.username);

      newUser.cuid = cuid();

      newUser.save((err, saved) => {
          if (err) {
              res.status(500).send(err);
          }
          res.json({ post: saved });
      });
  }
  catch (err) {
      console.log(err);
  }
}
module.exports = UserController;