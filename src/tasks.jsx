import { useEffect, useState } from "react";
import CreateTask from "./components/createTask";
import ListTask from "./components/ListTasks";

function Task (){
    const [tasks, setTasks] = useState([])

console.log("tasks", tasks)


useEffect(() => {
setTasks(JSON.parse(localStorage.getItem("tasks"))) 
}, [])
    return(
        <div className="container"> 
            <CreateTask  tasks={tasks} setTasks={setTasks}/>
            <ListTask  tasks={tasks} setTasks={setTasks}/>
        </div>

    )
}

export default Task