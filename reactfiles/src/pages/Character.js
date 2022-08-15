import React, {useState, useEffect} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import '../App.css';

function Character() {
  const [students, setStudents]=useState(null);
  const [loading, setLoading]=useState(false);
  const [error, setError]=useState(null);

  const [values, setValues]=useState({
    name:"",
    class:""
  })

  const {id}=useParams();
  const navigate=useNavigate();

  const API_BASE=process.env.NODE_ENV==="development"
  ? "http://localhost:9000/api/v1" : process.env.REACT_APP_BASE_URL

  let ignore=false;
  useEffect(()=>{
    if (!ignore) {
      getStudent();
    }

    return ()=>{
      ignore = true
    }
  }, [])

  const getStudent = async ()=>{
    setLoading(true)
    try {
      await fetch(`${API_BASE}/characters/${id}`)
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
        setValues({name:data.name, race:data.race})
      })
    } catch (error) {
      setError(error.message||"Unexpected Error")
    } finally{
      setLoading(false)
    }
  }

  const deleteStudent=async()=>{
    try {
      await fetch(`${API_BASE}/characters/${id}`,{
        method:"DELETE"
      })
      .then(res=>res.json())
      .then(data=>{
        setStudents(data)
        navigate("/dashboard", {replace:true})
      })
    } catch (error) {
      setError(error.message||"Unexpected Error")
    } finally{
      setLoading(false)
    }
  }

  const updateStudent=async()=>{
    try {
      await fetch(`${API_BASE}/characters/${id}`,{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(values)
      })
      .then(res=>res.json())
      .then(data=>{
        setStudents(data)
        navigate("/dashboard", {replace:true})
      })
    } catch (error) {
      setError(error.message||"Unexpected Error")
    } finally{
      setLoading(false)
    }
  }

  const handleSubmit=(event)=>{
    event.preventDefault();
    updateStudent();
  }

  const handleInputChanges=(event)=>{
    event.persist();
    setValues((values)=>({
      ...values,
      [event.target.name]:event.target.value
    }))
  }
  return (
    <div className="App">
      <header className="App-header">
       <h1>Student Profile:</h1>
       <h5>{values && values.name}</h5>
       <button onClick={()=>deleteStudent()}>Delete Student</button>
       <Link to="/">Home</Link>
       <Link to="/dashboard">Dashboard</Link>
       <form onSubmit={(event)=>handleSubmit(event)}>
        <label>Name: <input type="text" name="name" value={values.name} onChange={handleInputChanges} /></label>
        <label>Race: <input type="text" name="race" value={values.race} onChange={handleInputChanges} /></label>
        <input type="submit" value="Submit" />
       </form>
      </header>
    </div>
  );
}

export default Character;
