"use strict";
/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */

  // Going for hard challenge and skipping eazy one 
  const express = require('express');
  const path = require('path');
  const fs = require('fs');

  const app = express();
  
  const todoDirectory = path.join(__dirname,'./Todos');
  

  app.use(express.json()); 
  app.use(express.urlencoded({extended: true}));
  app.get("/todos",(req,res)=>{
    
    fs.readdir(todoDirectory,(err,files)=>{
      
      if(err){
        return res.status(500).json({error:"Server error"})
      }
      res.status(200).json(files);

    });
  });//get request to return files present in todoDirectory.

  app.get("/todos/:id",(req,res)=>{
    fs.readFile(path.join(__dirname,'./Todos/',`${req.params.id}.txt`),"utf-8",(err,data)=>{
      if(err){
        return res.status(404).send("File Not Found");
      }else{
        return res.status(200).json({data:data});
      }
    });
  });

  app.post("/todos",(req,res)=>{
    const file  = {
      id:Math.trunc(Math.random()*10000),
      title:req.body.title,
      description:req.body.description,
      completed : req.body.completed
    }
    
    const filenamePath = path.join(__dirname,'./Todos/',`${file.id}.txt`);
    const data = `Title : ${file.title??empty}\nCompleted:${file.completed || false}\nDescription : ${file.description??"empty"}`;
    const fileName = filenamePath.split("/").pop();
      fs.appendFile(filenamePath,data,err=>{
        if(!err){
        return res.status(201).json({
          message:`Created with the ID ${file.id}`
        })
      }
    });
  }); // Post request to make a new file with an id,title and body
  
  app.put("/todos/:id",(req,res)=>{

    fs.readdir(todoDirectory,(err,files)=>{
      
      if(err){
        return res.status(500).json({error:"Server error"})
      }else{
              const data = `Title : ${req.body.title}\nCompleted:${req.body.completed}\nDescription : ${req.body.description}`;
            if(files.includes(`${req.params.id}.txt`)){
            fs.writeFile(path.join(__dirname,'./Todos/',`${req.params.id}.txt`),data,err=>{
              if(err){
                return res.status(404)
              }else{
                res.status(200).send();
              }
            });
            }else{
              return res.status(404).send("File not found");
            }
      }


    });
    
  }); // Put request to check and update files

 app.delete("/todos/:id", (req,res)=>{
  
  fs.readdir(todoDirectory,(err,files)=>{
      
    if(err){
      return res.status(500).json({error:"Server error"})
    }else{
      if(files.includes(`${req.params.id}.txt`)){
      const pathToFile = path.join(__dirname,'./Todos/',`${req.params.id}.txt`);
      fs.unlink(pathToFile,err=>{
        if(err){
          res.status(404).send();
        }else{
          res.status(200).send("File deleted succesfully");
        }
      });
    }else{
      res.status(404).send("File not found");
      
    }
    }
    

  });

  
 }); // Delete request to delete the file of requested id if it exists

app.listen(3000,()=>{
  console.log("listening on port 3000");
});
  module.exports = app;