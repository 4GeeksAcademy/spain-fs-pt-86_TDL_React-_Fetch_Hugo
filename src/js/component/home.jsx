import React, {useState, useEffect} from "react";


const Home = () => {
	
	const [inputValue,setInputValue] = useState("");
	const [todos, setTodos] = useState([]);
	const apiUrl = 'https://playground.4geeks.com/todo/users/hugo'
    
	 useEffect(() => {
       getData()
	 }, []);

	const getData = () => {
		fetch(apiUrl,{
			headers: {
				"accept": "application/json",
			},
		})
		.then((response) => response.json())
		.then((data) => setTodos(data.todos))
		.catch((error) => console.error("Error fetching tasks:", error)); 

	}
		
		
		/* const updateTasksOnServer = (newTasks) => {
			fetch(apiUrl, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newTasks),
			})	
			.then((response) => response.json()) 
			.then((data) => console.log("Tasks updated:", data)) 
			.catch((error) => console.error("Error updating tasks:", error));
		 }; */
		 const agregartarea = () => {
			fetch('https://playground.4geeks.com/todo/todos/hugo', {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
				 label:inputValue,
				 is_done:false,
				}),
			})	
			.then((response) => response.json()) 
			.then((data) => {
				console.log(data)
				getData()
				setInputValue("")
			    
			}) 
			.catch((error) => console.error("Error updating tasks:", error));
		 }
		  const borrartarea = (id) => {
			fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				
			})	
			 
			.then(response => {
				//return response.json()
				getData()
		  })
			 
			.catch((error) => console.error("Error updating tasks:", error));
		 }
		 
	 
		return (
		<div className="container">
			<h1>Todos:_{inputValue}</h1>
			<ul>
				<li>
					<input
					    type="text"
						onChange={(e)=> setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown= {(e) => {
							if (e.key === "Enter") {
								agregartarea()
								
								

							}
						}}
						placeholder="what do you neet to do?"></input>
				</li>
				{todos.map((item) => (
					<li key={item.id}>
					   {item.label} <button className="btn btn-danger" onClick={()=> borrartarea(item.id)}>Eliminar</button>
					</li>))}
			</ul>
			<div>{todos.length}item{todos.length !== 1 ? 's' : ''} left</div>
			
		</div>
	);
};

export default Home;
