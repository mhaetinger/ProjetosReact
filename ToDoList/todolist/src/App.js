import { useState } from 'react';
import './global.css'
import './styles.css'
import { IoMdAdd } from 'react-icons/io'
import {MdOutlineClose} from 'react-icons/md'

import{ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


	const[task, setTask] = useState("")
	const[tasks, setTasks] = useState([])

	function handleCreateTask(){

		if(task === ""){
				
			toast.error("Digite alguma tarefa")

		}else{
				//adiciona task
			const idRandon = (num) => Math.floor(Math.random() * num)
			const newTask = { id: idRandon(1234587), title: task, isComplete: false}

			setTasks([...tasks, newTask])
			setTask("")
		}

	}

	function handleToggleTaskCompletion(id){

		const taskComplete = tasks.map(task => {
			if(task.id ===id){
				return{...task, isComplete: !task.isComplete}
			}
			return task
		})

		setTasks(taskComplete)

	}
	//click do evento deletar
	function handleDeleteTask(id){
		setTasks(tasks.filter(remove => remove.id !== id))
	}

	return (
		<div className="app">

			<ToastContainer/>

			<div className='todo'>

				<header>

					<input type="text" value={task} onChange={(ev) => setTask(ev.target.value)} />

					<button onClick={handleCreateTask}> <IoMdAdd /> </button>
				</header>

				{tasks.map(task => (
				<div key={task.id} className={task.isComplete ? 'task-container completed' : 'task-container'}>
					<div className='check-and-title'>
						<label className='checkbox-container'>
							<input type='checkbox' 
							onClick={() => handleToggleTaskCompletion(task.id)} 
							/>
							<span className='checkmark'></span>
						</label>
						<p>{task.title}</p>
					</div>
					<div>
						<MdOutlineClose onClick={() => handleDeleteTask(task.id)}/>
					</div>
				</div>
				))}
			</div>

		</div>
	);
}

export default App;
