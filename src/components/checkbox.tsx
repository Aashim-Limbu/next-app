import React, { useOptimistic } from 'react'
import toggleTodo from '../actions/toggleTodo';
import { Todo } from '../api/getTodo';
//useOptimistic is used to temporary update the checkbox before the validation from the server
function Checkbox({todo}:{todo:Todo}) {
    const [optimisticChecked,setOptimisticChecked] = useOptimistic(todo.completed)
  return (
		<input
			type="checkbox"
			onChange={async (e) => {
                setOptimisticChecked(e.target.checked)
				await toggleTodo(todo.id.toString(), {
					...todo,
					completed: e.target.checked,
				});
			}}
			checked={optimisticChecked}
		/>
	);
}

export default Checkbox
