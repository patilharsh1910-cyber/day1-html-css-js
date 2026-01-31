import { useEffect, useState } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  function loadTasks() {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }

  useEffect(() => {
    loadTasks();
  }, []);

  function addTask(e) {
    e.preventDefault();

    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    }).then(() => {
      setTitle("");
      loadTasks();
    });
  }

  function deleteTask(id) {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    }).then(() => loadTasks());
  }

  function updateTask(id) {
    const newTitle = prompt("Enter updated task title:");
    if (!newTitle) return;

    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    }).then(() => loadTasks());
  }

  return (
    <div style={{ 
      maxWidth: "500px", 
      margin: "40px auto", 
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      backgroundColor: "white"
    }}>
      
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Task Manager
      </h2>

      <form 
        onSubmit={addTask} 
        style={{ display: "flex", marginBottom: "20px" }}
      >
        <input
          type="text"
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />

        <button
          style={{
            padding: "10px 15px",
            borderRadius: "6px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </form>

      <ul style={{ padding: 0, listStyle: "none" }}>
        {tasks.map((task) => (
          <li
            key={task._id}
            style={{
              border: "1px solid #ddd",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#f9f9f9",
            }}
          >
            <span>{task.title}</span>

            <div>
              <button
                onClick={() => updateTask(task._id)}
                style={{
                  marginRight: "10px",
                  padding: "5px 10px",
                  borderRadius: "6px",
                  backgroundColor: "#2196F3",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => deleteTask(task._id)}
                style={{
                  padding: "5px 10px",
                  borderRadius: "6px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
