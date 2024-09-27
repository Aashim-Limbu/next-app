"use server";
import { revalidatePath } from "next/cache";

export async function createTodo(formData: FormData) {
	if (formData.get("todo") == "") return;
	const data = await fetch("http://localhost:3000/todos", {
		method: "Post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title: formData.get("todo"),
			completed: false,
		}),
	}).then((res) => res.json());
	console.log(data);
	revalidatePath("/"); //To reflect back the change made in the database we revalidate the cache
}
