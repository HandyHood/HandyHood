import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
  assignUserToTask,
  getUsers,
} from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/Tasks.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    creatorUserID: 1,
    locationID: 1,
    status: "Pending",
  });
  // Use an object to store assignment details for each task
  const [assignments, setAssignments] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
    // Reset assignments when tasks are fetched
    setAssignments({});
  };

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
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

  const handleAssignUser = async (taskID) => {
    const assignment = assignments[taskID] || {};
    const { userID, date, time } = assignment;

    if (!userID || !date || !time) {
      alert("Please select a user, date, and time for this task.");
      return;
    }

    try {
      await assignUserToTask(taskID, userID, date, time);
      alert("User assigned to task successfully!");
      // Clear the assignment for this task after successful assignment
      setAssignments((prev) => {
        const newAssignments = { ...prev };
        delete newAssignments[taskID];
        return newAssignments;
      });
      fetchTasks(); // Refresh tasks to show the updated assignment
    } catch (error) {
      alert("Failed to assign user to task.");
    }
  };

  const handleAssignmentChange = (taskID, field, value) => {
    setAssignments((prev) => ({
      ...prev,
      [taskID]: {
        ...(prev[taskID] || {}),
        [field]: value,
      },
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="tasks-container">
      <h1 className="tasks-header">HandyHood Tasks</h1>
      <div className="tasks-form">
        <input
          type="text"
          placeholder="Task Title"
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="tasks-input"
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          className="tasks-input"
        />
        <button className="tasks-button" onClick={handleCreateTask}>
          Create Task
        </button>
      </div>
      <ul className="tasks-list">
        {tasks.map((task) => {
          const assignment = assignments[task.TaskID] || {};
          return (
            <li key={task.TaskID} className="tasks-item">
              <div>
                <span className="tasks-text">
                  {task.Title} - {task.Status}
                </span>
                {task.AssignedUsername && (
                  <p className="tasks-assigned">
                    Assigned to: {task.AssignedUsername}
                  </p>
                )}
              </div>
              <div className="tasks-actions">
                <button
                  className="tasks-action-button"
                  onClick={() => handleUpdateTask(task.TaskID, "In Progress")}
                >
                  In Progress
                </button>
                <button
                  className="tasks-action-button"
                  onClick={() => handleUpdateTask(task.TaskID, "Completed")}
                >
                  Completed
                </button>
                <button
                  className="tasks-delete-button"
                  onClick={() => handleDeleteTask(task.TaskID)}
                >
                  Delete
                </button>
                <div className="tasks-assign-form">
                  <select
                    value={assignment.userID || ""}
                    onChange={(e) =>
                      handleAssignmentChange(
                        task.TaskID,
                        "userID",
                        e.target.value,
                      )
                    }
                    className="tasks-select"
                  >
                    <option value="">Select User</option>
                    {users.map((user) => (
                      <option key={user.UserID} value={user.UserID}>
                        {user.Username}
                      </option>
                    ))}
                  </select>
                  <input
                    type="date"
                    value={assignment.date || ""}
                    onChange={(e) =>
                      handleAssignmentChange(
                        task.TaskID,
                        "date",
                        e.target.value,
                      )
                    }
                    className="tasks-input"
                  />
                  <input
                    type="time"
                    value={assignment.time || ""}
                    onChange={(e) =>
                      handleAssignmentChange(
                        task.TaskID,
                        "time",
                        e.target.value,
                      )
                    }
                    className="tasks-input"
                  />
                  <button
                    className="tasks-assign-button"
                    onClick={() => handleAssignUser(task.TaskID)}
                  >
                    Assign
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <button className="tasks-logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Tasks;
