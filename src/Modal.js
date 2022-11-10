import './Modal.css';
import{ useState,useRef, useEffect} from "react";
import axios from 'axios';

const Modal = ({ show, close }) => {


//   const [text, setText] = useState({
//     whether: '',
//     date: '',
//     diary: '',
//     userId: "123456789",
// });

var date = new Date("yyyy-mm-dd");
const [diaryDate, setdiaryDate] = useState('20221109');
const [content, setcontent] = useState('dddd');
const [Name, setname] = useState('hoge');
const [userId, setuserId] = useState('123456789');

// whether: '',
// content: 'dddd',
// name: "hoge",
// userId: "123456789",
// diaryDate: '2022-11-09',

async function getDiary(){
  
  try {
    var response = 
    await axios.post('https://azuretutorial20221105000814.azurewebsites.net/api/TableClientOutput?code=N-gYWDvlotZGt_TfbnxhQ3nol0tEpW5efGWCn_7aGYCEAzFuG-Uxuw==', {
      "content": content,
      "name": Name,
      "userId": userId,
      "diaryDate": diaryDate
   });
  }catch{
    console.error(response)
  }
  console.log(response);
}

const handleSubmit = () => {
  console.log(diaryDate);
  console.log(content);

  getDiary();
}

    return (
      <div>
       {
       show ?
       
       <>
          <div className="modal">
         
              {/* <h1> Modal </h1>
              <button className="close" onClick={() => close()}>
               x close
              </button> */}
            <div onClick={(e) => e.stopPropagation()}>
            {/* <div className ="list">
              <p>天気</p>
              <input className ="listmini" value={text.whether} 
              onChange={(event) => setText(event.target.value)} />
              <p>{text.whether}</p>
            </div> */}
            <div className ="list">
              <p>日付</p>
              <input className ="listmini" type="date" value={diaryDate}
              onChange={(event) => setdiaryDate(event.target.value)} />
              <p>{diaryDate}</p>
            </div>
            <div className ="list">
              <p>日記</p>
              <input className ="listmini"  value={content} 
              onChange={(event) => setcontent(event.target.value)} />
              <p>{content}</p>
              {/* <input type="text" ref={todoNameRef}/> */}
              
            </div>

            <footer>
              <button className="submit"  onClick={() => {
                close();
                handleSubmit()
                }}>追加</button>
            </footer>
          </div>
        </div>
      </>
      : null
      }
      </div>
    );
  };
  
  export default Modal;