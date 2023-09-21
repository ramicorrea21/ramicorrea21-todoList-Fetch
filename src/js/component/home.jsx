import { useState } from "react";
import React from "react";
import "../../styles/index.css"

const Home = () => {
	const [task, setTask] = useState({ title: "" })
	const [list, setList] = useState([])

	const addTask = (e) => {
		setTask({ title: e.target.value })
	}
	const addList = (e) => {
		if (task.title.trim() != "") {
			if (e.key === "Enter") {
				setList([...list, task])
				setTask({ title: "" })
			}
		}
	}

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
								value={task.title}
								onKeyDown={addList} />
						</form>
					</li>
					{list.map((t, index) => {
						return (<li className=" border rounded px-1 py-1" key={index}>{t.title}
							<button type="button" className="btn-close close" aria-label="Close"
								onClick={() => setList(list.filter(
									(t, i) => index != i
								))}>
							</button></li>)
					})}
					<li> {list.length} Tasks Left</li>
				</ul>
			</div>
		</>
	);
};

export default Home;
