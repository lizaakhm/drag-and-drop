import React, { useState } from "react";

function CreateTask({ tasks, setTasks }) {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo", 
  });

  const handleSubmitTask = (e) => {
    e.preventDefault();

    if(task.name.length < 1) {
       alert("write anything")
       return

    }

    const newTask = {
      id: tasks.length + 1,
      name: task.name,
      status: task.status,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    
  
    setTask({
      id: "",
      name: "",
      status: "todo",
    });
  };

  return (
    <form onSubmit={handleSubmitTask}>
      <input
        type="text"
        id="taskInput"
        value={task.name}
        onChange={(element) => setTask({ ...task, name: element.target.value })}
      />
      <button type="submit" className="createbtn">
        Create
      </button>
    </form>
  );
}

export default CreateTask;
