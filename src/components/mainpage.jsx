import React, { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { userId } from "../recoil/atom"
import { Dialog } from "@mui/material"
import '../componentcss/mainpage.css'
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

export default  function Mainpage()
{
    const[isopen,setIsopen]=useState(false)
    const[viewdata,setViewdata]=useState()
    const[isopenview,setIsopenview]=useState(false)
    const[isopenedit,setIsopenedit]=useState(false)
    const id=useRecoilValue(userId)
    const[studentdata,setStudentData]=useState()
    const[tempstudentdata,settempStudentData]=useState()
    const[studentName,setStudentname]=useState()
    const[roll,setRoll]=useState()
    const[java,setJava]=useState()
    const[javaScript,setJavaScript]=useState()
    const[mongodb,setMongodb]=useState()
    const[python,setPython]=useState()
    const[sql,setSql]=useState()
    const[error,setError]=useState("")
    const[message,setMessage]=useState("")
    const navigate=useNavigate()
    const[searchStudent,setSearchStudent]=useState('')
    const[searchSubject,setSearchSubject]=useState('')
    const[mainIsopen,setmainIsopen]=useState(true)
    const[searchIsopenByname,setsearchIsopen]=useState(false)
    const[searchIsopenBysubject,setsearchIsopenBysubject]=useState(false)
    const[subjectData,setsubjectData]=useState(false)

    

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
      // console.log(await result.json());

      const filteredItem = studentdata.filter((ele) => ele.roll !== roll);
      setStudentData(filteredItem);
    

  }
  function handleAdd()
  {
    setError('')
    setIsopen(true)
  }
  
  async function handleDetails()
  {
    
    
    let obj={userId:id,roll:roll,studentName:studentName,java:java,javaScript:javaScript,mongoDb:mongodb,python:python,sql:sql}
    
        let dataa=JSON.stringify(obj)
        //--------------
        let result=await fetch("http://localhost:3000/create"      
        ,{
          method:'POST',
          
          headers:{'Content-Type':"application/json",
          "Accept":'application/json'
          
        },
        body:dataa
        }
        ).then((res) => res.json())
        .then((data) => data).catch((err)=>err.message)
        
         if(!result.status){ 
            setMessage("")
            if(result.message=="please provide userId") {
               
                setError("you need to login first")
                navigate('/Login')
                }
           else setError(result.message)}
        if(result.status) { 
            setError("")
        setMessage("data uploaded successfully")
        setStudentname("")
        setRoll('')
        setJava('')
        setJavaScript('')
        setPython('')
        setMongodb('')
        setSql('')
        let flag=false
        let data= studentdata.map((item)=>{
               if(item.roll==result.data.roll)
               {
                flag=true
                  item.subjects.java=result.data.subjects.java?result.data.subjects.java:''
                  item.subjects.javaScript=result.data.subjects.javaScript?result.data.subjects.javaScript:''
                  item.subjects.python=result.data.subjects.python?result.data.subjects.python:''
                  item.subjects.mongoDb=result.data.subjects.mongoDb?result.data.subjects.mongoDb:''
                  item.subjects.sql=result.data.subjects.sql?result.data.subjects.sql:''
               }
               return item
        })
        if(!flag)
        {
           setStudentData([...studentdata,result.data])
        }
        else{
          setStudentData([...data])
        }     
      }
         }
         
         function handleView(data,index)
         {
             setIsopenview(true)
             setViewdata("")
             setViewdata(data)

         }

    

         function handleBack()
  {
    setError('')
    setMessage('')
    setIsopenview(false)
    setIsopen(false)
    setIsopenedit(false)
    setStudentname("")
      setRoll('')
  }
 



 function handleEdit(data)
  {
    setIsopenedit(true)
    setStudentname(data.studentName)
    setRoll(data.roll)
  
  }

  async function handleUpdate() {
    let obj = {
      studentName: studentName,
      roll: roll,
      subjects: {
        java: java,
        javaScript: javaScript,
        mongoDb: mongodb,
        python: python,
        sql: sql,
      },
    };
    let dataa = JSON.stringify(obj);
    
    let result = await fetch(`http://localhost:3000/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: dataa,
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => Swal.fire(err.message));
    if(result.status) {setIsopenedit(false)
      setError("")
      
      setStudentname("")
      setRoll('')
      setJava('')
      setJavaScript('')
      setPython('')
      setMongodb('')
      setSql('')
     Swal.fire("data edit successfully")
     



     let data= studentdata.map((item)=>{
      if(item.roll==result.data.roll)
      {
       
         item.subjects.java=result.data.subjects.java?result.data.subjects.java:''
         item.subjects.javaScript=result.data.subjects.javaScript?result.data.subjects.javaScript:''
         item.subjects.python=result.data.subjects.python?result.data.subjects.python:''
         item.subjects.mongoDb=result.data.subjects.mongoDb?result.data.subjects.mongoDb:''
         item.subjects.sql=result.data.subjects.sql?result.data.subjects.sql:''
      }
      return item
})

setStudentData([...data])

 
    }
    if(!result.status){setError(result.message)}
  }
  

  async function handleSearch()
  {
    console.log(searchStudent)
  console.log(searchSubject)
    
    // setStudentData(tempstudentdata)


     // to make search data visible

    // api call
    

    if(!searchStudent&&!searchSubject) Swal.fire('please pass some data to search')

    else{
      setmainIsopen(false) // to make main invisible 

      let name;
    let subject;
    if(searchStudent) name=searchStudent.trim()
    if(searchSubject) subject=searchSubject.trim()

      if(searchStudent &&searchSubject||searchSubject &&!searchStudent)
      {
        console.log('here')
        
        setsearchIsopenBysubject(true)
      }
      else {
        console.log('not here')
    setsearchIsopen(true)
      }

    
      let obj={}
     if(name) obj.name=name
     if(subject)obj.subject=subject
    
    console.log(obj)
    let queryParams = new URLSearchParams(obj).toString();

    let result = await  fetch(`http://localhost:3000/view?${queryParams}`, {
      method: "GET",
     
      
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => Swal.fire(err.message));

      if(!result.status){Swal.fire(result.message)}
      if(result){ 
        if(searchSubject&&searchStudent||searchSubject&&!searchStudent)
        {
          setsubjectData(result.data)
          console.log(subjectData)
         
        }
        else{
          settempStudentData(studentdata)
        setStudentData(result.data)
        
        }


        // settempStudentData(studentdata)
        // setStudentData(result.data)
        
        
        

      
      
      }
      

    //

    }

     


  }
  function handleSearchBack()
      {
         setsearchIsopen(false)
         setStudentData(tempstudentdata)
         
         setSearchStudent('')
        setSearchSubject('')
         
         setmainIsopen(true)
      }

        
// user MUI for dialog box  this dialogue box is for add new student
    return (
    <div className="master-container">
    {isopen?(<Dialog open={isopen} PaperProps={{
            style: {
              borderRadius: "20px",
              background:'#8e0000',
              padding:'0.5rem'
            },
          }}> 
    <div className="addDialog">
       <span style={{color:"red"}}><h4>{error}</h4></span>
       <span style={{color:"green"}}><h4>{message}</h4></span>
        <section>
       
       <input type={'text'}  value={studentName} placeholder="name" onChange={(e)=>{setStudentname(e.target.value)}}></input>
      </section>
      
      <section>
       
       <input type={'number'}  value={roll} placeholder="roll" onChange={(e)=>{setRoll(e.target.value)}}></input>
      </section>
      <section>
       
       <label className="label">student marks</label>
      </section>
      <section>
       
       <input type={'number'}  value={java} placeholder="java" onChange={(e)=>{setJava(e.target.value)}}></input>
      </section>
      <section>
      
       
       <input type={'number'}  value={javaScript} placeholder="javascript" onChange={(e)=>{setJavaScript(e.target.value)}}></input>
      </section>
      <section>
       
       <input type={'number'}  value={python} placeholder="python" onChange={(e)=>{setPython(e.target.value)}}></input>
      </section>
      <section>
       
       <input type={'number'}  value={mongodb} placeholder="mongodb" onChange={(e)=>{setMongodb(e.target.value)}}></input>
      </section>
      <section>
       
       <input type={'number'}  value={sql} placeholder="sql" onChange={(e)=>{setSql(e.target.value)}}></input>
      </section>
  <div>
      <button className="edit-btnn" onClick={handleDetails}>add</button>
      <button className="edit-btnn" onClick={handleBack}>back</button>
      </div>
      </div>
    </Dialog>):""}




    {
      // Dialog to view student data
    isopenview?(<Dialog open={isopenview} PaperProps={{
            style: {
              borderRadius: "20px",
              background:'#8e0000',
              padding:'0.5rem'
            },
          }}> 
    <div className="addDialog">
    
        <section className="section">
            <label className="label">name</label>
       
       <label className="label">{`${viewdata.studentName}`}</label>
      </section>
      
      <section className="section">
      <label className="label">roll</label>
       
      <label className="label">{`${viewdata.roll}`}</label>
      </section>
      <section className="section">
       
       <label className="marks">student marks</label>
      </section>
      <section className="section">
      <label className="label">java</label>
      
      <label className="label">{viewdata.subjects.java?`${viewdata.subjects.java}`:''}</label>
      </section>
      <section className="section">
      <label className="label">javaScript</label>
       
      <label className="label">{viewdata.subjects.javaScript?`${viewdata.subjects.javaScript}`:''}</label>
      </section>
      <section className="section">
      <label className="label">python</label>
      <label className="label">{viewdata.subjects.python?`${viewdata.subjects.python}`:''}</label>
      </section>
      <section className="section">
      <label className="label">mongodb</label>
      <label className="label">{viewdata.subjects.mongoDb?`${viewdata.subjects.mongoDb}`:''}</label>
      </section>
      <section className="section">
      <label className="label">sql</label>
      <label className="label">{viewdata.subjects.sql?`${viewdata.subjects.sql}`:''}</label>
      </section>
  <div>
      
      <button onClick={handleBack}>back</button>
      </div>
      </div>
    </Dialog>):""}

   

    {
      // Dailog for edit data
    isopenedit?(<Dialog open={isopenedit} PaperProps={{
            style: {
              borderRadius: "20px",
              background:'#8e0000',
              padding:'0.5rem'
            },
          }}> 
    <div className="addDialog">
       <span style={{color:"red"}}><h4>{error}</h4></span>
       
        <section>
       
       <label type={'text'} >{studentName}</label>
      </section>
      
      <section>
       
       <label type={'number'}>{roll}</label>
      </section>
      <section>
       
       <label className="label">student marks</label>
      </section>
      <section>
       
       <input type={'number'}  value={java} placeholder="java" onChange={(e)=>{setJava(e.target.value)}}></input>
      </section>
      <section>
      
       
       <input type={'number'}  value={javaScript} placeholder="javascript" onChange={(e)=>{setJavaScript(e.target.value)}}></input>
      </section>
      <section>
       
       <input type={'number'}  value={python} placeholder="python" onChange={(e)=>{setPython(e.target.value)}}></input>
      </section>
      <section>
       
       <input type={'number'}  value={mongodb} placeholder="mongodb" onChange={(e)=>{setMongodb(e.target.value)}}></input>
      </section>
      <section>
       
       <input type={'number'}  value={sql} placeholder="sql" onChange={(e)=>{setSql(e.target.value)}}></input>
      </section>
  <div>
      <button className="edit-btnn" onClick={handleUpdate}>add</button>
      <button className="edit-btnn" onClick={handleBack}>back</button>
      </div>
      </div>
    </Dialog>):""}








    {searchIsopenByname?(<div className="container">
  
  {/* <div className="search-bar">
  <input  type='text' placeholder="search by name" onChange={(e)=>setSearchStudent(e.target.value)}></input>
  <input  type='text' placeholder="search by subject" onChange={(e)=>setSearchSubject(e.target.value)}></input>
  </div> */}
  {/* <div><button className="add-student-btn" onClick={handleSearch}>
    Search
  </button></div> */}
  <button className="add-student-btn" onClick={handleSearchBack}>
    back
  </button>
  <div className="student-list">
    {studentdata &&
      studentdata.map((item, index) => (
        <div className="student-card" key={item._id}>
          <div className="student-image">
            
          </div>
          <div className="student-details">
            <h3 className="student-name">{item.studentName}</h3>
            <div className="student-buttons">
              <button className="edit-btn" onClick={() => handleEdit(item)}>
                Edit
              </button>
              <button className="view-btn" onClick={() => handleView(item, index)}>
                View
              </button>
              <button className="delete-btn" onClick={() => handleDelete(item.roll)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
  </div>
</div>):''}






{searchIsopenBysubject?(<div className="container">
  
  <div className="search-bar">
  <input  type='text' placeholder="search by name" onChange={(e)=>setSearchStudent(e.target.value)}></input>
  <input  type='text' placeholder="search by subject" onChange={(e)=>setSearchSubject(e.target.value)}></input>
  </div>
  {/* <div><button className="add-student-btn" onClick={handleSearch}>
    Search
  </button></div> */}
  <button className="add-student-btn" onClick={handleSearchBack}>
    back
  </button>
  <div className="student-list">
    {studentdata &&
      studentdata.map((item, index) => (
        <div className="student-card" key={item._id}>
          <div className="student-image">
            
          </div>
          <div className="student-details">
            <h3 className="student-name">{item.studentName}</h3>
            <div className="student-buttons">
              <button className="edit-btn" onClick={() => handleEdit(item)}>
                Edit
              </button>
              <button className="view-btn" onClick={() => handleView(item, index)}>
                View
              </button>
              <button className="delete-btn" onClick={() => handleDelete(item.roll)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
  </div>
</div>):''}


































    {mainIsopen?(<div className="container">
  <button className="add-student-btn" onClick={handleAdd}>
    Add Student
  </button>
  <div className="search-bar">
  <input  type='text' placeholder="search by name" onChange={(e)=>setSearchStudent(e.target.value)}></input>
  <input  type='text' placeholder="search by subject" onChange={(e)=>setSearchSubject(e.target.value)}></input>
  </div>
  <div><button className="add-student-btn" onClick={handleSearch}>
    Search
  </button></div>
  <div className="student-list">
    {studentdata &&
      studentdata.map((item, index) => (
        <div className="student-card" key={item._id}>
          <div className="student-image">
            
          </div>
          <div className="student-details">
            <h3 className="student-name">{item.studentName}</h3>
            <div className="student-buttons">
              <button className="edit-btn" onClick={() => handleEdit(item)}>
                Edit
              </button>
              <button className="view-btn" onClick={() => handleView(item, index)}>
                View
              </button>
              <button className="delete-btn" onClick={() => handleDelete(item.roll)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
  </div>
</div>):''}

    </div>)
    
}