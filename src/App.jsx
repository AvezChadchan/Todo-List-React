import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'
import { MdEdit, MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleCheck = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(
      item => {
        return item.id === id;
      });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  }

  const handleEdit = (e, id) => {
    let editTodo = todos.filter(
      item => item.id === id
    );
    setTodo(editTodo[0].todo)
    handleDelete(e, id)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newToods = todos.filter(
      item => {
        return item.id !== id
      });
    setTodos(newToods)
    saveToLS()
  }

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }
  return (
    <>
      <Navbar />
      <div className="container mx-3 md:mx-auto my-5 rounded-xl p-5 bg-blue-200 min-h-[80vh] shadow-2xl shadow-blue-950 md:w-[38%]">
        <h1 className='font-bold text-center text-2xl'>iTask - Manage Your todos at one place</h1>
        <div className="addTodo my-4 mx-2 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          {/* <div className="flex"> */}

          <input type="text" onChange={handleChange} value={todo} className='bg-blue-50 rounded-lg w-full px-3 py-1' />
          <button onClick={handleAdd} disabled={todo.length <= 2} className='bg-blue-900 hover:bg-blue-950 text-sm font-bold text-white p-3 py-1 rounded-lg disabled:bg-blue-500 cursor-pointer '>Add</button>
          {/* </div> */}
        </div>
        <input type="checkbox" onChange={toggleFinished} checked={showFinished} className='my-4 ' /> Show Finished
        <hr className='mx-auto w-[85%] my-1 opacity-30' />
        <h2 className='text-lg font-bold my-2'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todo's to Display</div>}
          {todos.map(
            (item) => {
              return (showFinished || !item.isCompleted) && <div className="todo flex justify-between my-3" key={item.id}>
                <div className='flex gap-5'>
                  <input type="checkbox" onChange={handleCheck} checked={item.isCompleted} name={item.id} />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-blue-900 hover:bg-blue-950 text-sm font-bold text-white p-3 py-1 rounded-md mx-1 cursor-pointer'><FaEdit /></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-blue-900 hover:bg-blue-950 text-sm font-bold text-white p-3 py-1 rounded-md mx-1 cursor-pointer'><MdDelete /></button>
                </div>
              </div>
            })}

        </div>
      </div>
    </>
  )
}

export default App
