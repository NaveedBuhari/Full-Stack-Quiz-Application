const { connect } = require('../model/MainModel');

async function getQuiz(){
    try{
        const db = await connect();
        const usersCollection = db.collection('quiz');
        
        const ques = await usersCollection.aggregate([{$sample:{size:10}}]).toArray();
        console.log("Successfully sent quiz questions ",ques);
        return ques;
    }
    catch(error){
        console.log("Error getting questions:", error);
        throw error;
    }
}

module.exports = {getQuiz};
