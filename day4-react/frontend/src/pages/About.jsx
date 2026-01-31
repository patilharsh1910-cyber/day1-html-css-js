import { useEffect, useState } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([]);  
  const [title, setTitle] = useState("");  

  // Load all tasks from backend
  function loadTasks() {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }

  // Run only once
  useEffect(() => {
    loadTasks();
  }, []);

  // Add new task (POST API)
  function addTask(e) {
    e.preventDefault(); // stops page refresh

    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),  // send JSON
    }).then(() => {
      setTitle("");  // clear input box
      loadTasks();   // refresh list after add
    });
  }

  return (
    <div>
      <h2>Add Task</h2>

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button>Add Task</button>
      </form>

      <h2>All Tasks</h2>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;


