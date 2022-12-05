import logo from './logo.svg';
import './App.css';
import { useEffect, useLayoutEffect, useState } from 'react';
function App() {
  const [pokemons, setPokemon]  = useState([]);
  const [equipo, setEquipo] = useState([]);


  const addToTeam = (item)=>{
    if(equipo.length < 6) setEquipo([...equipo, item])

  }
  const deleteDeTeam = (item) =>{

  let i = 0
  while(i < equipo.length){
    if(equipo[i].name == item.name){
      let temp = [...equipo]
      temp.splice(i,1)
      setEquipo(temp)
    }  
    i = i +1;
  }   

  }
  

  useEffect(() => {
    
    async function fetchPoke(){
 
      const response = await    fetch("https://pokeapi.co/api/v2/pokemon/", {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });

      const data = await response.json();
      console.log(data.results.length)
      let size = data.results.length;
      let arrtemp = []
      for (let index = 0; index < size; index++) {
        let temporal = await fetch( data.results[index]['url'], {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        });
        let temp2 =  await temporal.json();

        arrtemp.push(temp2)
      }
 
   
    setPokemon(arrtemp);
    console.log(arrtemp)
 
   
  }

   
       
    fetchPoke();
        
       
    
   
      
  }, []);
  
  return (
    <div className="App card">
      <div className='card-body justify-content-center'>
        
      <div className='titulo'>
        <h1 >Pokedex</h1>
        <br></br>
        </div>
      
        <div className='principal card ml-3 mt-3' >
          {pokemons.length > 0 ? (<>{pokemons.map((item)=> { return <div 
          
          className=' justify-content-center d-flex'

          key={item.name}
          >
        
         <img src={item.sprites.back_default} 
        width="100"
        height="100"
        alt="imagen"
        className=''
        ></img>
        <div className='card-body'>
        <p className='card-text'><b>{item.name}</b> <br></br> {item.base_experience}</p> 
        

        <button className='btn btn-primary' onClick={()=>addToTeam(item)}> Add</button>
        <hr></hr>

        </div>
         </div>}
      
          
        )}</>):(<><h1>null</h1></>)}
        </div>
        <h1>Equipo</h1>
        <br></br>
        <div className='principal card  ml-3 mt-3 ' width="40%">
          
          {equipo.length > 0 ? (<>{equipo.map((item)=> { return <div 
          className='justify-content-center d-flex'
          
          key={item.name}
          >
        <img src={item.sprites.back_default} 
        width="100"
        height="100"
        alt="imagen"
        className=''
        ></img>
       <div className='card-body'>
       <p className='card-t'><b>{item.name}</b> <br/> {item.base_experience}</p> 
        
       

        <button className='btn btn-primary' onClick={()=>deleteDeTeam(item)}> Delete</button>
        <hr></hr>
       </div>
         </div>}
      
          
        )}</>):(<><h3>Añade pokemones a tu equipo</h3></>)}
        </div>
      </div>
    </div>
  );
}
export default App;
