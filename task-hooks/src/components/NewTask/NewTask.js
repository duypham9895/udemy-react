import React from "react";
import useHttp from "../../hooks/use-http";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const { sendRequest: createTask, isLoading, error } = useHttp();

  const enterTaskHandler = async (taskText) => {
    const requestConfig = {
      url: "https://react-complete-guilde-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
      method: "POST",
      body: { text: taskText },
      headers: {
        "Content-Type": "application/json",
      },
    };
    const transformTask = ({ name }) => {
      props.onAddTask({ id: name, text: taskText });
    };
    createTask(requestConfig, transformTask);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
