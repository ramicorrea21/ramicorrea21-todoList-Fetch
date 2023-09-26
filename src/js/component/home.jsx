import { useEffect, useState } from "react";
import React from "react";
import "../../styles/index.css"

const Home = () => {
	const [task, setTask] = useState({ label: "" })
	const [list, setList] = useState([])

	let URL = 'https://playground.4geeks.com/apis/fake/todos/user/ramicorrea21'

	const addTask = (e) => {
		setTask({ label: e.target.value })
	}
	const addList = async (e) => {
		if (task.label.trim() != "") {
			if (e.key === "Enter") {
				try {
					let response = await fetch(URL, {
						method : "PUT",
						headers : {
							"Content-Type": "application/json"
						},
						body : JSON.stringify([...list, task])
					})
					
					if(response.ok){
						getTasks()
						setTask({ label: "" })
					}
					
				} catch (error) {
					console.log(error)
				}
			}
		}
	}

	const getTasks = async () => {

		try {
			let response = await fetch(URL)
			let data = await response.json()

			if (response.ok) {
				setList(data)
			}
			if (response.status === 404) {
				createUser()
			}
		} catch (error) {
			console.log(error);
		}

	}

	const createUser = () => {
		fetch(URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify([])
		})
		.then(resp => {resp.ok? getTasks() : ''})
	}

	const deleteTask = async (t, index) =>{
		let auxArr = list.filter(
			(t, i) => index != i
		)
		try {
			let response = await fetch(URL, {
				method : "PUT",
				headers :{
					"Content-Type": "application/json"
				},
				body : JSON.stringify(auxArr)
			})
			{response.ok ? getTasks() : console.log("hay un error");}
		} catch (error) {
			console.log(error);
		}

	}

	const deleteList = async() =>{
		try {
			let response = await fetch(URL, {
				method : "DELETE",
				headers :{
					"Content-Type": "application/json"
				},
			})
			{response.ok ? getTasks() : ""}
		} catch (error) {
			console.log(error)
		}
	}


	useEffect(() => {
		getTasks()
	}, [])




	return (
		<>
			<h1>Todo List</h1>
			<div className="container d-flex justify-content-center">
				<ul className="d-inline-block">
					<li>
						<form onSubmit={(e) => { e.preventDefault() }}>
							<input type="text"
								className="form-control"
								placeholder="Whats need to be done?"
								onChange={addTask}
								value={task.label}
								onKeyDown={addList} />
						</form>
					</li>

					{list.length != 0 ? list.map((t, index) => {
						return (<li className=" border rounded  d-flex justify-content-between" key={index}>
							<p className="py-0 my-0">{t.label}</p>
							<button type="button" className="btn-close close" aria-label="Close"
								onClick={() => deleteTask(t, index)}>
							</button></li>)
					}) : ''}
					<li className="d-flex justify-content-between"> {list.length} Tasks Left <button className="btn btn-danger p-0" onClick={() => deleteList()}>Delete all tasks</button></li>
				</ul>
			</div>
		</>
	);
};

export default Home;
