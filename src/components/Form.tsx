"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { FormEvent, useState } from "react";

function Form() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const [query, setQuery] = useState(searchParams.get("query") || "");
	const router = useRouter();

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		const tempQry = new URLSearchParams(searchParams);
		tempQry.set("query", query);
		router.push(`${pathname}?${tempQry.toString()}`);
	}
	return (
		<form
			onSubmit={handleSubmit}
			className="bg-slate-200 flex flex-col py-5 px-2 gap-2 rounded-md"
		>
			<input
				className="py-1 border-2 focus:border-indigo-500 rounded-md px-2 outline-none"
				value={searchParams.get("query")?.toString()}
				onChange={(e) => setQuery(e.target.value)}
				type="text"
			/>
			<button
				className="bg-indigo-600 py-1 rounded-md text-white font-semibold  hover:bg-indigo-700 cursor-pointer"
				type="submit"
			>
				Add Task
			</button>
		</form>
	);
}

export default Form;
