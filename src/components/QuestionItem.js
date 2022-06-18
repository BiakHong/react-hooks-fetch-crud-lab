import React from "react";

function QuestionItem({ question, onDeleteClick , changingAnswer}) {
  const { id, prompt, answers, correctIndex } = question;

 

  function handleDeleteClick() {
    onDeleteClick(id);
  }
  function changAnswer(event){
    changingAnswer(id,parseInt(event.target.value))
  }
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={changAnswer}>{options}</select>
      </label>
      <button  onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
