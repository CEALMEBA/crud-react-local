//Creador: Cesar Alfonso Mendoza Barradas
//crud local con array list y insercion en memoria ,no contiene base de datos
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {Table,Button,Container,Modal,ModalBody, ModalHeader,FormGroup,ModalFooter} from 'reactstrap';

const data =[
  {id: 1, Nombre: "hola", Numero: "5963214896"},
  {id: 2, Nombre: "hola2", Numero: "5267698756"},
  {id: 3, Nombre: "hola3", Numero: "1234567893"},
  {id: 4, Nombre: "hola4", Numero: "1234567896"},
  {id: 5, Nombre: "hola5", Numero: "9874563210"},
  {id: 6, Nombre: "hola6", Numero: "0369875412"},
];
class App extends React.Component {
  state={
    data: data,
    form:{
      id:'',
      nombre:'',
      numero:''
    },
   modalInsertar: false,
  }
  handlechange=e=>{
   this.setState({
     form:{
       ...this.state.form,
       [e.target.name]: e.target.value,
     },
   });
  };
   mostrarModalInsertar=()=>{
    this.setState({modalInsertar: true});
   }
   ocultarModalInsertar=()=>{
    this.setState({modalInsertar: false});
   }

   mostrarModalEditar=(registro)=>{
    this.setState({modalEditar: true ,form: registro});
   }
   ocultarModalEditar=()=>{
    this.setState({modalEditar: false});
   }
  
  insertar=()=>{
    var valorNuevo={...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista=this.state.data;
    lista.push(valorNuevo);
    this.setState({data: lista, modalInsertar:false});
  }
 
 editar=(dato)=>{
   var contador=0;
   var lista=this.state.data;
   lista.map((registro)=>{
     if(dato.id==registro.id){
       lista[contador].Nombre=dato.Nombre;
       lista[contador].Numero=dato.Numero;
     }
     contador++;
   });
   this.setState({data: lista, modalEditar: false});
 }

 eliminar=(dato)=>{
   var opcion= window.confirm("Esta seguro de eliminar el registro"+dato.id);
   if(opcion){
     var contador=0;
     var lista = this.state.data;
     lista.map((registro)=>{
       if(registro.id==dato.id){
         lista.splice(contador, 1);
       }
       contador++;
     });
     this.setState({data: lista});
   }
 }

  render() {
    return (
      <>
      <Container>
      <br/>
        <Button outline color="success" onClick={()=>this.mostrarModalInsertar()} >Insertar Nuevo </Button>
         <br/> <br/>
         <Table dark>
           <thead><tr><th>Id</th>
           <th>Nombre</th>
           <th>Telefono</th>
           <th>opciones</th> 
           </tr></thead>
           <tbody>
             {this.state,data.map((elemento)=>(
              <tr>
                 <td>{elemento.id}</td>
                 <td>{elemento.Nombre}</td>
                 <td>{elemento.Numero}</td>
                 <td><Button outline color ="primary" onClick={()=>this.mostrarModalEditar(elemento)} >Editar</Button></td>
                 {" "}
                 <td><Button outline color ="danger" onClick={()=>this.eliminar(elemento)}>Eliminar</Button></td>
              </tr>
             ))}
           </tbody>
         </Table>
        </Container>
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar Registro</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className="form-control" readOnly type="text"  value={this.state.data.length+1}/>
            </FormGroup>

            <FormGroup>
              <label>Nombre</label>
              <input className='form-control' name="Nombre" type="text" onChange={this.handlechange}/>
            </FormGroup>

            <FormGroup>
              <label>Numero</label>
              <input className='form-control' name="Numero" type="text" onChange={this.handlechange}/>
            </FormGroup>

          </ModalBody>
          <ModalFooter>
          <td><Button outline color ="primary" onClick={()=>this.insertar()} >agregar</Button></td>
          <td><Button outline color ="danger" onClick={()=>this.ocultarModalInsertar()}>cancelar</Button></td>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
            <div>
              <h3>Editar Registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className="form-control" readOnly type="text" value={this.state.form.id}/>
            </FormGroup> 

            <FormGroup>
              <label>Nombre</label>
              <input className='form-control' name="Nombre" type="text" onChange={this.handlechange} value={this.state.form.Nombre}/>
            </FormGroup>

            <FormGroup>
              <label>Numero</label>
              <input className='form-control' name="Numero" type="text" onChange={this.handlechange} value={this.state.form.Numero}/>
            </FormGroup>

          </ModalBody>
          <ModalFooter>
          <td><Button outline color ="primary" onClick={()=>this.editar(this.state.form)} >editar</Button></td>
          <td><Button outline color ="danger" onClick={()=>this.ocultarModalEditar()}>cancelar</Button></td>
          </ModalFooter>
        </Modal>
      </>)
  }
}

export default App;
