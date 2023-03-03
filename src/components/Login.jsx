import React, { useState } from "react"
import { isValidEmail } from "../validations/validation"
import '../componentcss/Login.css'
import { userId } from "../recoil/atom"
import { useRecoilState } from "recoil"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
export default function Login() {
    const [email,SetEmail]=useState()
    const [password,SetPassword]=useState()
    const[error,SetError]=useState("")
    const[item,setItem]=useState()
    const[id,setId]=useRecoilState(userId)
    const navigate=useNavigate()

async function HandleSubmit(e)
{
e.preventDefault()
 if(!isValidEmail(email))  SetError("enter a valid email")
 else{
  let obj={email,password}
  console.log(obj)
  // // await setItem({email:email,password:password})
  // console.log(item,"here")//--------------
  let result=await fetch('http://localhost:3000/login' 
  ,{

    method:'POST',
    headers:{'Content-Type':"application/json",
    "Accept":'application/json'
  },
  body:JSON.stringify(obj)

  }
  );
    result=await result.json();
    if(!result.status) SetError(result.message)
    else localStorage.setItem("token",JSON.stringify(result.data))
    if(result.status) { SetError("login successfull")

    setId(result.data.userId)
    Swal.fire("login successfully")
    navigate("/main")


  }

    
    console.log(result)
    
    

 }
    
}


  return (
    
    <div className="Container">
      <form className="Form">
        <section>
          <h1>login</h1>
        </section>
        <section>
         
          <input type={'email'} value={email} placeholder="email" onChange={(e)=>{SetEmail(e.target.value.trim())}} ></input>
        </section>
        <section>
          
          <input type={'password'} value={password} placeholder="password" onChange={(e)=>{SetPassword(e.target.value.trim())}}></input>
        </section>
        <section>
        <button onClick={HandleSubmit}>SignIn</button>
        </section>
        <section>
            <div className="error" style={{color:"red"}}>{error} </div>
        </section>
      </form>
    </div>
  );
  
}
