const express = require('express');
const router = express.Router();
const Joi = require('joi')
const mongoose = require('mongoose');

// coz;
const Genre = mongoose.model('Genres',new mongoose.Schema({
  name: { 
      type:String,
      required:true,
      minlength:5,
      maxlength:50,
      }
}));
// get
router.get('/',async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});
// post
router.post('/', async(req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre ({name: req.body.name});
  genre = await genre.save();
  res.send(genre);
});
// update
router.put('/:id', async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findByIdAndUpdate(req.params.id,{name: req.body.name},{
    new:true
  })
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});
router.delete('/:id', async(req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  // const genre = await Genres.deleteOne({_id:req.body.id});
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

router.get('/:id', async(req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
  };
  return Joi.validate(genre, schema);
}

module.exports = router;