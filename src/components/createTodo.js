import React, { useState } from 'react';
import "../stylesheets/createTodo.css";
import { useForm } from 'react-hook-form';

const CreateTodo = ({ addTodo }) => {


    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {

        const newTodo = {
            todo: data.addTodo,
            id: Date.now()
        };


        addTodo(newTodo);


        reset();
    };

    return (
        <div>
            <div className="createTodo">
                <h1>Todo List</h1><br />
                <div className="input-button">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            type="text"
                            name="addTodo"
                            id="addTodo"
                            placeholder='Type a task'
                            {...register("addTodo", { required: true })}
                        />
                        <button>ADD</button>
                        {errors.addTodo && <p className="error">This field is required</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTodo;
