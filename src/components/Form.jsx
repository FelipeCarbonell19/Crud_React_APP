import React from "react";
import { nanoid } from 'nanoid';

const Formulario = () => {

    const [fruta, setFruta] = React.useState('')
    const [frutas, setFrutas] = React.useState([])
    const [id, setId] = React.useState('')
    const [error, setError] = React.useState(null)
    const [modoEdicion, setModoEdicion] = React.useState(false)
  
    const agregarTarea = e => {
      e.preventDefault()
  
      if(!fruta.trim()){
        console.log('Digite La Fruta')
        setError('Ingrese La Fruta')
        return
      }
  
      setFrutas([
        ...frutas,
        {id: nanoid(), nombreFruta:fruta}
      ])
  
      setFruta('')
      setError(null)
    }
  
    const eliminarTarea = id => {
      const arrayAux = frutas.filter(item => item.id !== id)
      setFrutas(arrayAux)
    }
  
    const editar = item =>{
      setError(null)
      setModoEdicion(true)
      setFruta(item.nombreFruta)
      setId(item.id)
    }
  
    const cancelar = () =>{
      setModoEdicion(false)
      setFruta('')
      setId('')
      setError(null)
    }
  
    const editarTarea = e =>{
      e.preventDefault()
      if(!fruta.trim()){
        setError('Digite la Fruta')
        return
      }
  
      const arrayEditado = frutas.map(
        item => item.id=== id ? {id:id, nombreFruta:fruta} : item
        )
  
        setFrutas(arrayEditado)
        setFruta('')
        setId('')
        setError(null)
        setModoEdicion(false)
    }
  
    return (
      <div className="container mt-5">
        <h1 className="text-center">CRUD FRUTAS</h1>
        <hr />
        <div className="row">
          <div className="col-8">
            <h4 className="text-center">Lista De Frutas</h4>
            <ul className="list-group">
              {
                frutas.map(item => (
                  <li className="list-group-item" key={item.id}>
                    <span className="lead">{item.nombreFruta}</span>
                    
                        <button 
                          className='btn btn-danger btn-sm float-end mx-2'
                          onClick={() => eliminarTarea(item.id)}>Eliminar</button>
                        <button 
                        className='btn btn-warning btn-sm float-end'
                        onClick ={() => editar(item)}>Editar</button>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="col-4">
            <h4 className="text-center">
              {
                modoEdicion ? 'Editar Fruta' : 'Agregar Fruta'
              }
            </h4>
            <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
              {
                error ? <span className='text-danger'>{error}</span> : null
              }
              <input
                type="text"
                className='form-control mb-2'
                placeholder='Ingrese Fruta'
                onChange={e => setFruta(e.target.value)}
                value = {fruta}
              />
              {
                modoEdicion ?
                 (<>
                   <button
                  className="btn btn-warning btn-block" 
                  type='submit'>Editar</button>
                  <button
                  className="btn btn-dark btn-block mx-2" 
                  onClick ={() => cancelar()}>Cancelar</button>
                 </>)
                  : 
                  (<button
                    className="btn btn-dark btn-block" 
                    type='submit'>Agregar</button>
                    )
              }
              
            </form>
          </div>
        </div>
        
      </div>
    );
  }
export default Formulario