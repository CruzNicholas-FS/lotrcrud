import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import '../App.css';

function Dashboard() {
  const [students, setStudents]=useState(null);
  const [loading, setLoading]=useState(false);
  const [error, setError]=useState(null);

  const [values, setValues]=useState({
    name:"",
    race:""
  })

  const API_BASE=process.env.NODE_ENV==="development"
  ? "http://localhost:9000/api/v1" : process.env.REACT_APP_BASE_URL

  let ignore=false;
  useEffect(()=>{
    if (!ignore) {
      getStudents();
    }

    return ()=>{
      ignore = true
    }
  }, [])

  const getStudents = async ()=>{
    setLoading(true)
    try {
      await fetch(`${API_BASE}/characters`)
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
        setStudents(data)
      })
    } catch (error) {
      setError(error.message||"Unexpected Error")
    } finally{
      setLoading(false)
    }
  }

  const createStudent=async()=>{
    try {
      await fetch(`${API_BASE}/characters/`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(values)
      })
      .then(()=>getStudents())
    } catch (error) {
      setError(error.message||"Unexpected Error")
    } finally{
      setLoading(false)
    }
  }

  const handleSubmit=(event)=>{
    event.preventDefault();
    createStudent();
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
       <h1>Characters:</h1>
       <Link to="/">Home</Link>
       <ul>
        {
          students && students.map(student=>{
            return <li key={student._id}>
              <Link to={`/students/${student._id}`}>{student.name}</Link>
            </li>
          })
        }
       </ul>
       <form onSubmit={(event)=>handleSubmit(event)}>
        <label>Name: <input type="text" name="name" value={values.name} onChange={handleInputChanges} /></label>
        <label>Race: <input type="text" name="race" value={values.race} onChange={handleInputChanges} /></label>
        <input type="submit" value="Submit" />
       </form>
      </header>
    </div>
  );
}

export default Dashboard;
