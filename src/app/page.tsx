import TodoForm from "../components/TodoForm";
import getTodos from "../api/getTodo";


async function Home() {
	const todos = await getTodos();
	console.log("Home Revalidated");
	console.log(todos);

	return (
		<div className="py-10 px-5 flex flex-col gay-y-2">
			<h1 className="text-red-500 text-4xl font-bold">This is Home Page</h1>
			<TodoForm todos={todos} />
			{/* <a href="revalidate">Revalidate</a> */}
		</div>
	);
}

export default Home;
