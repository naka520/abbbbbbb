import TodoList from "./TodoList";
import{ useState,useRef, useEffect} from "react";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import axios from 'axios';
import './App.css';
import img from "./plus.jpg"
import Modal from './Modal';



function App() {

  const [todos, setTodos] = useState([{id: uuidv4(),name: "Todo1", completed: false }]);
  const [modal, setModal] = useState(false);
  const Toggle = () => setModal(!modal);
  
  

  useEffect(() => {
    async function getDiary(){
      try {
        var response = await axios.get('https://azuretutorial20221105000814.azurewebsites.net/api/TableClientInput?code=mlstwRm607cu-B8qF7DrrEMBRmgs7oZ1zuItjISOoxfwAzFurTrkUQ==', {
          params: {
            // ここにクエリパラメータを指定する
            userId: "123456789"
          }
        });
      }catch{
        console.error("取れません～～＾＾")
      }
      console.log(response);
    }
    getDiary()
  },[])


  const toggleTodo = (id) => {

    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
    //idでチェックボックスの管理
    console.log("べんりだよー")
    //コンソールはF12の画面でデバッグできるよー
  };

 
  const todoNameRef = useRef();
  const handleAddTodo = (e) =>{

     const name = todoNameRef.current.value;
     if(name === "")return;
     setTodos((prevTodos) => {

      return [...prevTodos,{id: uuidv4(),name: name, completed:false }];
      //...は三要素のオブジェクトが入る
         });

     todoNameRef.current.value = null;




  };

  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    //既存の配列からしていされた条件に該当する要素を持つ配列を作成
    setTodos(newTodos);
  };


  
    return (
   
    <div className="App"> 
    
      <button className="plus"  onClick={() => Toggle()} style={{ backgroundImage: `url(${img})`}} >
      </button>
      <Modal show={modal} title="My Modal" close={Toggle} />
      <div className="blue">
      <div className="white">
       {/* <li className="whi2">
       <TodoList todos = {todos} toggleTodo ={toggleTodo}/>
       </li>
       <li className="whi2">
       <input type="text" ref={todoNameRef}/>
       </li>
        <li className="whi2">
          <button onClick={handleAddTodo}>タスクを追加</button>
        </li>
        <li className="whi2">
        <button onClick={handleClear}>完了したタスクの削除</button>
        </li>
        <li className="whi2">
          残りのタスク:{todos.filter((todo) => !todo.completed).length} 
        </li> */}
      </div>
      </div>
   
    
     
    </div>

    
    );

    
    
    

    

  
}

export default App;
