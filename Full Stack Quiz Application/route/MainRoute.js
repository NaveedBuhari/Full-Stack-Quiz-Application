const {getQuiz} = require('../controller/MainController');
const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

router.post("/getQues",async function(req,res){
    console.log("MAINROUTE...");
    try{
        console.log("MAINROUTE...");
        const questions = await getQuiz();
        res.status(201).json(questions);
    }
    catch(error){
        console.log("Error getting questions");
        res.status(500).json('Internal server error');
    }
});

const uri = "mongodb://localhost:27017";
const dbName = "ipLab";
const client = new MongoClient(uri);
const db = client.db(dbName);
const usersCollection = db.collection("credential");

router.post('/login', async function (req, res) { // Make the route handler asynchronous   
    const { username, password, op } = req.body;
    try {
        var bname;
        if(op === "Stu"){
            bname = 'credential';
        }
        else{
            bname = 'teacher';
        }
        const usersCollection = db.collection(bname);
        const user = await usersCollection.findOne({ username }); 
        var data = 'Logged In Successfully';
        console.log(username,bname,user,op);
        if (!user) { 
            
            res.json({ message:'incorrect username or password'}); // Return empty strings if user not found         
            return;
        }
        if (user.password !== password) {  
            res.json({ message: 'incorrect username or password'}); // Return empty strings if password is incorrect   
            return;
        }    

        res.json({ message: data });
    } catch (error) {
        console.error("Error generating message:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/signup', async (req, res) => {
    const { username, password,op } = req.body;
   
    try {
      // Check if the username already exists
      var bname;
      if(op === "Stu"){
          bname = 'credential';
      }
      else{
          bname = 'teacher';
      }
      const usersCollection = db.collection(bname);
      const existingUser = await usersCollection.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Insert the new user into the collection
      const newUser = await usersCollection.insertOne({ username, password });

      res.status(201).json({ message: 'Signup successful'});
    } catch (err) {
      console.error("Error signing up:");
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.post('/addQues', async (req, res) => {
    const { question,option1,option2,option3,option4,answer } = req.body;
   
    try {
    
      const usersCollection = db.collection('quiz');
      const existingUser = await usersCollection.findOne({ question });
      if (existingUser) {
        return res.status(400).json({ message: 'Question already exists' });
      }

      const newUser = await usersCollection.insertOne({ question,op1:option1,op2:option2,op3:option3,op4:option4,answer });

      res.status(201).json({ message: 'Question added successful'});
    } catch (err) {
      console.error("Error adding");
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  router.post('/upScore', async (req, res) => {
    const { username,score } = req.body;
   
    try {
      
      console.log(username,score);
      const usersCollection = db.collection('credential');
      const existingUser = await usersCollection.updateOne({ username },{$set : {"score":score}});

      res.status(201).json({ message: 'Score updated successful'});
    } catch (err) {
      console.error("Error signing up:");
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.post('/getScores', async (req, res) => {
    
   
    try {
    
      const usersCollection = db.collection('credential');
      const existingUser = await usersCollection.find({}).toArray();

      res.status(201).json(existingUser);
    } catch (err) {
      console.error("Error getting scores up:");
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
module.exports = router;

