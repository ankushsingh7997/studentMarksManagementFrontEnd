import React, { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { userId } from "../recoil/atom"

export default  function Mainpage()
{
    const id=useRecoilValue(userId)
    
    const[studentdata,setStudentData]=useState()

useEffect(() => {
    (async () => {
     await fetch(`http://localhost:3000/getdata/${id}`).then((res) => res.json())
     .then((data) => setStudentData(data.data)).catch((err)=>err.message)  
    })();
},[])

 
  async function handleDelete(roll)
  {



    let result = await fetch(`http://localhost:3000/delete/${id}/${roll}`, {
        method: 'DELETE'
      });
      console.log(await result.json());

      const filteredItem = studentdata.filter((ele) => ele.roll !== roll);
      setStudentData(filteredItem);
    

  }

    
    

    return <div>
        
{
    studentdata &&studentdata.map((item)=>(<div key={item._id}>
       <h1> {item.studentName}</h1>
        <button>edit</button>
        <button>view</button>
        <button onClick={()=>handleDelete(item.roll)}>delete</button>
    </div>))
}
    </div>
}