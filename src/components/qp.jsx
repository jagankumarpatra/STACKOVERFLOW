// QuestionPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const QuestionPage = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetch(`https://api.stackexchange.com/2.3/questions/${questionId}?order=desc&sort=activity&site=stackoverflow&filter=!*Mg4PjfgUpvo9FU5`)
      .then(response => response.json())
      .then(data => setQuestion(data.items[0]))
      .catch(error => console.error('Error fetching question data:', error));

    fetch(`https://api.stackexchange.com/2.3/questions/${questionId}/answers?order=desc&sort=activity&site=stackoverflow&filter=!6WPIompiwXoE5`)
      .then(response => response.json())
      .then(data => setAnswers(data.items))
      .catch(error => console.error('Error fetching answers data:', error));
  }, [questionId]);

  return (
    <div>
      {question && (
        <div>
          <h1>{question.title}</h1>
          <p>{question.body}</p>
        </div>
      )}

      <h2>Answers:</h2>
      <ul>
        {answers.map(answer => (
          <li key={answer.answer_id}>
            <p>{answer.body}</p>
            {/* You can add comments logic here if needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionPage;
