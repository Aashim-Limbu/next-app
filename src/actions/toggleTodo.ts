import { revalidatePath } from "next/cache"

type Props = {
    id:string,
    completed:boolean
}
export default async function toggleTodo ({id,completed}:Props){
await fetch(`http://localhost:3000/todos/${id}`,{
    method: "PATCH",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        completed
    })
}).then(res => res.json())
revalidatePath("/")
}
