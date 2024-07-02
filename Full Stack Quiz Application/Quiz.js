import React, { useState, useEffect } from 'react';
import './App.css'

function Quiz({ userName,onLogout }) {
  const [ques, setQues] = useState([]);
  const [Score, setScore] = useState(0);
  const [numqu, setNumqu] = useState(1);
  const [timer, setTimer] = useState(15);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setTimer(15);
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timer, currentQuestionIndex]);

  
    function handleFinish() {
      // Resetting state
      setQues([]);
      setScore(0);
      setNumqu(1);
      setTimer(15);
      setCurrentQuestionIndex(0);
      setSubmitted(false);
  
      // Calling the onLogout function passed as prop
      onLogout();
    }
    
    
  function getAll() {
    fetch('http://localhost:5007/getQues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        setQues(data);
        console.log("Quiz Questions:", data);
      })
      .catch(error => console.error('Error: ', error));
  }

  function monScoreup() {
    console.log(userName);
    fetch('http://localhost:5007/upScore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: userName, score: Score })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Score saved: ", data,userName);
      })
      .catch(error => console.error('Error: ', error));
  }

  function ScoreUpdate(event, qu) {
    qu.enable = 0;

    const op_sel = event.target.value;
    if (op_sel === qu.answer) {
      setScore(Score + 1);
    }

    setTimeout(() => {
      setTimer(15);
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }, 1000);
  }

  function dispOptions(qu) {
    if (qu.enable !== 0) {
      return (
        <div className="options">
          <button className="option-button" type='button' value={qu.op1} onClick={(event) => ScoreUpdate(event, qu)}>{qu.op1}</button>
          <button className="option-button" type='button' value={qu.op2} onClick={(event) => ScoreUpdate(event, qu)}>{qu.op2}</button>
          <button className="option-button" type='button' value={qu.op3} onClick={(event) => ScoreUpdate(event, qu)}>{qu.op3}</button>
          <button className="option-button" type='button' value={qu.op4} onClick={(event) => ScoreUpdate(event, qu)}>{qu.op4}</button>
        </div>
      );
    } else {
      return (
        <div className="options">
          <button className="option-button" disabled type='button' value={qu.op1} onClick={(event) => ScoreUpdate(event, qu)}>{qu.op1}</button>
          <button className="option-button" disabled type='button' value={qu.op2} onClick={(event) => ScoreUpdate(event, qu)}>{qu.op2}</button>
          <button className="option-button" disabled type='button' value={qu.op3} onClick={(event) => ScoreUpdate(event, qu)}>{qu.op3}</button>
          <button className="option-button" disabled type='button' value={qu.op4} onClick={(event) => ScoreUpdate(event, qu)}>{qu.op4}</button>
        </div>
      );
    }
  }

  function handleSubmit() {
    monScoreup();
    console.log(userName);
    setSubmitted(true);
  }

 
  return (
    <div className='container'>
      <h1>Quiz</h1>

      <div className="quiz-card">
        {ques.map((qu, index) => {
          if (index === currentQuestionIndex) {
            return (
              <div key={index}>
                <div className="question">{index + 1}. {qu.question}</div>
                {dispOptions(qu)}
                <div className="timer">Time remaining: {timer} seconds</div>
              </div>
            );
          }
          return null;
        })}

        {!submitted && currentQuestionIndex === ques.length && (
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
        )}

        {submitted && (
          <div className="Score">Your Score: {Score} out of 10</div>
        )}
        <br /><br />
        {submitted && (
          <button className="finish-button" onClick={handleFinish}>Finish</button>
        )}
        
      </div>
    </div>
  );
}

export default Quiz;
