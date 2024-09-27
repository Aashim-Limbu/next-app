import { revalidatePath } from "next/cache";
export default async function Page() {
	revalidatePath("/");
	console.log("Revalidated home route");
	return (
		<>
			<h1>Revalidate Home Path</h1>

			<a href="/" className="underline">
				Go to Home
			</a>
		</>
	);
}
