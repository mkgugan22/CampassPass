
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/StudentLogin")
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log("Failed to Connect to MongoDB:", error);
    });

    const Student = new mongoose.Schema({
        rollno:{
            type: String,
            required : true
        },
        password:{
            type: String,
        required: true
    },
    })

    const Tutor = new mongoose.Schema({
        staffId:{
            type: String,
            required : true
        },
        password:{
            type: String,
        required: true
    },
    })

    const Hod = new mongoose.Schema({
        emailId:{
            type: String,
            required : true
        },
        password:{
            type: String,
        required: true
    },
    })

    const Warden = new mongoose.Schema({
        emailId:{
            type: String,
            required : true
        },
        password:{
            type: String,
        required: true
    },
    })

    const StudentPDetails = new mongoose.Schema({
        name:{
            type: String,
            required : true  
        },
        rollNo:{
            type: String,
             required : true
        },
        department:{
            type: String,
            required : true
        },
        year:{
            type: String,
            required : true
        },
        email:{
            type: String,
            required:true
        },
        numberOfDays:{
            type: Number,
            required : true
        },
        outDate:{
            type: String,
            required : true
        },
        inDate:{
            type: String,
            required : true
        },
        roomNo:{
            type: String,
            required : true
        },
        reason:{
            type: String,
            required : true
        },
        place:{
            type: String,
            required : true
        },
        isTutor:{
            type: Boolean,
            required:true
        },
        isHod:{
            type: Boolean,
            required:true
        },
        isWarden:{
            type: Boolean,
            required:true
        }
    })

    const StudentsLogin = mongoose.model("LoginDetails" , Student);
    const StudentPersonalDetails = mongoose.model("StudentPersonalDetails" , StudentPDetails);
    const TutorDetails = mongoose.model("TutorDetails" , Tutor)
    const HodDetails = mongoose.model("HodDetails",Hod);
    const WardenDetails = mongoose.model("WardenDetails",Warden);
    module.exports = {
        StudentsLogin,
        StudentPersonalDetails,
        TutorDetails,
        HodDetails,
        WardenDetails
    }
