import logo from './logo.svg';
import './App.css';
import { useRef, useState } from 'react';
// let todolist = [
//   { id: 0, name: "cho mèo ăn", status: false },
//   { id: 1, name: "cho vịt ăn", status: false },
//   { id: 2, name: "cho lợn ăn", status: false},
//   { id: 3, name: "cho bò ăn", status: true },
//   { id: 4, name: "cho chó ăn", status: false },
// ];

function App() {
  const todolist = useRef(JSON.parse(localStorage.getItem('todos') )|| [])
  const [select,setSelect] = useState(todolist.current)
  const [name,setName] = useState("")

  const handleAddItem = (e) => {
    e.preventDefault();
    const newTodo = {
      id: new Date().valueOf(),
      name: name,
      status: false
    }
    todolist.current.push(newTodo);
    localStorage.setItem('todos',JSON.stringify(todolist.current))
    setSelect(prev => [...todolist.current])
    setName('')

  }
  const handleSelect =(s)=>{
    if(s === 'all'){
      setSelect(todolist.current)
    }else if( s === 'active'){
      setSelect(prev => todolist.current.filter(e => e.status === false))
    }else setSelect(prev => todolist.current.filter(e => e.status === true))
  }
  const handleChecked = (id) => {
      const newTodol = [...todolist.current]
      setSelect(newTodol.map(t => {
        if(t.id === id){
          t.status = !t.status
        }
        return t
      }))
  }
  return (
    <div className='panel'>
    <h1>#todolist</h1>
    <div className='menu'>
      <span><button onClick={()=>handleSelect('all')}>ALL</button></span>
      <span><button onClick={()=>handleSelect('active')}>ACTIVE</button></span>
      <span><button onClick={()=>handleSelect('done')}>DONE</button></span>
    </div>
    <div className='list-items'>
      <ul className='list'>
        <hr/>
        <form className='form' onSubmit={handleAddItem}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <button type="submit">Add Todo</button>
      </form>
      <hr></hr>
        {select.map(il =>{
          return(
            <li className='item' key={il.id}><input type='checkbox' checked={il.status} onChange={()=>handleChecked(il.id)} /> {il.name}</li>
          )
        })}
      </ul>
    </div>
    </div>
  );
}

export default App;
