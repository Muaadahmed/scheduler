import React from "react";

import Header from "./Header";

import Show from "./Show";

import Empty from "./Empty";

import Form from "./Form";

import Status from "./Status";

import Confirm from "./Confirm";

import "components/Appointment/styles.scss";

import { useVisualMode } from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE ="CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  // console.log("appointment props interview", props.interview);
  function save(name, interviewer) {
    // console.log("save name",name);
    // console.log("save interviewer", interviewer)
    const interview = {
      student: name,
      interviewer: interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    })
  }

  function cancel() {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
  }
  // console.log('appointment comp', props);
  // console.log("form interview", props.interview)
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview ? props.interview.student : ""}
          interviewer={props.interview ? props.interview.interviewer : null}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          student={props.interview ? props.interview.student : ''}
          interviewer={props.interview ? props.interview.interviewer.id : ''}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => transition(EMPTY)}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving"/>
      )}
      {mode === DELETING && (
        <Status message="Deleting"/>
      )}
      {mode === CONFIRM && (
        <Confirm 
        message="Confirm"
        onCancel={() => transition(SHOW)}
        onConfirm={cancel}
        />
      )}

    </article>
  );
}