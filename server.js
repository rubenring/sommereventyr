const express = require('express');
const bodyParser = require('body-parser');
const User = require(__dirname + '/db/models/User');
const connectToDb = require(__dirname + '/db/connect');
const UserController = require(__dirname + '/db/contollers/user.controller');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const totalAnswer = '';
//collection: sommereventyr_2018_reuben
//db: sommereventyr_2018_reuben
//dbpass: sommer2018
app.get('/api/:username/progress', (req, res) => {
  if(typeof req.params.username === undefined || !req.params.username){
    res.send({"hasUsername": false, username: ''});
    return;
  }
  User.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });
    console.log(users)
    res.send(userMap);  
  });
  //res.send({"hasUsername": true, "username": req.params.username});
});

app.post('/api/:username/addusernametodb', (req, res, next) => {
  if(typeof req.params.username === undefined || !req.params.username){
    res.send({"hasUsername": false, username: ''});
    return;
  }
  /* check if user excists in db, if user do exist return */
  const excists = true;
  if(excists){
    return;
  }else{
    /* add user to db starting on level 1 */
    return;
  }
});

app.post('/api/:username/answerone', (req, res, next) => {
  /* Må sjekke om brukernavn er satt. hvis ikke returner  */
  if(typeof req.params.username === undefined || !req.params.username){
    res.send({"hasUsername": false, username: ''});
    return;
  }
  const respSuccessModel = (level, totalAnswer, username, answer) => ({
    level,
    totalAnswer,
    username,
    answer
  });
  const body = req.body;
  if(body.svar && body.svar.toLowerCase() === "dr" || body.svar.toLowerCase() === "rd"){
    //oppdater db level for username
    res.send(respSuccessModel(1, 'rd', req.params.username, true))
    return;
  }
  res.send({
    'username': req.params.username,
    'answer': false
  });
});


app.get('/api/:username/pagetwo', (req, res) => {
  const username = req.params.username; 
  if(typeof username === undefined || !username){
    res.send({"hasUsername": false, username: ''});
    return;
  }
  res.send({"level": 4});
});

app.post('/api/:username/answertwo', (req, res) => {
  const username = req.params.username; 
  if(typeof username === undefined || !username){
    res.send({"hasUsername": false, username: ''});
    return;
  }
  const body = req.body;

  const level = 2;
  if(level >= 2){
    /* Sjekke brukernavn mot level i db */
   res.send({
     "username": username,
     "level": level
    })
    return;
  }
  
  //sjekke om svar 1 er svart på først
  if(body.svar && body.svar.toLowerCase() === "16"){
    res.send(respSuccessModel(2, 'rdpa', req.params.username, true))
    return;
  }
  res.send({
    'username': req.params.username,
    'answer': false
  });
});

app.post('/api/:username/answerthree', (req, res) => {
  /* Må sjekke om brukernavn er satt. hvis ikke returner  */
  if(!req.params.username){
    res.send({"hasUsername": false});
  }
  res.send({"hasUsername": true});
});



app.use((err, req, res, next) => {
  res.status(500).send(err.stack)
})

app.listen(port, () => {

  connectToDb();
  console.log(`Listening on port ${port}`)

});
