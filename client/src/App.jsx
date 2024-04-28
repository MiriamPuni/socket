
// import React, { useState } from 'react'
// import Popup from './Popup'
// export default function App() {
//   const [popup, setPopup] = useState(false)
//   return (
//     <div>
//       <button onClick={()=>{setPopup(true)}}>open</button>
//       {popup? <Popup/> : null}
//     </div>
//   )
// }




import  './App.css'
import { useEffect, useState } from "react"
import { socket } from "./socket"

export default function App() {
  const [msgs, setMsgs] = useState([])
  const [namei, setNamei] = useState('misheu')
  useEffect(()=>{socket.emit('name', namei)}, [namei])
  useEffect(()=>{
    socket.on('msg', (data)=> setMsgs(old=>[...old, data]))
    return ()=>socket.off('msg')
  }, [])
  
  function handleSubmit(e){
    e.preventDefault()
    let msg = e.target[0].value
    if (msg){
      socket.emit('msg', msg)
      setMsgs(old=>[...old, {me: msg}])
    }
    e.target[0].value = ''
  }
  function createName(e){
    e.preventDefault()
    let namei = e.target[0].value
    if (namei){
      socket.emit('name', namei)
      setNamei(namei)
    }
    e.target[0].value = ''
  }
  function disconnect(){
    socket.on("disconnect", () => {
      console.log(socket.id); 
    });
  }
  
  return <div>
    <form onSubmit={(e)=> createName(e)}>
      <input type="text" name="msg" placeholder='name'/>
      <button type="submit">send</button>
    </form>
    <form onSubmit={(e)=>handleSubmit(e)}>
      <input type="text" name="msg" placeholder='msg'/>
      <button type="submit">send</button>
    </form>
    {/* <button onClick={disconnect}>finish chet</button> */}
    {console.log(msgs)}
    <div className='listMsg'>
    {msgs.map((m, i)=> 
    <div className={m.me? 'MyMsg': 'misheuMsg'} key={i}>
      {m.me? 'me':Object.keys(m)} : {m.me? m.me:Object.values(m)} 
      </div>)}
      </div>
      {console.log(msgs)}
  </div>
}
