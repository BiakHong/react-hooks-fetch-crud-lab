import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [question, setQuestions] = useState([])
  const qList = question.map((q)=> <QuestionItem question={q} changingAnswer={changingAnswer} addQuestion={addQuestion} onDeleteClick={onDeleteClick}/>)


  //deleting a question
  function onDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const updatedQuestions = question.filter((q) => q.id !== id);
        setQuestions(updatedQuestions);
      });
  }

// changing an answer
function changingAnswer(id, correctIndex){
  fetch("http://localhost:4000/questions/${id}", {
    method:"PATH",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify({correctIndex}),
  })
  .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = question.map((q) => {
          if (q.id === updatedQuestion.id) return updatedQuestion;
          return q;
        });
        setQuestions(updatedQuestions);
      });

}
    // Update state by passing the array of items to setItems  
    useEffect(() => {
      fetch("http://localhost:4000/questions")
        .then((r) => r.json())
        .then((q) => setQuestions(q));
    }, []);

    //Adding newQuestion
    function addQuestion(newQuestion){
      setQuestions({...question, newQuestion})
    }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{qList}</ul>
    </section>
  );
}

export default QuestionList;
