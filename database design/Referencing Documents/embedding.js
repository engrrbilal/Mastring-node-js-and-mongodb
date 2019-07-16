const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  // author:{
  //   type: authorSchema,
  //   required: true
  // }
  authors:[authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId){
  // const course = await Course.update({_id:courseId},{
    // $set: {
    //   'author.name':'Muhammad Bilal'
    // }
  //   $unset: {
  //     'author.name':''
  //   }
  // });
  const course = await Course.findById(courseId)
  course.author.name = 'Bilal';
  course.save();  
  console.log(course)
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId)  
  course.authors.push(author);
  const result = await course.save();
  console.log(result);
}
async function removeAuthor(courseId, authorID) {
  const course = await Course.findById(courseId)
  const author = course.authors.id(authorID);
  if(course && author){
    author.remove();
    const result = await course.save();
    console.log(result);
  }
  console.log("not found author")
}
// createCourse('Node Course', [
//   new Author({ name: 'Mosh' }),
//   new Author({ name: 'Bilal' })]
// );
// updateAuthor('5cc5e5d02f7abb17191814c1')

// addAuthor('5cc5e966d76a3b18bd8418f7',new Author({ name: 'Bilal 123' }))
removeAuthor('5cc5ec4714051b199703149a','5cc5ec4714051b1997031498')