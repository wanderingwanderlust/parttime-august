import { useState } from "react";

function ToDo() {
    const [toDoInput, setToDoInput] = useState('');
    const [toDoList, setToDoList] = useState([
        {text: 'Read a book', completed: false},
        {text: 'Play Apex Legends', completed: false},
        {text: 'Bake a cake', completed: false},
    ])

    // Add a todo
    const addToDo = () => {
        if(!toDoInput) return;
        const newList = [...toDoList]
        newList.push({text: toDoInput, completed: false});
        setToDoList(newList);
        setToDoInput('');

    }
    // delete a todo
    const deleteToDo = (index) => {
        const newArray = [...toDoList]
        newArray.splice(index,1)
        setToDoList(newArray)
    }
    // toggle if a todo has been completed or not
    const toggleToDo = (index) => {
        const newArray = [...toDoList]
        newArray[index].completed = !newArray[index.completed];
        setToDoList(newArray)
    }

    return (
        <div>
            <h2>To Do App</h2>
            <input value={toDoInput} onChange={(event) => setToDoInput(event.target.value)} ></input>
            <button onClick={addToDo}>Add To Do</button>
            <ul>
                {toDoList.map((toDo, key) => {
                    return(
                        <li key={key} style={{textDecoration: toDo.completed && 'line-through'}}>
                            <span onClick={() => toggleToDo(key)}>{toDo.text}</span>
                            <button onClick={() => deleteToDo(key)}>x</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )




}

export default ToDo;