import React, {useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';

function Showusuarios() {
    const url='http://localhost:5000/usuarios';
    const [usuarios, setUsuarios]= useState([]);
    const [id,setId]= useState('');
    const [nombre,setNombre]= useState('');
    const [apellidopaterno,setApellidopaterno]= useState('');
    const [apellidomaterno,setApellidomaterno]= useState('');
	const [edad,setEdad]= useState('');
	const [codigopostal,setCodigopostal]= useState('');
	const [telefono,setTelefono]= useState('');
	const [estadocivil,setEstadocivil]= useState('');
	const [fechanacimiento,setFechanacimiento]= useState('');
	const [pais,setPais]= useState('');
	const [estado,setEstado]= useState('');
	const [municipio,setMunicipio]= useState('');
	const [localidad,setLocalidad]= useState('');
	const [idioma,setIdioma]= useState('');
	const [pasatiempo,setPasatiempo]= useState('');
	const [preferencias,setPreferencias]= useState('');
	const [operation, setOperation]= useState(1);
    const [title, setTitle]= useState('');
    useEffect( ()=>{
        getUsuarios();
    },[]);

    const getUsuarios = async () => {
        const respuesta = await axios.get(url);
        setUsuarios(respuesta.data);
        
    }

    const openModal = (ope, id, nombre, apellidopaterno, apellidomaterno, edad, codigopostal, telefono, estadocivil, fechanacimiento, pais, estado, municipio, localidad, idioma, pasatiempo, preferencias) =>{
        setId('');
        setNombre('');
        setApellidopaterno('');
        setApellidomaterno('');
        setEdad('');
        setCodigopostal('');
        setTelefono('');
        setEstadocivil('');
        setFechanacimiento('');
        setPais('');
        setEstado('');
        setMunicipio('');
        setLocalidad('');
        setIdioma('');
        setPasatiempo('');
        setPreferencias('');
        setOperation(ope);
        if(ope === 1){
            setTitle('Registrar Usuario');
        }else if(ope === 2){
            setTitle('Editar Usuario');
            setId(id)
            setNombre(nombre);
            setApellidopaterno(apellidopaterno);
            setApellidomaterno(apellidomaterno);
            setEdad(edad);
            setCodigopostal(codigopostal);
            setTelefono(telefono);
            setEstadocivil(estadocivil);
            setFechanacimiento(fechanacimiento);
            setPais(pais);
            setEstado(estado);
            setMunicipio(municipio);
            setLocalidad(localidad);
            setIdioma(idioma);
            setPasatiempo(pasatiempo);
            setPreferencias(preferencias);
            }
            window.setTimeout(function (){
                document.getElementById('nombre').focus();
            },500);
        
    }

    const validar = () => {
        var parametros;
        var metodo;
        console.log(operation);
        if(nombre.trim() ===''){
            show_alerta('Escribe el nombre', 'warning');
        }else if(apellidopaterno.trim() ===''){
            show_alerta('Escribe el apellido paterno', 'warning');
        }else if(apellidomaterno.trim()===''){
            show_alerta('Escribe el apellido materno', 'warning');
        }else if(edad ===''){
            show_alerta('Escribe la edad', 'warning');
        }else if(codigopostal.trim()===''){
            show_alerta('Escribe codigo postal', 'warning');
        }else if(estadocivil.trim()===''){
            show_alerta('Escribe el estado civil', 'warning');
        }else if(fechanacimiento.trim()===''){
            show_alerta('Escribe la fecha de nacimiento', 'warning');
        }else if(pais.trim()===''){
            show_alerta('Escribe el pais', 'warning');
        }else if(estado.trim()===''){
            show_alerta('Escribe el estado', 'warning');
        }else if(municipio.trim()===''){
            show_alerta('Escribe el municipio', 'warning');
        }else if(localidad.trim()===''){
            show_alerta('Escribe la localidad', 'warning');
        }else if(idioma.trim()===''){
            show_alerta('Escribe el idioma', 'warning');
        }else if(pasatiempo.trim()===''){
            show_alerta('Escribe el pasatiempo', 'warning');
        }else if(preferencias.trim()===''){
            show_alerta('Escribe las preferencias', 'warning');
        }else
        {
            if (operation === 1){
                parametros= {nombre:nombre.trim(),apellidopaterno:apellidopaterno.trim(), apellidomaterno:apellidomaterno.trim(),edad: edad, codigopostal:codigopostal.trim(), estadocivil:estadocivil.trim(),fechanacimiento:fechanacimiento.trim(), pais:pais.trim(), estado:estado.trim(),municipio:municipio.trim(),localidad:localidad.trim(), idioma:idioma.trim(), pasatiempo:pasatiempo.trim(), preferencias:preferencias.trim()
                
            };
            metodo = 'POST';
            } else{
                parametros= {id:id, nombre:nombre.trim(),apellidopaterno:apellidopaterno.trim(), apellidomaterno:apellidomaterno.trim(),edad: edad, codigopostal:codigopostal.trim(), estadocivil:estadocivil.trim(),fechanacimiento:fechanacimiento.trim(), pais:pais.trim(), estado:estado.trim(),municipio:municipio.trim(),localidad:localidad.trim(), idioma:idioma.trim(), pasatiempo:pasatiempo.trim(), preferencias:preferencias.trim()
                
                };
                metodo = 'PATCH';
            }
            console.log('hola')
            enviarSolicitud(metodo, parametros);
        }
    }
    const enviarSolicitud = async (metodo, parametros) => {
        await axios({method: metodo, url: url, data: parametros}).then(function (respuesta){
            var tipo = respuesta.data[0];
            var msj = respuesta.data[1];
            show_alerta(msj, tipo);
            if(tipo === 'success'){
                document.getElementById('btnCerrar').click();
                getUsuarios();
            }
        })
        .catch(function (error){
            show_alerta('error de solicitud', 'error');
            console.log(error);
        });
    }
    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-4'>
                        <div className='d-grid mx-auto'>
                            <button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalUsuarios'>
                                <i className='fa-solid fa-circle-plus'></i>
                                Agregar Usuario
                            </button>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-12 col-lg-8 offset-lg-2'>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>
                                            id
                                        </th>
                                        <th>
                                            Nombre
                                        </th>
                                        <th>
                                            Edad
                                        </th>
                                        <th>
                                            Codigo Postal
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                    {usuarios.map((usuario, id)=>(
                                        <tr key={usuario.id}>
                                            <td>{usuario.id}</td>
                                            <td>{usuario.nombre}</td>
                                            <td>{usuario.edad}</td>
                                            <td>{usuario.codigopostal}</td>
                                            <td>
                                                <button onClick={() => openModal(2,usuario.id, usuario.nombre,usuario.apellidopaterno, usuario.apellidomaterno, usuario.edad, usuario.codigopostal, usuario.telefono, usuario.estadocivil, usuario.fechanacimiento, usuario.pais, usuario.estado, usuario.municipio, usuario.localidad, usuario.idioma, usuario.pasatiempo, usuario.preferencias)} data-bs-toggle='modal' data-bs-target='#modalUsuarios'className='btn btn-warning'>
                                                    <i className='fa-solid fa-edit'></i>
                                                </button>
                                                &nbsp;
                                                <button   className='btn btn-danger'>
                                                    <i className='fa-solid fa-trash'></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div  id='modalUsuarios' className='modal fade' aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-cotent bg-light'>
                        <div className='modal-header'>
                            <label className='h5'>{title}
                            </label> 
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>           
                        </div>
                        <div className='modal-body'>
                            <input type='hidden' id ='id'>
                            </input>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-gift'></i>
                                </span>
                                <input type='text' id='nombre' className='form-control' placeholder='nombre' value={nombre} onChange={(e)=> setNombre(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-gift'></i>
                                </span>
                                <input type='text' id='apellidopaterno' className='form-control' placeholder='Apellido paterno' value={apellidopaterno} onChange={(e)=> setNombre(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-gift'></i>
                                </span>
                                <input type='text' id='apellidomaterno' className='form-control' placeholder='Apellido Materno' value={apellidomaterno} onChange={(e)=> setNombre(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-gift'></i>
                                </span>
                                <input type='text' id='edad' className='form-control' placeholder='Edad' value={edad} onChange={(e)=> setNombre(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-gift'></i>
                                </span>
                                <input type='text' id='codigopostal' className='form-control' placeholder='Codigo Postal' value={codigopostal} onChange={(e)=> setNombre(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-gift'></i>
                                </span>
                                <input type='text' id='telefono' className='form-control' placeholder='telefono' value={telefono} onChange={(e)=> setNombre(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-gift'></i>
                                </span>
                                <input type='text' id='estadocivil' className='form-control' placeholder='Estado Civil' value={estadocivil} onChange={(e)=> setNombre(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-gift'></i>
                                </span>
                                <input type='text' id='fechanacimiento' className='form-control' placeholder='Fecha de nacimiento' value={fechanacimiento} onChange={(e)=> setNombre(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-gift'></i>
                                </span>
                                <input type='text' id='pais' className='form-control' placeholder='Pais' value={pais} onChange={(e)=> setNombre(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-gift'></i>
                                </span>
                                <input type='text' id='estado' className='form-control' placeholder='Estado' value={estado} onChange={(e)=> setNombre(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-gift'></i>
                                </span>
                                <input type='text' id='municipio' className='form-control' placeholder='Municipio' value={municipio} onChange={(e)=> setNombre(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-gift'></i>
                                </span>
                                <input type='text' id='localidad' className='form-control' placeholder='Localidad' value={localidad} onChange={(e)=> setNombre(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-gift'></i>
                                </span>
                                <input type='text' id='idioma' className='form-control' placeholder='Idioma' value={idioma} onChange={(e)=> setNombre(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-gift'></i>
                                </span>
                                <input type='text' id='pasatiempo' className='form-control' placeholder='Pasatiempo' value={pasatiempo} onChange={(e)=> setNombre(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-gift'></i>
                                </span>
                                <input type='text' id='preferencias' className='form-control' placeholder='Preferencias' value={preferencias} onChange={(e)=> setNombre(e.target.value)}></input>
                            </div>
                            <div className='d-grid col-6 mx-auto'>
                                <button  onClick={() => validar()} className='btn btn-success'><i className='fa-solid fa-gift'></i>Guardar</button>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button id ='btnCerrar' type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                        </div>
                    </div>
                </div>
                
            </div>
       </div>
    )
}

export default Showusuarios