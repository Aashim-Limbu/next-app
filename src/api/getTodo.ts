export type Todo = {
	title: string;
	id: number;
	completed: boolean;
};
export default function getTodos(): Promise<Todo[]> {
	console.log("hello from get Todos");
	return fetch("http://localhost:3000/todos", { cache: "no-store" })
		.then((res) => res.json())
		.then((data) => data as Todo[]);
}
