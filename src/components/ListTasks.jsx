import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import '../index.css';


const ListTask = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    const filteredTodos = tasks.filter((task) => task.status === "todo");
    const inProgressTodos = tasks.filter((task) => task.status === "in progress");
    const doneTodos = tasks.filter((task) => task.status === "done");

    setTodos(filteredTodos);
    setInProgress(inProgressTodos);
    setDone(doneTodos);
  }, [tasks]);

  const statuses = ["todo", "in progress", "done"];

  return (
    <div className="flex">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          done={done}
        />
      ))}
    </div>
  );
};

const addItemToSection = (id, status, setTasks) => {
    setTasks((prev) => {
      const modifiedTasks = prev.map((task) => {
        if (task.id === id) {
          return { ...task, status: status };
        }
        return task; 
      });
      return modifiedTasks;
    });
};

const Section = ({ status, tasks, setTasks, todos, inProgress, done }) => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: "task",
      drop: (item) => addItemToSection(item.id, status, setTasks),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));




  let text = "Todo";
  let background = "bg-stale-50"
  let tasksToMap = todos

  if(status === "in progress") {
    text= "In Progress"
    background = "bg-purple-500"
    tasksToMap = inProgress
  }

  if(status === "done"){
    text="done"
    background = "bg-green-500"
    tasksToMap = done
  }




  return (
    <div ref={drop} className={`w-64`}  >
      <Header text={text} background={background} count={tasksToMap.length} />
      {tasksToMap.length > 0 && tasksToMap.map(task => <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} /> )}
    
    </div>
  );
};

const Header = ({ text, background, count}) => {
  return <div className={`${background} headerBg`}>{text} <div className="header">
    {count}</div> </div>;
};

const Task = ({task,tasks, setTasks}) => {

    const[{isDragging}, drag] = useDrag(() => ({
        type:"task",
        item: {id:task.id},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    console.log(isDragging)

    const handleRemove = (id) => {
        console.log(id)

        const filteredTasks = tasks.filter (e => e.id !== id)

        localStorage.setItem("tasks", JSON.stringify(filteredTasks))
        setTasks(filteredTasks)
    }
  return <div ref={drag} className="taskBox">
    <p>{task.name}</p>
    <button className="taskbtn" onClick={() => handleRemove(task.id)} >x</button>
  </div>
};

export default ListTask
