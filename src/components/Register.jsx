import '../componentcss/Register.css'
import React, {useState} from 'react'
import { isValidEmail, isValidNo, passwordVal } from "../validations/validation"
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export default function Register()
{
    
    const[name,SetName]=useState()
    
    const[email,SetEmail]=useState()
    const [password,SetPassword]=useState()
    const[error,SetError]=useState("")
    const navigate=useNavigate()
    

    async function handleSubmit(e)
    {
      e.preventDefault()
        
       if(name&&email&&password)  {

      if(!isValidEmail(email)) SetError("enter a valid email")
      else if(!passwordVal(password)) SetError("enter a valid password")
      
      else {

        try{
        
        let item={name,email,password}
        let dataa=JSON.stringify(item)
        console.log(JSON.stringify(item))//--------------
        let result=await fetch("http://localhost:3000/register"      
        ,{
          method:'POST',
          
          headers:{'Content-Type':"application/json",
          "Accept":'application/json'
          
        },
        body:dataa
        }
        )
          result=await result.json();
          if(!result.status) SetError(result.message)
          console.log(result)
          if(result.status) {Swal.fire("Registered successfully")   
           navigate("/Login")    
        }            //  SetError("registered successfully") 
          

      }
      catch(error) {console.log(error)}
      
       }
       

       }
       else {
        SetError("please enter all the fields")
       }


    }

    

    return <div>
      
       <div className="MinContainer">
       <form className="Formm">
        <section><h1>register</h1></section>
       
       <section>
       
        <input type={'text'}  value={name} placeholder="name" onChange={(e)=>{SetName(e.target.value)}}></input>
       </section>
      
       <section>
         
          <input type="email" value={email} placeholder="email" onChange={(e)=>{SetEmail(e.target.value.trim())}} ></input>
        </section>
        <section>
         
          <input type={'password'} value={password} placeholder="password" onChange={(e)=>{SetPassword(e.target.value.trim())}}></input>
        </section>
          

        <section>
            <button className='loginButton' onClick={handleSubmit}>submit</button>
        </section>

        <section>
            <div className="error" style={{color:"red"}}>{error} </div>
        </section>


        </form>
       </div>
       


      </div>


    
}