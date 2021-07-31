import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { api } from '../../api';
import classes from './index.module.css';
import MultiChoiceProblem from './MultiChoiceProblem';
import Modal from '../Modal';
import GraphCreatorProblem from './GraphCreatorProblem';
import GraphSelectorProblem from './GraphSelectorProblem';
import ButtonLoud from '../Buttons/ButtonLoud';
import ButtonQuiet from '../Buttons/ButtonQuiet';

const PracticePage = ({
  type, question, data, hints, pageId, onResults,
}) => {
  const [canSubmit, setCanSubmit] = useState(false);
  const [submissionData, setSubmissionData] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [result, setResult] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);

  const submit = async () => {
    try {
      setSubmitting(true);
      const body = { submission: submissionData };
      const submission = await api.createPageSubmission(pageId, body);
      setResult(submission);
      setShowFeedback(true);
      onResults({ status: (submission.status === 'pass' ? 'correct' : 'incorrect'), pageId });
    } catch (e) {
      console.log('woops');
    } finally {
      setSubmitting(false);
    }
  };

  const onSubmissionChange = (d) => {
    setSubmissionData(d);
    setCanSubmit(true);
  };

  let problemJsx;
  switch (type) {
    case 'multichoice':
      problemJsx = (
        <MultiChoiceProblem
          onSubmissionDataChange={onSubmissionChange}
          options={data.options}
        />
      );
      break;
    case 'graphCreator':
      problemJsx = (
        <GraphCreatorProblem
          onSubmissionDataChange={onSubmissionChange}
          options={data.options}
        />
      );
      break;
    case 'graphSelector':
      problemJsx = (
        <GraphSelectorProblem
          onSubmissionDataChange={onSubmissionChange}
          width={data.width}
          height={data.height}
          nodes={data.nodes}
          edges={data.edges}
        />
      );
      break;
    default:
      throw new Error(`no component for problem type ${type}`);
  }

  return (
    <div className={classes.ProblemPage}>
      <div className={classes.LeftContent}>
        {problemJsx}
      </div>
      <div className={classes.RightContent}>
        <div className={classes.PromptBox}>
          <div className="arrow">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 55C43.8071 55 55 43.8071 55 30C55 16.1929 43.8071 5 30 5C16.1929 5 5 16.1929 5 30C5 43.8071 16.1929 55 30 55Z" stroke="white" strokeWidth="5" />
              <path d="M25 21.21C26.25 18.735 27.5 17.5 30 17.5C33.115 17.5 35 19.9725 35 22.445C35 24.9175 33.75 26.1525 30 28.6275V32.5M30 41.25V42.5" stroke="white" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>
          <div className={classes.Question}>
            {question}
          </div>
        </div>
        <div className={classes.ButtonPanel}>
          <ButtonQuiet onClick={() => setHintVisible(true)}>
            Hint
          </ButtonQuiet>
          <ButtonLoud disabled={!canSubmit || submitting} onClick={submit}>
            Submit
          </ButtonLoud>
        </div>
      </div>
      <Modal showModal={hintVisible} title="Hint" closeModal={() => setHintVisible(false)}>
        {hints[0]}
      </Modal>
      <Modal
        showModal={showFeedback}
        status={result && result.status === 'pass' ? 'correct' : 'incorrect'}
        title={result && result.status === 'pass' ? 'Correct, nice work!' : 'Not quite right...'}
        closeModal={() => setShowFeedback(false)}
      >
        {result.feedback}
      </Modal>
    </div>
  );
};

PracticePage.propTypes = {
  type: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.any.isRequired,
  hints: PropTypes.arrayOf(PropTypes.string).isRequired,
  pageId: PropTypes.string.isRequired,
  onResults: PropTypes.func.isRequired,
};

export default PracticePage;
