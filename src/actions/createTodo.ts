"use server";
import { revalidatePath } from "next/cache";
import { wait } from "./toggleTodo";

export async function createTodo(previousSate:unknown,formData: FormData) {
    if(formData.get("todo") == "")return {errorMsg:"Sorry the Title is Missing"}
	await wait(2000);
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
