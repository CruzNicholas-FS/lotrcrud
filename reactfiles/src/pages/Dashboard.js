import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import '../App.css';
import authService from "../services/auth.service";
import charactersService from "../services/characters.service";

function Dashboard() {
  const [characters, setCharacters]=useState(null);
  const [loading, setLoading]=useState(false);
  const [error, setError]=useState(null);

  const [values, setValues]=useState({
    name:"",
    race:""
  })

  const navigate=useNavigate();

  const API_BASE=process.env.NODE_ENV==="development"
  ? "http://localhost:9000/api/v1" : process.env.REACT_APP_BASE_URL

  let ignore=false;
  useEffect(()=>{
    charactersService.getAllPrivateCharacters()
    .then(response=>{setCharacters(response.data)},
    error=>{console.log("Secured Page Error: ", error.response)
      if(error.response && error.response.status===403){
        authService.logout();
        navigate("/login")
      }
    }
    )
  }, [])

  const getCharacters = async ()=>{
    setLoading(true)
    try {
      await charactersService.getAllPrivateCharacters()
      .then((response)=>setCharacters(response.data))
    } catch (error) {
      setError(error.message||"Unexpected Error")
    } finally{
      setLoading(false)
    }
  }

  const createCharacter=async()=>{
    try {
      await charactersService.createCharacter(values.name, values.race)
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
       <Link to="/" className="link">Home</Link>
       <ul>
        {
          characters && characters.map(character=>{
            return <li key={character._id}>
              <Link to={`/characters/${character._id}`} className="link">{character.name}</Link>
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
