import TodoList from "./TodoList";
import{createContext,useState,useRef, useEffect, useLayoutEffect,View} from "react";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import axios from 'axios';
import './App.css';
import img from "./plus.jpg"
import Modal from './Modal';


export const DiaryContext = createContext()

function App() {
  
  // const [diarys, setDiarys] = useState([{id: uuidv4(),name: "Todo1", completed: false }]);
  const [diarys, setDiarys] = useState([]);
  const [modal, setModal] = useState(false);
  const Toggle = () => setModal(!modal);
  const refFirstRef = useRef(true);

  async function getDiary(){

    //2回表示を防いでいる。デプロイ時にエラー吐くかも～^^
    if (refFirstRef.current) {
      refFirstRef.current = false;
      return;
    }

    try {
      var response = await axios.get('https://azuretutorial20221105000814.azurewebsites.net/api/TableClientInput?code=mlstwRm607cu-B8qF7DrrEMBRmgs7oZ1zuItjISOoxfwAzFurTrkUQ==', {
        params: {
          // ここにクエリパラメータを指定する
          userId: "123456789"
        }
      });
      console.log(response.data);

      //取得したデータをオブジェクト毎に空配列にPush
      // for(var i = 0 ; i < response.data.length ; ++i){
      //   //本当はpushではなくsetDiarys()を使う必要がある。（データの反映が自動化されない）
      //   // diarys.push(response.data[i]);
      //   setDiarys(response.data[i]);
      // }
      setDiarys(()=>[...response.data])
      //console.log(diarys)

      // console.log(diarys[0]); 
      
      
    }catch{
      console.error("取れません～～＾＾")
    }
    // diarys.map((diary) => (
    //   // <diary content={diary.content} />
    //   console.log(diary)
    // ));
  }

  useLayoutEffect(() => {
    getDiary()
  },[])

  const toggleTodo = (id) => {

    const newTodos = [...diarys];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setDiarys(newTodos);
    //idでチェックボックスの管理
    console.log("べんりだよー")
    //コンソールはF12の画面でデバッグできるよー
  };
 
  const todoNameRef = useRef();
  const handleAddTodo = (e) =>{

     const name = todoNameRef.current.value;
     if(name === "")return;
     setDiarys((prevTodos) => {

      return [...prevTodos,{id: uuidv4(),name: name, completed:false }];
      //...は三要素のオブジェクトが入る
         });

     todoNameRef.current.value = null;
  };

  const handleClear = () => {
    // const newTodos = diarys.filter((todo) => !todo.completed);
    // //既存の配列からしていされた条件に該当する要素を持つ配列を作成
    // setDiarys(newTodos);
  };

  return (
  
    <div className="App"> 
   
      {/* <button className="plus"  onClick={() => Toggle()} style={{ backgroundImage: `url(${img})`}} >
      </button> */}


      {/* showが表示をつかさどる変数。コンポーネント内で書き換えを行っている。 */}
      <Modal show={modal} title="My Modal" close={Toggle} />

      <div className="boxDiv">
     
        <div className = "boxDate">

        </div>
        
        <ul className = "boxul">
          <li className ="boxli1"></li>
          <li className ="boxli2">
            <li className = "boxli3 bg-amber-500"></li>
            <li className = "boxli3 bg-green-500"></li>
            <li className = "boxli3 bg-green-500"></li>
          </li>
        </ul>
       
        {/* <ul className="todos">
          {diarys.map((item, index) => {
            return (
              <li key={index}>{item.content}</li>
            );
          })}
        </ul> */}

        {/* 前までの知識で書いた実装↓ */}
        {/* <div className="white">
           <li className="whi2">
          <TodoList diarys = {diarys} toggleTodo ={toggleTodo}/>
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
              残りのタスク:{diarys.filter((todo) => !todo.completed).length} 
            </li> 
        </div> */}
       
      </div>  
   </div>
   
    );  
}

export default App;
