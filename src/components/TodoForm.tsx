"use client";
import React, { useRef } from "react";
import { Todo } from "../api/getTodo";
import { createTodo } from "../actions/createTodo";
function TodoForm({ todos }: { todos: Todo[] }) {
	const inputRef = useRef<HTMLInputElement>(null);
	return (
		<>
			<form
				action={async (formData) => {
					await createTodo(formData);
					if (!inputRef.current) return;
					inputRef.current.value = "";
				}} //! just by defining actions it prevent the default behavior of submisssion
				className="bg-slate-200 flex flex-col py-5 px-2 gap-2 rounded-md"
			>
				<input
					className="py-1 border-2 focus:border-indigo-500 rounded-md px-2 outline-none"
					name="todo"
					type="text"
					ref={inputRef}
				/>
				<button
					className="bg-indigo-600 py-1 rounded-md text-white font-semibold  hover:bg-indigo-700 cursor-pointer"
					type="submit"
				>
					Add Task
				</button>
			</form>
			<ul className="py-2 bg-slate-300 flex flex-col gap-2 px-2">
				{todos.map((todo) => (
					<li className="flex  items-center gap-x-4" key={todo.id}>
						<input type="checkbox" defaultChecked={todo.completed} />
						<span className="text-indigo-600 font-bold">{todo.title}</span>
					</li>
				))}
			</ul>
		</>
	);
}

export default TodoForm;
