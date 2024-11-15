import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';
import "../stylesheets/listOfTodo.css";

const ListOfTodo = ({ todos, deleteTodo, doneTodo,editTodo,editingTodo }) => {
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 4; // Number of items to show per page

   const totalPages = Math.ceil(todos.length / itemsPerPage);

   // Calculate the items to display for the current page
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentTodos = todos.slice(indexOfFirstItem, indexOfLastItem);

   const goToNextPage = () => {
      if (currentPage < totalPages) {
         setCurrentPage(prevPage => prevPage + 1);
      }
   };

   const goToPreviousPage = () => {
      if (currentPage > 1) {
         setCurrentPage(prevPage => prevPage - 1);
      }
   };

   return (
      <div>
         <div className="listOfTodo">
            <h1>List of Tasks</h1>
            {todos.length === 0 ? (
               <p className="empty">The list is empty</p>
            ) : (
               <div className="todos">
                  {currentTodos.map((todo) => (
                     <div className="todo" key={todo.id}>
                        <p id={`taskName-${todo.id}`} className='taskName'>{todo.todo}</p>
                        <div className="action">
                           <span className="right-icon" onClick={() => doneTodo(todo)}>
                              <AiOutlineCheck
                                 style={{ color: 'blue', margin: "20px 10px" }}
                                 
                              />
                           </span>
                           <span className="editButton" onClick={() => editTodo(todo)}>
                              <p style={{ color: "green", fontWeight: "500" }}>Edit</p>
                           </span>
                           <span className='cross-icon'  onClick={() => deleteTodo(todo)}>
                              <AiOutlineClose
                                 style={{ color: 'red', margin: "20px 10px" }}
                                
                              />
                           </span>
                        </div>
                     </div>
                  ))}

                  <form className='editForm' id='edit-form'>
                     <h1 className='edit-heading'>Edit Task:</h1>
                     <input type="text" name="editTodo"  id="editTodo" placeholder='Edit task' className='edit-input'/>
                     <div className="buttons">
                           <button className='submit edit-button' onClick={()=>editingTodo()}>Submit</button>
                           <button className='cancel edit-button'>Cancel</button>
                     </div>
                  </form>
                  
                  {/* Pagination controls */}
                  <div className='pagination-controler'>
                     <button
                        className='pagination-button'
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                     >
                        Prev
                     </button>
                     <span className='page-number'>Page {currentPage} of {totalPages}</span>
                     <button
                        className='pagination-button'
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                     >
                        Next
                     </button>
                  </div>
               </div>
            )}

            
         </div>
         
      </div>
   );
}

export default ListOfTodo;
