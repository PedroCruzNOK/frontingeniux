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
    
    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-4'>
                        <div className='d-grid mx-auto'>
                            <button className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalUsuarios'>
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
                                                <button className='btn btn-warning'>
                                                    <i className='fa-solid fa-edit'></i>
                                                </button>
                                                &nbsp;
                                                <button className='btn btn-danger'>
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
            <div className='modal fade' aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-cotent'>
                        <div className='modal-header'>
                            <label className='h5'>{title}
                            </label> 
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>           
                        </div>
                        <div className='modal-body'>
                            <input type='hidden' id ='id'>
                            </input>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'></span>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
       </div>
    )
}

export default Showusuarios