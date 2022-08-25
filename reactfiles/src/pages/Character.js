import React, {useState, useEffect} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import '../App.css';
import charactersService from "../services/characters.service";

function Character() {
  const [characters, setCharacters]=useState(null);
  const [loading, setLoading]=useState(false);
  const [error, setError]=useState(null);

  const [values, setValues]=useState({
    name:"",
    race:""
  })

  const {id}=useParams();
  const navigate=useNavigate();

  let ignore=false;
  useEffect(()=>{
    if (!ignore) {
      charactersService.getSpecificCharacter(id)
      .then(res=>setValues({name:res.data.name, race:res.data.race}))
      .catch(error=>{
        setError(error.message||"Unexpected Error")
      })
    }

    return ()=>{
      ignore = true
    }
  }, [])

  const deleteCharacter=async()=>{
    try {
      await charactersService.deleteCharacter(id)
      .then(res=>{
        setCharacters(res.data)
        navigate("/dashboard", {replace:true})
      })
    } catch (error) {
      setError(error.message||"Unexpected Error")
    } finally{
      setLoading(false)
    }
  }

  const updateCharacter=async()=>{
    try {
      await charactersService.updateCharacter(id, values.name, values.race)
      .then(res=>{
        setCharacters(res.data)
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
    updateCharacter();
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
       <h1>Character Profile:</h1>
       <h5>{values && values.name}</h5>
       <button onClick={()=>deleteCharacter()}>Delete Character</button>
       <Link to="/" className="link">Home</Link>
       <Link to="/dashboard" className="link">Dashboard</Link>
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
