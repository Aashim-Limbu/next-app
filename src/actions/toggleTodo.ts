"use server";
import { revalidatePath } from "next/cache";
import { Todo } from "../api/getTodo";

export default async function toggleTodo(id: string, todo: Todo) {
	await fetch(`http://localhost:3000/todos/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title: todo.title,
			completed: todo.completed,
		}),
	}).then((res) => res.json());
	revalidatePath("/");
}
