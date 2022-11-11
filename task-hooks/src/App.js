import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);

  const { sendRequest: fetchTasks, isLoading, error } = useHttp();

  useEffect(() => {
    const requestConfig = {
      url: "https://react-complete-guilde-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
    };
    const transformTasks = (tasks) => {
      const mappedTasks = Object.entries(tasks).map(([key, value]) => ({
        id: key,
        text: value.text,
      }));
      setTasks(mappedTasks);
    };
    fetchTasks(requestConfig, transformTasks);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
