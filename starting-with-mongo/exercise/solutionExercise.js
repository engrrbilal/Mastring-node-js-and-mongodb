const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
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
// Creating Model
const Course = mongoose.model('Course',courseSchema); //create class
// Exercise1
async function getExerciseCourses(){
    return await Course
    .find()
        .find({isPublished:true,tags:'backend'})
        .sort({name:1})
        .select({name:1,author:1})
}

async function runExercise1(){
    const courses = await getExerciseCourses();
    console.log(courses)
}
// runExercise1();

// Exercise2
async function getExerciseCourses(){
    return await Course
    .find()
        .find({isPublished:true,tags:{$in:['frontend','backend']}})
        // .sort({price:-1})
        .sort('-price')
        // .select({name:1,author:1})
        .select('name author price')

}

async function runExercise2(){
    const courses = await getExerciseCourses();
    console.log(courses)
}
// runExercise2();

// Exercise3
async function getExerciseCourses(){
    return await Course
    .find()
        .find({isPublished:true})
        // .find({name: /.*by.*/i})
        // .find({price:{$gte:15}})
        .or([{price:{$gte:15}},{name: /.*by.*/i}])
        .sort({price:-1})
}

async function runExercise3(){
    const courses = await getExerciseCourses();
    console.log(courses)
}
runExercise3();