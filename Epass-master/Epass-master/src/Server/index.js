
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3030;

app.use(cors({ origin: '*' }));
app.use(express.json());


//Retreive the details of Student
app.get("/Students", async (req, res) => {
    try {
        const data = await StudentPersonalDetails.find({});
        res.json(data);
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
  app.post("/StudentsLogin" , async(req,res)=>{
    try{
      console.log(req.body);
      const {rollno,password} = req.body;
      console.log(rollno+" "+password);
      //console.log(rollno+" "+password);
    const d = await StudentsLogin.find({rollno,password})
    if(d === null)
    {
      res.status(404).json({"message":"no user"});
    }
    else{
    console.log(d+" demo");
       res.status(200).json({"message":"user found"});
    }
    }catch(err){
      console.log('Error1');
    }
  })
    const { StudentsLogin , StudentPersonalDetails ,TutorDetails,HodDetails,WardenDetails} = require('./mongodb'); 
app.post('/StudentsLogin', async (req, res) => {
    console.log(req.body); // Log the received data

    const { rollno, password } = req.body;

    try {
        const login = new StudentsLogin({ rollno, password });
        const newLoginDetails = await login.save();
        res.status(200).json(newLoginDetails);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Error' });
    }
});
// Update student details
app.put('/Students/:id', async (req, res) => {
    const { id } = req.params; // Get the student ID from the URL parameters
    const { isTutor } = req.body; // Assuming you want to update the isTutor field
  
    try {
      const updatedStudent = await StudentPersonalDetails.findByIdAndUpdate(id, { isTutor }, { new: true });
      res.status(200).json(updatedStudent);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Error' });
    }
  });


  app.put('/HodUpdate/:id', async (req, res) => {
    const { id } = req.params; // Get the student ID from the URL parameters
    const { isHod } = req.body; // Assuming you want to update the isTutor field
  
    try {
      const updatedStudent = await StudentPersonalDetails.findByIdAndUpdate(id, { isHod }, { new: true });
      res.status(200).json(updatedStudent);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Error' });
    }
  });
// to delete

app.delete('/Students/:id', async (req, res) => {
  const { id } = req.params; // Get the student ID from the URL parameters
  const { isTutor } = req.body; // Assuming you want to update the isTutor field

  try {
    const updatedStudent = await StudentPersonalDetails.findByIdAndDelete(id, { isTutor }, { new: true });
    res.status(200).json(updatedStudent);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Error' });
  }
});

// Backend route for tutor login
app.post('/TutorLogin', async (req, res) => {
    console.log(req.body); // Log the received data
  
     const { emailId, password } = req.body;
  
     try {
  //       // Find tutor by staffId
         const tutor = await TutorDetails.findOne({ emailId });
  
         // If tutor not found or password doesn't match
         if (!tutor || tutor.password !== password) {
             return res.status(401).json({ error: 'Invalid staff ID or password' });
         }
  
         // If credentials are correct, proceed with login
         res.status(200).json({ message: 'Login successful' });
  
         // Here, you can redirect to the next page or send any other response as needed
     } catch (err) {
         console.log(err);
         res.status(500).json({ error: 'Internal Error' });
  }
   });

    app.post('/HodLogin', async (req, res) => {
      console.log(req.body); // Log the received data
    
       const { emailId, password } = req.body;
    
       try {
         const hod = await HodDetails.findOne({emailId})
    
         if( !hod || hod.password!= password){
           return res.status(401).json({ error: 'Invalid hod ID or password' });
         }
          // If credentials are correct, proceed with login
          res.status(200).json({ message: 'Login successful' });
    
           // Here, you can redirect to the next page or send any other response as needed
         } catch (err) {
         console.log(err);
         res.status(500).json({ error: 'Internal Error' });
     }
    });


    //wardern login

    app.post('/WardenLogin', async (req, res) => {
      console.log(req.body); // Log the received data
    
       const { emailId, password } = req.body;
    
       try {
         const Warden = await WardenDetails.findOne({emailId})
    
         if( !Warden || Warden.password!= password){
           return res.status(401).json({ error: 'Invalid hod ID or password' });
         }
          // If credentials are correct, proceed with login
          res.status(200).json({ message: 'Login successful' });
    
           // Here, you can redirect to the next page or send any other response as needed
         } catch (err) {
         console.log(err);
         res.status(500).json({ error: 'Internal Error' });
     }
    });

    app.put('/WardenUpdate/:id', async (req, res) => {
      const { id } = req.params; // Get the student ID from the URL parameters
      const { isWarden } = req.body; // Assuming you want to update the isTutor field
    
      try {
        const updatedStudent = await StudentPersonalDetails.findByIdAndUpdate(id, { isWarden }, { new: true });
        res.status(200).json(updatedStudent);
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Error' });
      }
    });    
    // //       const login = new HodDetails({
    // //           staffId: staffId,
    // //           password: password
    // //       });
    // //       const newHodLoginDetails = await login.save();
    // //       res.status(200).json(newHodLoginDetails);
    // //   } catch (err) {
    // //       console.log(err);
    // //       res.status(500).json({ error: 'Internal Error' });
    // //   }
    // // });


app.post('/StudentsAdd', async(req,res)=>{
  console.log(req.body);
     const { name, rollNo, department, year,email, numberOfDays, outDate, inDate, roomNo, reason, place } = req.body;
     let isTutor = false;
     let isHod = false;
     let isWarden = false;
     console.log(rollNo+" "+typeof(rollNo));

     try {
     StudentPersonalDetails.insertMany({name,rollNo,department,year,email,numberOfDays,outDate, inDate, roomNo, reason, place ,isTutor,isHod,isWarden});

   
      res.status(200).json({"message":"Saved successfully"});
    } catch (err) {
      console.log(err);
      res.status(500).json({error:'Internal Error'});
    }
  });
  





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  