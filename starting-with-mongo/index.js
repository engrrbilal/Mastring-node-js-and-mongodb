const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
// mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(()=>console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to mongodb'))
// Creating Schema
const courseSchema = new mongoose.Schema({
    name: String,
    author:String,
    tags:[String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});

// Classes,objects
// Course,nodeCourse
// Creating Model
const Course = mongoose.model('Course',courseSchema); //create class
// create the instance/object of class Course,this objet maps the document in mongodb database
async function createCourse(){
    const course = new Course({
        name: 'Node.js Course',
        author: 'Mosh',
        tags: ['node','backend'],
        isPublished:true
    })
    const result = await course.save();
    console.log(result)
}
// query the document
async function getCourses(){
    // comparison operator 
    // eq(equla),ne(not equal),gt(greather than),gte (greather than or equla to),
    // lt (less than),lte (less than or equla to),in,nin(not in)
    // or,and
    // pagination
    const pageNumber = 2;
    const pageSize = 10;
    const courses = await Course
        // .find({price:{$gte:10,$lte:20}})
        // .find({price:{$in: [10,15,20]}})
        // .find({author: 'Mosh',isPublished:true})
        // .or([{author:'Mosh'},{isPublished:true}])
        // .and([{author:'Mosh'},{isPublished:true}])
        // starts with mosh ,using re
        .find({author: /^Mosh/})
        // Ends with Hamadani,using re
        .find({author: /Hamadani$/i})
        // Contains Mosh,using re
        .find({author: /.*Mosh.*/i})
        .skip((pageNumber -1) * pageSize)
        .limit(pageSize)
        // .limit(10)
        .sort({name:1})
        // .select({name: 1, tags: 1})
        .count()
    console.log(courses);
}
// Updating documents
async function updateCourse(id){
    // Approach1,similar to others
    // query first
    // findById()
    // Modify its properties
    // save()
    const course = await Course.findById(id);
    if(!course) console.log("course not found with id:",id);
    else{
        course.isPublished = true;
        course.author = 'Another Author';
        // or set by other,way
        // course.set({
        //     isPublished = true,
        //     author = 'Another Author'
        // })
        const result = await course.save();
        console.log(result);
    }

    // Approach2
    // update first
    // optionally get the updated document
}
// Updating documents
async function removeCourse(id){
    const result = await Course.deleteOne({_id:id});
    // const result = await Course.findByIdAndRemove(id);
    console.log(result)
    // Approach2
    // remove first
    // optionally get the updated document
}
// getCourses();
// createCourses();
// updateCourse('5cb3874adf2a7258fb67f93f')
removeCourse('5cb3874adf2a7258fb67f93f')
