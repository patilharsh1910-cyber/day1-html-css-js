const express = require("express"); 

const app = express(); 

  

// Middleware to read JSON body 

app.use(express.json()); 

  

// Temporary Database (Example Data) 

let tasks = [ 

    { id: 1, title: "Learn HTML" }, 

    { id: 2, title: "Learn CSS" }, 

    { id: 3, title: "Learn JS" } 

]; 

  

// Home Route 

app.get("/", (req, res) => { 

    res.send("Backend is working!"); 

}); 

  

// GET API — Fetch All Tasks 

app.get("/tasks", (req, res) => { 

    res.json(tasks); 

}); 

  

// POST API — Add New Task 

app.post("/tasks", (req, res) => { 

    const newTask = { 

        id: tasks.length + 1,       // Auto increment ID 

        title: req.body.title       // Title coming from frontend/Postman 

    }; 

  

    tasks.push(newTask);            // Add to array 

  

    res.json({ 

        message: "Task added successfully!", 

        task: newTask 

    }); 

}); 

  

// Start the Server 

app.listen(5000, () => { 

    console.log("Server running on port 5000"); 

}); 
