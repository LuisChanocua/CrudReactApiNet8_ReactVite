import { ChangeEvent, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { IEmpleado } from "../interfaces/EmpleadoInterface"
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap"

const initialEmpleado = {
    nombre: "",
    correo: "",
    sueldo: 0
}

export function NuevoEmpleado() {
    const [empleado, setEmpleado] = useState<IEmpleado>(initialEmpleado);
    const navigate = useNavigate();
    const inputChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        const inputName = event.target.name;
        const inpuNameValue = event.target.value;

        setEmpleado({ ...empleado, [inputName]: inpuNameValue })
    }

    const volver = () => {
        navigate('/');
    };

    const nuevoEmpleadoPostApi = async () => {
        const response = await fetch(`${appsettings.apiurl}Empleado/agregarempleado`, {
            method: 'POST',
            headers: {
                'Content-Type': 'aplication/json'
            },
            body: JSON.stringify(empleado)
        })

        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Save employed...",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/')
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!"
            });
        }
    }

    return (
        <Container>
            <Row>
                <Col className="mt-5" sm={{ size: 6, offset: 3 }} >
                    <h4>Nuevo Empleado</h4>
                    <hr></hr>
                    <Form>
                        <FormGroup>
                            <Label>Nombre</Label>
                            <Input type="text" name="nombre" onChange={inputChangeValue} value={empleado.nombre}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Correo</Label>
                            <Input type="email" name="correo" onChange={inputChangeValue} value={empleado.correo}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Sueldo</Label>
                            <Input type="number" min="1" name="sueldo" onChange={inputChangeValue} value={empleado.sueldo}></Input>
                        </FormGroup>
                    </Form>
                    <Button color="success" className="me-4" onClick={nuevoEmpleadoPostApi}>Añadir</Button>
                    <Button color="secondary" onClick={volver}>Volver</Button>
                </Col>
            </Row>
        </Container>
    )
}