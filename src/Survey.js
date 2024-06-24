import React, { useState } from 'react';
import styled from 'styled-components';

const SurveyContainer = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  max-width: 700px;
  margin: 5% auto;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  color: black;
`;

const QuestionCounter = styled.p`
  font-size: 1em;
  color: red;
  text-align: center;
  margin-bottom: 5%;
`;

const QuestionContainer = styled.div`
  /* margin-bottom: 10%; */
`;

const QuestionText = styled.p`
  font-size: 1.2em;
  text-align: center;
  color: black;
  margin-bottom: 10%;
`;

const SegmentedProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px; /* Adjusted margin */
`;

const Segment = styled.div`
  flex: 1;
  position: relative;
  height: 10px;
  background-color: ${({ active }) => (active ? '#8fcbd3' : '#e0e0e0')};
  margin: 0 5px;
  border-radius: 10px;
  transition: background-color 0.3s ease; /* Smooth transition */
`;

const SegmentLabel = styled.span`
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8em;
  color: ${({ active }) => (active ? '#8fcbd3' : '#e0e0e0')};
`;

const DotBar = styled.div`
  position: relative;
  margin: 10px 0;
  height: 20px;
`;

const ProgressLine = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  background-color: #e0e0e0;
  z-index: 1;
`;

const Progress = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  height: 4px;
  background-color: #8fcbd3;
  z-index: 2;
  transition: width 0.3s ease; /* Smooth transition */
  width: ${({ width }) => width}%;
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 3;
`;

const Dot = styled.div`
  width: 14px;
  height: 14px;
  background-color: ${({ active }) => (active ? '#8fcbd3' : '#e0e0e0')};
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Smooth transition */
`;

const Label = styled.span`
  display: block;
  text-align: center;
  margin-top: 10px;
  font-size: 0.9em;
  color: black;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: black;
  font-size: 1em;
  cursor: pointer;
  margin: 0 10px;

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const labels = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree"
];

const questions = [
  "My leadership journey has progressed as I anticipated.",
  "I have ambitious aims of making a difference.",
  "I have spent fewer than 4 years in full time service or ministry.",
  "With hard work and determination, I have been able to persevere through the ministry challenges that have come my way."
];

const sections = ["IDEALISTIC", "DISILLUSIONED", "CYNICAL", "HOPEFUL"];

const Survey = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const getSectionProgress = (index) => {
    const questionsPerSection = Math.ceil(questions.length / sections.length);
    const currentSection = Math.floor(currentQuestion / questionsPerSection);
    return index <= currentSection;
  };

  const getProgressWidth = () => {
    const currentAnswer = answers[currentQuestion];
    return currentAnswer !== null ? ((currentAnswer + 1) / labels.length) * 100 : 0;
  };

  return (
    <SurveyContainer>
      <SegmentedProgressBar>
        {sections.map((section, index) => (
          <Segment key={index} active={getSectionProgress(index)}>
            <SegmentLabel active={getSectionProgress(index)}>
              {section}
            </SegmentLabel>
          </Segment>
        ))}
      </SegmentedProgressBar>
      <QuestionCounter>{currentQuestion + 1}/{questions.length}</QuestionCounter>
      <QuestionContainer>
        <QuestionText>{questions[currentQuestion]}</QuestionText>
        <DotBar>
          <ProgressLine />
          <Progress width={getProgressWidth()} />
          <DotContainer>
            {labels.map((label, index) => (
              <div key={index}>
                <Dot
                  active={answers[currentQuestion] === index}
                  onClick={() => handleAnswer(index)}
                />
                <Label>{label}</Label>
              </div>
            ))}
          </DotContainer>
        </DotBar>
      </QuestionContainer>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button onClick={prevQuestion} disabled={currentQuestion === 0}>
          &larr; PREV
        </Button>
      </div>
    </SurveyContainer>
  );
};

export default Survey;
