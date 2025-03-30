import React, { useState, useEffect } from "react";
import { getTasks, createTask, updateTaskStatus, deleteTask } from "./api";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", creatorUserID: 1, locationID: 1, status: "Pending" });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleCreateTask = async () => {
    await createTask(newTask);
    fetchTasks();
  };

  const handleUpdateTask = async (taskID, status) => {
    await updateTaskStatus(taskID, status);
    fetchTasks();
  };

  const handleDeleteTask = async (taskID) => {
    await deleteTask(taskID);
    fetchTasks();
  };

  return (
    <div>
      <h1>Community Help Tasks</h1>

      <input type="text" placeholder="Task Title" onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
      <input type="text" placeholder="Description" onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
      <button onClick={handleCreateTask}>Create Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.TaskID}>
            {task.Title} - {task.Status}
            <button onClick={() => handleUpdateTask(task.TaskID, "In Progress")}>Mark In Progress</button>
            <button onClick={() => handleUpdateTask(task.TaskID, "Completed")}>Mark Completed</button>
            <button onClick={() => handleDeleteTask(task.TaskID)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
