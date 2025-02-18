import { useState , useEffect } from 'react'
import './App.css'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {

  const [todo,settodo] = useState("");

  const [todos, settodos] = useState([]);

  const [showfinished, setshowfinished] = useState(false);

  useEffect(() => {
    async function fetchdata (){
    let todostring=localStorage.getItem("todos")
    if(todostring){
      let todos = await JSON.parse(localStorage.getItem("todos"))
       settodos(todos)
    }
  }
    fetchdata();
  }, []);

  const savetolocal=(params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  
  const toggle=(params) => {
    setshowfinished(!showfinished);
  }
    

  const handleedit = (e,id)=>{
    let t=todos.filter(i=>{return i.id==id});
    settodo(t[0].todo)
    let newtodos=todos.filter(item=>{
      return item.id!=id;
    })
    settodos(newtodos)
    savetolocal()
    
  }
  const handledelete = (e,id)=>{
     let index=todos.findIndex(item=>{
      return item.id ===id;
    })
    let newtodos=todos.filter(item=>{
      return item.id!=id;
    })
    settodos(newtodos)
    savetolocal()
  }
  const handleadd = ()=>{
     
    settodos([...todos,{id:uuidv4(),todo, iscompleted:false}]) 
    settodo("")
    savetolocal()
  }

  const handlechange = (e)=>{
    settodo(e.target.value);
  }

  const handlecheckbox = (e)=>{
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id ===id;
    })
    let newtodos=[...todos];
    newtodos[index].iscompleted= !newtodos[index].iscompleted;
    settodos(newtodos)
    savetolocal();
  }

  return (
    <>
      <Navbar/>
      <div className="md:container mx-3 my-5 md:mx-auto md:w-[35%] rounded-xl bg-violet-100 p-5 min-h-[80vh]">
              <h1 className='font-bold text-center text-2xl'>iTask - Manage your todos at one place</h1>
               <div className="addtodo my-5 flex flex-col gap-3">
                <h2 className="text-lg font-bold ">Add A Todo</h2>

                <div className="flex">
                <input onChange={handlechange} value={todo} className='bg-white w-full rounded-full px-3' type="text" />
                <button onClick={handleadd}  disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 px-4 py-1 text-sm font-bold text-white rounded-full mx-2 '>Save</button>
                </div>

               </div>
                <input className='my-4' id="show" type="checkbox"  onChange={toggle} checked={showfinished} />
                <label className=" mx-2" for="show">
                     Show finished
                </label>
                <div className="h-[1px] opacity-20 w-[90%] mx-auto my-2 bg-black"></div>
                <h1 className="font-bold text-xl">
                   Your Todos
                </h1>

                <div className="todos">
                  {todos.length === 0 && <div className='m-5'>No Todos to Display</div>}
                  {todos.map(item=>{

                  return (showfinished || !item.iscompleted) && <div key={item.id}  className="todo flex w-full justify-between my-2">
                    <div className="flex gap-5">
                    <input name={item.id} type="checkbox" onChange={handlecheckbox} checked={item.iscompleted} id="" />
                  <div className={item.iscompleted?"line-through":""}>{item.todo}</div>
                  </div>

                      <div className="buttons flex h-full">
                    <button onClick={(e)=>{handleedit(e,item.id)}}  className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1 '><FaEdit/></button>
                    <button onClick={(e)=>{handledelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'><AiFillDelete/></button>
                      </div>

                  </div>
                   })}

                </div>
             
      </div>
    </>
  )
}

export default App
