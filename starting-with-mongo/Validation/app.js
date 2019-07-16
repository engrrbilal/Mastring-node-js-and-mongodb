const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
// mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(()=>console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to mongodb'))
// Creating Schema
const courseSchema = new mongoose.Schema({
    name: {
            type:String,
            required:true,
            minlength:5,
            maxlength:255,
            // match: /pattern/
        },
        category: {
            type: String,
            required:true,
            enum: ['web','mobile','network'],
            lowercase: true,
            // uppercase: true,
            trim:true
        },
    author:String,
    tags:{
        type:Array,
        validate:{
            isAsync: true,
            validator:function(v, callback){
                setTimeout(()=>{
                    // do some async work
                    const result= v && v.length > 0;
                    callback(result);
                },1000)
                return v && v.length > 0;
            },
            message:'A course should have at least one tag'
        }
    },
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price:{
        type:Number,
        required: function(){ return this.isPublished;},
        minlength:10,
        maxlength:200,
        get: v => Math.round(v),
        set: v => Math.round(v)

    }
});


// Classes,objects
// Course,nodeCourse
// Creating Model
const Course = mongoose.model('Course',courseSchema); //create class

// create the instance/object of class Course,this objet maps the document in mongodb database
async function createCourse(){
    const course = new Course({
        name: 'Node.js Course',
        category:'Web ',
        author: 'Mosh',
        tags: ['front ends'],
        price:15.8,
        isPublished:true
    })
    try{
        // await course.validate();
        const result = await course.save();
        console.log(result)
    }
    catch(excp){
        // console.log(excp.errors)
        for ( field in excp.errors){
            console.log(excp.errors[field].message);
        }
    }
}
createCourse()
// // query the document
async function getCourses(){
    const pageNumber = 2;
    const pageSize = 10;
    const courses = await Course
        .find()
    console.log(courses);
}
// Updating documents
// async function updateCourse(id){
//     const course = await Course.findById(id);
//     if(!course) console.log("course not found with id:",id);
//     else{
//         course.isPublished = true;
//         course.author = 'Another Author';
//         const result = await course.save();
//         console.log(result);
//     }
// }
// Updating documents
// async function removeCourse(id){
//     const result = await Course.deleteOne({_id:id});
//     console.log(result)
    
// }
// removeCourse('5cb3874adf2a7258fb67f93f')
