import React, {useState} from "react";
import shortid from "shortid";

import './App.css';

function App() {
  const [tarea, setTarea] = React.useState("");
  const [tareas, setTareas] = React.useState([]);
  const [modoEdicion, setModoEdicion] = React.useState(false);
  const [id, setId] = React.useState('');
  const [error, setError] = React.useState(null);


  const agregarTarea = e => {
    //evita que se procese el formulario con el evento GET
    e.preventDefault();
    if (!tarea.trim()){
      setError("Escriba una tarea por favor")
      return;
    }

    setTareas([...tareas,
    {id: shortid.generate(),
    nombreTarea: tarea
    }])
    setTarea(""); //Reseteo el valor del estado
    setError(null)
  }

  const eliminarTarea = id => {
    //  console.log("del ",id)
    //Filtro del array los que sean distintos al ID presionado
    const arrayFiltrado = tareas.filter(item => item.id !== id)
    setTareas(arrayFiltrado);

  }

  //Esta funcion es para activar el modo edicion
  //y mostrar los campos para editar en el form
  const editar = item => {
    console.log("upd ", item);
    setModoEdicion(true);
    setId(item.id);
    setTarea(item.nombreTarea)
  }

  //esta funcion es para grabar los datos a editar y validarlos
  const editarTarea = e => {
    e.preventDefault();
    if (!tarea.trim()){
      setError("Ingrese nombre tarea a actualizar")
      return
    }
    
    //si el ID es igual devuelvo ese id {} si el Id es distinto devuelvo el item completo
    //ya que son los que no estan siendo editados
    const arrayEditado = tareas.map(
      item => item.id === id ? {id: id, nombreTarea: tarea} : item
      ) 

    //Seteo las variables primer el array nuevo en el hook
    //luego pongo el modo edicion en false ya que salgo de el
    //inicializo como vacio el id  
    setTareas(arrayEditado);
    setModoEdicion(false);
    setTarea("")
    setId("")
    setError(null)


  }

  

  return (
    <div className ="container mt-5">
      <h1 className ="text-center"> CRUD SIMPLE </h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>    
          <ul className="list-group">
              {
                tareas.length ?
                    (
                        tareas.map(item => (
                          <li className="list-group-item" key={item.id}>
                            <span className="lead"> {item.nombreTarea} </span>
                            <button className="btn btn-danger btn-sm float-right mx-2"
                              onClick={() => eliminarTarea(item.id)}
                            >
                              Eliminar
                            </button>
                            
                            <button className="btn btn-warning btn-sm float-right"
                              onClick={()=> editar(item)} 
                            >
                              Editar
                            </button>
                          </li>
                        ))      
                      )
              : (<li className="list-group-item"> No hay tareas</li>)
              }
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
                {
                  //uso operador ternario para mostrar el titulo segun contenido de la variable modoEdicion
                  modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
                }
          </h4>
          <form onSubmit= { modoEdicion ? editarTarea : agregarTarea }>

            {
              error ? <span className="text-danger"> {error} </span> : null
            }

            <input 
              type="text" 
              className="form-control mb-2"
              placeholder="Ingrese tarea"
              onChange = {(e) => (setTarea(e.target.value))}
              value={tarea}
            />
            {
              modoEdicion ? ( 
                <button className="btn btn-warning btn-block" type="submit">Editar</button>    
              ) : (
                <button className="btn btn-dark btn-block" type="submit">Agregar</button>
              )
            }
            
            

          </form>
        </div>
        
      </div>
    </div>
    

  );
}

export default App;
