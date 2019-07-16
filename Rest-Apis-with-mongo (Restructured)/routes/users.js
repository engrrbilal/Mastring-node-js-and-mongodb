const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User,validate} = require('../models/user');

// get
router.get('/',async (req, res) => {
  const users = await User.find().sort('name');
  res.send(users);
});
// post
router.post('/', async(req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email:req.body.email});
  if (user) return res.status(400).send('User allready exist');
  user = new User ({
    name: req.body.name,
    email:req.body.email,
    password:req.body.password
  });
// password securing
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password,salt);

  await user.save();
  res.send(user);
});
// update
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findByIdAndUpdate(req.params.id,{name: req.body.name},{
    new:true
  })
  if (!user) return res.status(404).send('The user with the given ID was not found.');
  res.send(user);
});
router.delete('/:id', async(req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  // const user = await Users.deleteOne({_id:req.body.id});
  if (!user) return res.status(404).send('The user with the given ID was not found.');
  res.send(user);
});

router.get('/:id', async(req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send('The user with the given ID was not found.');
  res.send(user);
});

module.exports = router;