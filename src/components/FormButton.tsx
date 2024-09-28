"use client"
import { useFormStatus } from "react-dom";

function FormButton() {
	const {pending}= useFormStatus();
	return (
		<button
			className="bg-indigo-600 p-1 rounded-md text-white font-semibold  hover:bg-indigo-700 cursor-pointer"
			disabled={pending}
			type="submit"
		>
			{pending ? "Adding..." : "Add Task"}
		</button>
	);
}

export default FormButton;
