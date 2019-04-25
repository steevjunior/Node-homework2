const express = require('express')
const lodash = require('lodash')
const app = express()
const shortid = require('shortid');
const bodyParser = require('body-parser')
const {users, createUser, updateUser,deleteUser,getUserById} = require('./models/user.js')
const port = 3000

app.use(bodyParser.json());

app.get('/users', (req, res) => {
  res.send(users)
})

app.get('/users/:id', (req, res) => {
  const getres = getUserById(req.params);
  if(getres === 404){
    res.status(getres).send('the id you used is not present!!!');
  }else{
    res.send(getres);
  }  
})

app.post('/users', (req, res) => {
  const result = createUser(req.body)
  if(result === 403){
    res.status(403).send("This email is already used!!!")
  }
  else{
    res.send(result)
  }
})

app.put('/users/:id', (req, res) => {
  const result = updateUser(req.params.id, req.body)
  if(result === 403)
  {
    res.status(403).send("the mail already exist!!")
  }
  else{
    res.send(users)
  }
  
})

app.delete('/users/:id', (req, res) => {
  const delresult = deleteUser(req.params.id);
  if(delresult === 404){
    res.status(delresult).send("The id is not present!!!!!");
  }else{
    res.send(delresult);
  }  
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
