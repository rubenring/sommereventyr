const express = require('express');
const bodyParser = require('body-parser');
const monk = require('monk');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const db = monk("mongodb://reuben:sommer2018@ds016138.mlab.com:16138/sommereventyr_2018_reuben");

const totalAnswer = '';
//collection: sommereventyr_2018_reuben
//db: sommereventyr_2018_reuben
//dbpass: sommer2018
const users = db.get('User');
const respSuccessModel = (level, totalAnswer, username, answer, toLowLevel = false) => ({
  level,
  totalAnswer,
  username,
  answer,
  toLowLevel
});

const findUser = (username) => {
  if(username && typeof username !== undefined && username !== "undefined"){
    return users.findOne({username}).then((doc) => {
      if(doc !== null){
        return doc;
      }else{
        return {};
      }
    })
  }else{
    return {};
  }
 
}
const findOneAndUpdateLevel = (username, level) => {
  return users.update({ username }, { $set: { level } })
}
app.get('/api/:username/progress', (req, res) => {
  const username = req.params.username; 
  if(typeof username === undefined || !username){
    res.send({"hasUsername": false, username: ''});
    return;
  }
  findUser(username)
    .then(user => {
      res.send({"hasUsername": user.username ? true : false, username: user.username, level: user.level});
    });
    
});
app.get('/api/:username/level', (req, res) => {
  const username = req.params.username; 
  if(typeof username === undefined || !username){
    res.send({"hasUsername": false, username: ''});
    return;
  }
  findUser(username)
    .then(user => {
      res.send({level: user.level});
    });
});

app.post('/api/:username/addusernametodb', (req, res, next) => {
  const username = req.params.username;
  if(typeof username === undefined || !username){
    res.send({"hasUsername": false, username: ''});
    return;
  }
  /* check if user excists in db, if user do exist return */
  findUser(username)
    .then(user => {
      user.username ? 
      res.send({"hasUsername": true, "username": user.username, "level": user.level}) :
      users.insert({ username, level: 1 })
      .then(x => res.send({"hasUsername": true, "username": username}))
    });
});

app.post('/api/:username/answerone', (req, res, next) => {
  /* Må sjekke om brukernavn er satt. hvis ikke returner  */
  const username = req.params.username; 
  if(typeof username === undefined || !username){
    res.send({"hasUsername": false, username: ''});
    return;
  }
  const body = req.body;
  if(body.svar && body.svar.toLowerCase() === "dr" || body.svar.toLowerCase() === "rd"){
    findOneAndUpdateLevel(username, 2).then(x => {
      res.send(respSuccessModel(2, 'rd', username, true, false));
      return;
    });
  }else {
    res.send({
      'username':username,
      'answer': false
    });
  }

});



app.post('/api/:username/answertwo', (req, res) => {
  const username = req.params.username; 
  if(typeof username === undefined || !username){
    res.send({"hasUsername": false, username: ''});
    return;
  }
  const body = req.body;

  findUser(username)
    .then(user => {
      if(user.level < 1){
        res.send({
          'username': username,
          'answer': false,
          'toLowLevel': true
        });
      }
    });
  
  //sjekke om svar 1 er svart på først
  if(body.svar && body.svar.toLowerCase() === "pa" || body.svar.toLowerCase() === "ap"){
    //oppdater db level for username
    findOneAndUpdateLevel(username, 2).then(x => {
      res.send(respSuccessModel(2, 'pa', username, true, false));
      return;
    });
    return;
  }
  res.send({
    'username': username,
    'answer': false
  });
});

app.post('/api/:username/answerthree', (req, res) => {
  /* Må sjekke om brukernavn er satt. hvis ikke returner  */
  const username = req.params.username; 
  if(typeof username === undefined || !username){
    res.send({"hasUsername": false, username: ''});
    return;
  }
  findUser(username)
    .then(user => {
      if(user.level < 2){
        res.send({
          'username': username,
          'answer': false,
          'toLowLevel': true
        });
      }
    });
  const body = req.body;
  if(body.svar && body.svar.toLowerCase() === "no" || body.svar.toLowerCase() === "no"){
    findOneAndUpdateLevel(username, 3).then(x => {
      res.send(respSuccessModel(3, 'no', username, true, false));
      return;
    });
    return;
  }
  res.send({
    'username': req.params.username,
    'answer': false
  });
});

app.post('/api/:username/answerfour', (req, res) => {
  const username = req.params.username; 
  if(typeof username === undefined || !username){
    res.send({"hasUsername": false, username: ''});
    return;
  }
  findUser(username)
    .then(user => {
      if(user.level < 3){
        res.send({
          'username': username,
          'answer': false,
          'toLowLevel': true
        });
      }
    });
  const body = req.body;
  if(body.svar && body.svar.toLowerCase() === "kp" || body.svar.toLowerCase() === "pk"){
    findOneAndUpdateLevel(username, 4).then(x => {
      res.send({
        ...respSuccessModel(4, 'kp', username, true, false),
        anagram: 'ropnkdap'
      });
      return;
    });
    return;
  }
  res.send({
    'username': username,
    'answer': false
  });
});

app.post('/api/:username/answerlast', (req, res) => {
  /* Må sjekke om brukernavn er satt. hvis ikke returner  */
  const username = req.params.username; 
  if(typeof username === undefined || !username){
    res.send({"hasUsername": false, username: ''});
    return;
  }
  findUser(username)
    .then(user => {
      if(user.level < 4){
        res.send({
          'username': username,
          'answer': false,
          'toLowLevel': true
        });
      }
    });
  const body = req.body;
  if(body.svar && body.svar.toLowerCase() === "nordkapp"){
    findOneAndUpdateLevel(username, 4).then(x => {
      res.send({
        long: '124',
        lat: '200'
      });
    });
    return;
  }
  res.send({
    'username': username,
    'answer': false
  });
});

app.use((err, req, res, next) => {
  res.status(500).send(err.stack)
})

app.listen(port, () => {
  db.then(() => {
    console.log('Connected correctly to mongo db')
  })
  console.log(`Listening on port ${port}`)

});
