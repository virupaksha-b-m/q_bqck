const express = require("express")
// const hbs = require("hbs")
const app = express()
const mongoose = require("mongoose")
const routes = require('./src/routes/main')
const cors = require("cors")
const bcrypt = require("bcryptjs");

// const app = express()
// const routes = require('./routes/main')

app.use(express.urlencoded({extended: true}));
app.use(express.json())
// app.use('', routes)
app.use(cors())

const DB = 'mongodb+srv://shivamrai0210:Shivam_0210@cluster0.geyfjxa.mongodb.net/kleTech?retryWrites=true&w=majority';

// mongoose.connect('mongodb://127.0.0.1:27017/kleTech');
mongoose.connect(DB).then(() =>{
    console.log(`connection succcessful`);
}).catch((err) => console.log(`no connection`));


const Program = require("./src/models/program")
const Department = require("./src/models/department")
const Course = require("./src/models/course")
const Chapter = require("./src/models/chapter")
const Question = require("./src/models/question")
const User = require("./src/models/user")
const PaperFormat = require("./src/models/paperFormat")

app.post("/deleteUser", async (req, res) => {
    // console.log(req.body);
    const id = req.body._id;
    console.log(id);
    try{
        await User.deleteOne({"_id" : id });
        res.send({message : "Faculty Deleted"})
    }
    catch(error){
        console.log(error)
    }

}) 



app.post("/login", async (req, res) => {
    const {email, password} = (req.body)
    console.log(req.body)
    try{
        const user = await User.findOne({"email" : email});
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            console.log(isMatch);
            if(isMatch){
                res.send({message: "Login succesfull", user})
            }
            else {
                res.send({message : "password didn't match"})
            }
        } else{
            res.send({message: "User not registered"})
        }
    }
    catch(error){
        console.log(error)
    }

}) 

app.post('/getPaperFormat', async (req, res)=> {
    const p = req.body._id;
    
    try{
        const setPaperFormat = await PaperFormat.findOne({"course_id": p})
        if(setPaperFormat){
            res.send(setPaperFormat)
            // console.log(setPaperFormat);
        }
    }
    catch(error){
        console.log(error)
      }

})

app.get('/getProgram', async (req, res)=> {
    try{
        const prog = await Program.find();
        if(prog){
            res.send(prog)
            // console.log(prog)
        }
    }
    catch(error){
        console.log(error)
      }

})

app.get('/getDepartment', async (req, res)=> {
    try{
        const dept = await Department.find();
        if(dept){
            res.send(dept)
            // console.log(prog)
        }
    }
    catch(error){
        console.log(error)
      }

})


app.get('/getCourse', async (req, res)=> {
    try{
        const course = await Course.find();
        if(course){
            res.send(course)
            // console.log(prog)
        }
    }
    catch(error){
        console.log(error)
      }

});

app.get('/getChapter', async (req, res)=> {
    try{
        const chapter = await Chapter.find();
        if(chapter){
            res.send(chapter)
            // console.log(prog)
        }
    }
    catch(error){
        console.log(error)
      }

});


app.get('/getFaculty', async (req, res)=> {
    try{
        const faculty = await User.find();
        if(faculty){
            res.send(faculty);
        }
    }
    catch(error){
        console.log(error)
      }

});

app.post("/register", async (req, res)=> {
    // console.log(req.body)
    const {name , email, password, courses} = req.body
    try{
        const user = await User.findOne({email : email});
        if(user){
            res.send({message :"User already registered"})
        } else{
            const user = new User({
                name,
                email, 
                password,
                courses
            })
            const result = await user.save();
            res.send({message: "User successfully registered"})
            // console.log(result) 
        }
    }
    catch(error){
        console.log(error)
    }

}) 

app.post("/addProgram", async (req, res)=> {
    // console.log(req.body)
    const {name , code} = req.body
    console.log(req.body)
    try{
        const program = await Program.findOne({code : code});
        if(program){
            res.send({message :"Program already exists"})
        } else{
            const program = new Program({
                name,
                code
            })
            const result = await program.save();
            res.send({message: "Program successfully added"})
            // console.log(result) 
        }
    }
    catch(error){
        console.log(error)
    }

}) 

app.post("/addDepartment", async (req, res)=> {
    console.log(req.body)
    const {name , code, program_id} = req.body
    // console.log(req.body)
    try{
        const dept = await Department.findOne({code : code});
        if(dept){
            res.send({message :"Department already exists"})
        } else{
            const dept = new Department({
                name,
                code,
                program_id
            })
            const result = await dept.save();
            res.send({message: "Department successfully added"})
             
        }
    }
    catch(error){
        console.log(error)
    }

}) 


app.post("/addCourse", async (req, res)=> {
    console.log(req.body)
    const {name , code, sem, department_id} = req.body
    try{
        const course = await Course.findOne({code : code});
        if(course){
            res.send({message :"Course already exists"})
        } else{
            const course = new Course({
                name,
                code,
                sem,
                department_id
            })
            const result = await course.save();
            res.send({message: "Course successfully added"})
             
        }
    }
    catch(error){
        console.log(error)
    }

}) 

app.post("/addChapter", async (req, res)=> {
    console.log(req.body)
    const {name , unit, topic, course_id} = req.body
    try{
        const chapter = await Chapter.findOne({name : name});
        if(chapter){
            res.send({message :"Chapter already exists"})
        } else{
            const chapter = new Chapter({
                name,
                unit,
                topic,
                course_id
            })
            const result = await chapter.save();
            res.send({message: "Chapter successfully added"})
             
        }
    }
    catch(error){
        console.log(error)
    }

}) 

app.post("/setPaper", async (req, res)=> {
    console.log(req.body)
    const {course , unit, setter, question_code} = req.body
    try{
            const paper = await PaperFormat.updateOne({"course_id":course}, {
                $set:{
                    ISA:unit,
                    question_code,
                    course_id:course,
                    setter,
                }
            }, {upsert:true}
            )
            // console.log(paper);
            // const paper = new PaperFormat({
            //     ISA:unit,
            //     question_code,
            //     course_id:course,
            //     setter,
            // })
            // const result = await paper.save();
            res.send({message: "Paper Format successfully added"})
        
    }
    catch(error){
        console.log(error)
    }

}) 

app.post("/addQuestion", async (req, res)=> {
    // console.log(req.body)
    const {course, chapter, topic, unit, questionDescription, PI, CO, BL, marks} = req.body
    try{
        const question = await Question.findOne({"text" : questionDescription, "chapter_id" : chapter, "course" : course, "topic" : topic, "pi" : PI, "co" : CO, "bl" : BL, "marks" : marks });
        if(question){
            res.send({message :"Question already exists"})
        } else{
            const question = new Question({
                text : questionDescription,
                pi : PI,
                bl: BL,
                co: CO,
                topic: topic,
                unit: unit,
                course: course,
                marks : marks,
                chapter_id: chapter,
            })
            const result = await question.save();
            res.send({message: "Question successfully added"})
             
        }
            
    }
    catch(error){
        console.log(error)
    }

}) 

app.post('/getQuestion1', async (req, res)=> {
    const question = req.body;
    let len = question.length;
    const que = [];
    console.log(question);
    try{
        for(let i=0; i<len; i++){
            const res = await Question.find({"pi" : question[i].PI, "co": question[i].CO, "bl": question[i].BL, "course": question[i].course , "unit": question[i].unit});
            
            que.push(res);
        }
        res.send(que);
        
    }
    catch(error){
        console.log(error)
      }

});

app.listen(process.env.PORT||9002,() =>{
    console.log("BE started at port 9002")
} )