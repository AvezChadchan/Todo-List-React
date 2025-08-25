import { useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    console.log(todos);
    setTodo("");
  };
  const handleChange = (e) => {
    setTodo(e.target.value)
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
  }
  const handleEdit = (e, id) => {
    let editTodo = todos.filter(
      item => {
        return item.id === id;
      });
      // console.log(editTodo);
      
    setTodo(editTodo[0].todo)
    handleDelete(id);
  };
  const handleDelete = (id) => {
    // console.log(id);
    let newToods = todos.filter(
      item => {
        return item.id !== id;
      });
    setTodos(newToods)
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-blue-200 min-h-[80vh] shadow-2xl shadow-blue-950">
        <div className="addTodo my-4 mx-2">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input type="text" onChange={handleChange} value={todo} className='bg-white rounded-md w-1/2' />
          <button onClick={handleAdd} className='bg-blue-900 hover:bg-blue-950 text-sm font-bold text-white p-3 py-1 rounded-md mx-6'>Add</button>
        </div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todo's to Display</div>}
          {todos.map(
            (item) => (
              <div className="todo flex w-1/4 justify-between my-3" key={item.id}>

                <div className='flex gap-5'>
                  <input type="checkbox" onChange={handleCheck} value={item.isCompleted} name={item.id} />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>

                </div>
                <div className="buttons">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-blue-900 hover:bg-blue-950 text-sm font-bold text-white p-3 py-1 rounded-md mx-1'>Edit</button>
                  <button onClick={() => { handleDelete(item.id) }} className='bg-blue-900 hover:bg-blue-950 text-sm font-bold text-white p-3 py-1 rounded-md mx-1'>Delete</button>
                </div>
              </div>
            ))}

        </div>
      </div>
    </>
  )
}

export default App
