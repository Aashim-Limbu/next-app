"use client";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { Todo } from "../api/getTodo";
import { createTodo } from "../actions/createTodo";
import toggleTodo from "../actions/toggleTodo";
// import { revalidatePath } from "next/cache";
function TodoForm({ todos }: { todos: Todo[] }) {
	const [isPending, startTransition] = useTransition();
	const inputRef = useRef<HTMLInputElement>(null);
	const editRef = useRef<HTMLInputElement>(null);
	const [isedit, setisEdit] = useState<string | null>(null);
	const [isInput, setisInput] = useState<string>("");
	useEffect(() => {
		if (!editRef.current) return;
		setisInput(editRef.current.value);
	}, [isedit]);
	async function handleClick() {
		startTransition(async () => {
			await Promise.all(
				todos.map((todo) => {
					toggleTodo(todo.id.toString(), { ...todo, completed: true });
				})
			);
		});
	}
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
				<div className="flex gap-x-2">
					<input
						className="py-1 flex-1 border-2 focus:border-indigo-500 rounded-md px-2 outline-none"
						name="todo"
						type="text"
						ref={inputRef}
					/>
					<button
						className="bg-indigo-600 p-1 rounded-md text-white font-semibold  hover:bg-indigo-700 cursor-pointer"
						type="submit"
					>
						Add Task
					</button>
				</div>
			</form>
			<ul className="py-2 bg-slate-300 flex flex-col gap-2 px-2">
				{todos.map((todo) => (
					<li className="flex  items-center gap-x-4" key={todo.id}>
						<input
							type="checkbox"
							disabled={isPending}
							onChange={async (e) => {
								await toggleTodo(todo.id.toString(), {
									...todo,
									completed: e.target.checked,
								});
							}}
							checked={todo.completed}
						/>
						{isedit === todo.id.toString() ? (
							<div className="flex items-center justify-center gap-x-2 py-2">
								<input
									key={todo.id}
									type="text"
									ref={editRef}
									className="px-2 py-1"
									defaultValue={todo.title}
									onChange={(e) => {
										setisInput(e.target.value);
									}}
								/>
								<button
									onClick={async () => {
										await toggleTodo(todo.id.toString(), {
											...todo,
											title: isInput,
										});
										setisEdit(null);
									}}
									className="px-4 bg-indigo-600 rounded-md text-white font-bold hover:bg-indigo-500 py-1"
								>
									Save
								</button>
							</div>
						) : (
							<span
								onClick={() => setisEdit(todo.id.toString())}
								className="text-indigo-600 font-bold"
							>
								{todo.title}
							</span>
						)}
					</li>
				))}
			</ul>
			<div className="py-1">
				<button
					disabled={isPending}
					onClick={handleClick}
					className={`bg-indigo-600 px-2 py-1 text-white font-bold rounded-md ${
						isPending && "cursor-not-allowed bg-gray-500"
					}`}
				>
					{isPending ? "Loading ..." : "Select All"}
				</button>
			</div>
		</>
	);
}

export default TodoForm;
