const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/:username/progress', (req, res) => {
  if(!req.params.username){
    res.send({"username": false});
  }
  res.send({"username": true});
});

app.post('/api/:username/answerone', (req, res) => {
  /* Må sjekke om brukernavn er satt. hvis ikke returner  */
  console.log(req.body);
  if(!req.params.username){
    res.send({"username": false});
  }
  res.send({"username": true});
});

app.post('/api/:username/answertwo', (req, res) => {
  /* Må sjekke om brukernavn er satt. hvis ikke returner  */
  if(!req.params.username){
    res.send({"username": false});
  }
  res.send({"username": true});
});

app.post('/api/:username/answerthree', (req, res) => {
  /* Må sjekke om brukernavn er satt. hvis ikke returner  */
  if(!req.params.username){
    res.send({"username": false});
  }
  res.send({"username": true});
});
app.listen(port, () => console.log(`Listening on port ${port}`));
