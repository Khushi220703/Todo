
import './App.css';
import CreateTodo from "./components/createTodo";
import ListOfTodo from './components/listOfTodo';
import React, { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem("todos")) || []);
  const [currentEditId, setCurrentEditId] = useState(null); // Track the ID of the task being edited

  useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos || []));
  }, [todos]);

  const addTodo = (newTodo) => {
     setTodos([newTodo, ...todos]);
  }

  const deleteTodo = (selectedTodo) => {
     const newTodos = todos.filter((item) => item.id !== selectedTodo.id);
     setTodos(newTodos);
   };

   const doneTodo = (selectedTodo) => {
      document.getElementById("taskName-" + selectedTodo.id).style.textDecoration = "line-through";
   }

   const editTodo = (selectedTodo) => {
      setCurrentEditId(selectedTodo.id); // Set the current edit ID
      document.getElementById("editTodo").value = selectedTodo.todo;
      document.getElementById("edit-form").style.display = "flex";
   }

   const editingTodo = () => {
     const newTodoText = document.getElementById("editTodo").value;

     
     const updatedTodos = todos.map((todo) => {
       if (todo.id === currentEditId) {
         return { ...todo, todo: newTodoText }; 
       }
       return todo;
     });

     setTodos(updatedTodos); 
     document.getElementById("edit-form").style.display = "none"; 
     setCurrentEditId(null); 
   }

   const cancelEdit = () => {
     document.getElementById("edit-form").style.display = "none"; 
     setCurrentEditId(null); 
   }

  return (
    <>
      <CreateTodo addTodo={addTodo} />
      <ListOfTodo 
         todos={todos} 
         deleteTodo={deleteTodo} 
         doneTodo={doneTodo} 
         editTodo={editTodo} 
         editingTodo={editingTodo} 
         cancelEdit={cancelEdit} // Pass cancelEdit to ListOfTodo
      />
    </>
  );
}

export default App;
