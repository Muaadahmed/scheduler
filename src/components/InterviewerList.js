import React from "react";

import "components/InterviewerList.scss"

import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const InterviewerListItems = props.interviewers.map( interviewer => {
    console.log('interviewer', interviewer);
    return (
      <InterviewerListItem 
        key={interviewer.id} 
        name={interviewer.name} 
        avatar={interviewer.avatar} 
        selected = {interviewer.id === props.value.id} 
        setInterviewer = {() => props.onChange(interviewer)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{InterviewerListItems}</ul>
    </section>
  );
}