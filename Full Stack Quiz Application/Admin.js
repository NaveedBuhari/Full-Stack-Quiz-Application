import React, { useState } from 'react';
import './App.css';

function Admin({onLogout}) {
  const [res, setResults] = useState([]);
  const [addQuestionVisible, setAddQuestionVisible] = useState(false);
  const [questionData, setQuestionData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: ""
  });



  function handleViewScores() {
    setAddQuestionVisible(false);
    fetch('http://localhost:5007/getScores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        setResults(data);
        console.log("Quiz results:", data);
      })
      .catch(error => console.error('Error: ', error));
  }

  function handleAddQuestion() {
    setResults([]);
    setAddQuestionVisible(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setQuestionData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  function handleFinish(){
    onLogout();
  }

  function handleAddQuestionSubmit() {
    // Logic to submit the new question data
   
    fetch('http://localhost:5007/addQues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(questionData)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Question saved: ", data);
      })
      .catch(error => console.error('Error: ', error));
   
    setQuestionData({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: ""
    });
  }

  return (
    <div className="admin-page">
      <h1>Welcome Admin!</h1>
      <div className="admin-buttons">
        <button onClick={handleViewScores}>View Scores</button>
        <button onClick={handleAddQuestion}>Add Question</button>
        <button onClick={handleFinish}>Finish</button>
      </div>

      {addQuestionVisible && (
        <div className="add-question-form">
          <h2>Add Question</h2>
          <input
            type="text"
            name="question"
            placeholder="Question"
            value={questionData.question}
            onChange={handleChange}
          />
          <br/ >
          <input
            type="text"
            name="option1"
            placeholder="Option 1"
            value={questionData.option1}
            onChange={handleChange}
          /><br/ >
          <input
            type="text"
            name="option2"
            placeholder="Option 2"
            value={questionData.option2}
            onChange={handleChange}
          /><br/ >
          <input
            type="text"
            name="option3"
            placeholder="Option 3"
            value={questionData.option3}
            onChange={handleChange}
          /><br/ >
          <input
            type="text"
            name="option4"
            placeholder="Option 4"
            value={questionData.option4}
            onChange={handleChange}
          /><br/ >
          <input
            type="text"
            name="answer"
            placeholder="Answer"
            value={questionData.answer}
            onChange={handleChange}
          /><br/ >
          <button onClick={handleAddQuestionSubmit}>Submit</button>
        </div>
      )}

      {res.length > 0 && (
        <div className="scores-table">
          <h2>Quiz Scores</h2>
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Attempted Test</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {res.map((student, index) => (
                <tr key={index}>
                  <td>{student.username}</td>
                  <td>{student.score !== undefined ? "Yes" : "No"}</td>
                  <td>{student.score || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Admin;
