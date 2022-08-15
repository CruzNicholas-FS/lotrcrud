import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import '../App.css';

function Dashboard() {
  const [characters, setCharacters]=useState(null);
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
      getCharacters();
    }

    return ()=>{
      ignore = true
    }
  }, [])

  const getCharacters = async ()=>{
    setLoading(true)
    try {
      await fetch(`${API_BASE}/characters`)
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
        setCharacters(data)
      })
    } catch (error) {
      setError(error.message||"Unexpected Error")
    } finally{
      setLoading(false)
    }
  }

  const createCharacter=async()=>{
    try {
      await fetch(`${API_BASE}/characters/`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(values)
      })
      .then(()=>getCharacters())
    } catch (error) {
      setError(error.message||"Unexpected Error")
    } finally{
      setLoading(false)
    }
  }

  const handleSubmit=(event)=>{
    event.preventDefault();
    createCharacter();
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
          characters && characters.map(character=>{
            return <li key={character._id}>
              <Link to={`/characters/${character._id}`}>{character.name}</Link>
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
