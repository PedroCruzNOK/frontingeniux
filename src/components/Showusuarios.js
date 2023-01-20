import React, {useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';

const Showusuarios = () => {
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
                document.getElementById('1nombre').focus();
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
        }else if(codigopostal ===''){
            show_alerta('Escribe codigo postal', 'warning');
        }else if(telefono.trim()===''){
            show_alerta('Escribe el telefono', 'warning');
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
                parametros= {nombre:nombre.trim(),apellidopaterno:apellidopaterno.trim(), apellidomaterno:apellidomaterno.trim(),edad: edad, codigopostal:codigopostal,telefono:telefono.trim(), estadocivil:estadocivil.trim(),fechanacimiento:fechanacimiento.trim(), pais:pais.trim(), estado:estado.trim(),municipio:municipio.trim(),localidad:localidad.trim(), idioma:idioma.trim(), pasatiempo:pasatiempo.trim(), preferencias:preferencias.trim()
                
            };
            metodo = 'POST';
            enviarSolicitud(metodo, parametros);
            } else{
                parametros= {id:id, nombre:nombre.trim(),apellidopaterno:apellidopaterno.trim(), apellidomaterno:apellidomaterno.trim(),edad: edad, codigopostal:codigopostal,telefono:telefono.trim(), estadocivil:estadocivil.trim(),fechanacimiento:fechanacimiento.trim(), pais:pais.trim(), estado:estado.trim(),municipio:municipio.trim(),localidad:localidad.trim(), idioma:idioma.trim(), pasatiempo:pasatiempo.trim(), preferencias:preferencias.trim()
                
                };
                metodo = 'PATCH';
                enviarSolicitud2(metodo, parametros);
            }
            
        }
    }
    const enviarSolicitud = async (metodo, parametros) => {
        await axios({method: metodo, url: url, data: parametros}).then(function (respuesta){
            var tipo = 'success';
            var msj = 'Usuario creado con exito';
            show_alerta(msj, tipo);
            if(tipo === 'success'){
                document.getElementById('btnCerrar').click();
                getUsuarios();
            }
        })
        .catch(function (error){
            show_alerta('error el usuario ya existe', 'error');
            console.log(error);
        });
    }
    const enviarSolicitud2 = async (metodo, parametros) => {
        await axios({method: metodo, url: url+'/'+id, data: parametros}).then(function (respuesta){
            var tipo = 'success';
            var msj = 'Usuario actualizado';
            show_alerta(msj, tipo);
            if(tipo === 'success'){
                document.getElementById('btnCerrar').click();
                getUsuarios();
            }
        })
        .catch(function (error){
            show_alerta('error al actualizar', 'error');
            console.log(error);
        });
    }
    const deleteUsuario = (id, nombre) =>{
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: 'Seguro deseas eliminar a '+nombre+'?',
            icon:'question', text: 'una vez eliminado se borrara su informacion',
            showCancelButton:true, confirmButtonText: 'si, eliminar', cancelButtonText:'Cancelar'
        }).then ((result)=>{
            if(result.isConfirmed){
                setId(id);
                enviarSolicitud2('DELETE', {id:id});
            }else{
                show_alerta('El usuario no fue eliminado', 'info');
            }
        });
    
    }
    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-4'>
                        <div className='d-grid mx-auto'>
                            <button onClick={() => openModal(1)} className='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalUsuarios'>
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
                                            Nombre Completo
                                        </th>
                                        <th>
                                            Edad
                                        </th>
                                        <th>
                                            Codigo Postal
                                        </th>
                                        <th>
                                            Telefono
                                        </th>
                                        <th>
                                            Estado civil
                                        </th>
                                        <th>
                                            Fecha de nacimiento
                                        </th>
                                        <th>
                                            Direccion
                                        </th>
                                        <th>
                                            Idioma
                                        </th>
                                        <th>
                                            Pasatiempo
                                        </th>
                                        <th>
                                            Preferencias
                                        </th>
                                        <th>
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                    {usuarios.map((usuario, id)=>(
                                        <tr key={usuario.id}>
                                            <td>{usuario.id}</td>
                                            <td>{usuario.nombre} {usuario.apellidopaterno} {usuario.apellidomaterno}</td>
                                            <td>{usuario.edad}</td>
                                            <td>{usuario.codigopostal}</td>
                                            <td>{usuario.telefono}</td>
                                            <td>{usuario.estadocivil}</td>
                                            <td>{usuario.fechanacimiento}</td>
                                            <td>{usuario.pais} {usuario.estado} {usuario.municipio} {usuario.localidad}</td>
                                            <td>{usuario.idioma}</td>
                                            <td>{usuario.pasatiempo}</td>
                                            <td>{usuario.preferencias}</td>
                                            <td>
                                                <button onClick={() => openModal(2,usuario.id, usuario.nombre,usuario.apellidopaterno, usuario.apellidomaterno, usuario.edad, usuario.codigopostal, usuario.telefono, usuario.estadocivil, usuario.fechanacimiento, usuario.pais, usuario.estado, usuario.municipio, usuario.localidad, usuario.idioma, usuario.pasatiempo, usuario.preferencias)} data-bs-toggle='modal' data-bs-target='#modalUsuarios'className='btn btn-info'>
                                                    <i className='fa-solid fa-edit'></i>
                                                </button>
                                                &nbsp;
                                                <button  onClick={()=>deleteUsuario(usuario.id, usuario.nombre)} className='btn btn-danger'>
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
                    <div className='modal-content'>
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
                                    <i className='fa-solid fa-user'></i>
                                </span>
                                <input type='text' id='1nombre' className='form-control' placeholder='nombre' value={nombre} onChange={(e)=> setNombre(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-user'></i>
                                </span>
                                <input type='text' id='1apellidopaterno' className='form-control' placeholder='Apellido paterno' value={apellidopaterno} onChange={(e)=> setApellidopaterno(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-user'></i>
                                </span>
                                <input type='text' id='1apellidomaterno' className='form-control' placeholder='Apellido Materno' value={apellidomaterno} onChange={(e)=> setApellidomaterno(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-gift'></i>
                                </span>
                                <input type='text' id='1edad' className='form-control' placeholder='Edad' value={edad} onChange={(e)=> setEdad(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-code'></i>
                                </span>
                                <input type='text' id='1codigopostal' className='form-control' placeholder='Codigo Postal' value={codigopostal} onChange={(e)=> setCodigopostal(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-phone'></i>
                                </span>
                                <input type='text' id='1telefono' className='form-control' placeholder='telefono' value={telefono} onChange={(e)=> setTelefono(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-heart'></i>
                                </span>
                                <input type='text' id='1estadocivil' className='form-control' placeholder='Estado Civil' value={estadocivil} onChange={(e)=> setEstadocivil(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-cake-candles'></i>
                                </span>
                                <input type='date' id='1fechanacimiento' className='form-control' placeholder='Fecha de nacimiento' value={fechanacimiento} onChange={(e)=> setFechanacimiento(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-location'></i>
                                </span>
                                <input type='text' id='1pais' className='form-control' placeholder='Pais' value={pais} onChange={(e)=> setPais(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-location-dot'></i>
                                </span>
                                <input type='text' id='1estado' className='form-control' placeholder='Estado' value={estado} onChange={(e)=> setEstado(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-location-dot'></i>
                                </span>
                                <input type='text' id='1municipio' className='form-control' placeholder='Municipio' value={municipio} onChange={(e)=> setMunicipio(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-location-dot'></i>
                                </span>
                                <input type='text' id='1localidad' className='form-control' placeholder='Localidad' value={localidad} onChange={(e)=> setLocalidad(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-flag'></i>
                                </span>
                                <input type='text' id='1idioma' className='form-control' placeholder='Idioma' value={idioma} onChange={(e)=> setIdioma(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-playstation'></i>
                                </span>
                                <input type='text' id='1pasatiempo' className='form-control' placeholder='Pasatiempo' value={pasatiempo} onChange={(e)=> setPasatiempo(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-gear'></i>
                                </span>
                                <input type='text' id='1preferencias' className='form-control' placeholder='Preferencias' value={preferencias} onChange={(e)=> setPreferencias(e.target.value)}></input>
                            </div>
                            <div className='d-grid col-6 mx-auto'>
                                <button  onClick={() => validar()} className='btn btn-success'><i className='fa-solid fa-floppy-disk'></i>Guardar</button>
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