import { ChangeEvent, useEffect, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { IEmpleado } from "../interfaces/EmpleadoInterface"
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap"

const initialEmpleado = {
    idEmpleado: 0,
    nombre: "",
    correo: "",
    sueldo: 0
}

export function EditarEmpleado() {
    const { idEmpleado } = useParams<{ idEmpleado: string }>()
    const [empleado, setEmpleado] = useState<IEmpleado>(initialEmpleado);
    const navigate = useNavigate();

    useEffect(() => {

        const obtenerEmpleado = async () => {
            try {
                const response = await fetch(`${appsettings.apiurl}Empleado/empleado/${idEmpleado}`)

                if (response.ok) {
                    const dataEmpleado = await response.json();
                    setEmpleado(dataEmpleado);
                }
                else {
                    const errorMessage = await response.text(); // Intentar obtener el mensaje de error del cuerpo de la respuesta
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: errorMessage || "Something went wrong!"
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `An error occurred: ${error}`
                });
            }
        }

        obtenerEmpleado();
    }, [])

    const inputChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        const inputName = event.target.name;
        const inpuNameValue = event.target.value;

        setEmpleado({ ...empleado, [inputName]: inpuNameValue })
    }

    const editarEmpleadoPostApi = async () => {
        try {
            const response = await fetch(`${appsettings.apiurl}Empleado/editarempleado`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(empleado)
            });

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Save employed...",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            } else {
                const errorMessage = await response.text(); // Intentar obtener el mensaje de error del cuerpo de la respuesta
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: errorMessage || "Something went wrong!"
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `An error occurred while saving the employer: ${error}`
            });
        }
    }

    const volver = () => {
        navigate('/');
    };

    return (
        <Container>
            <Row>
                <Col className="mt-5" sm={{ size: 6, offset: 3 }} >
                    <h4>Editar Empleado</h4>
                    <hr></hr>
                    <Form>
                        <FormGroup>
                            <Label>Id Empleado</Label>
                            <Input type="number" name="idEmpleado" onChange={inputChangeValue} value={empleado.idEmpleado}></Input>
                        </FormGroup>
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
                    <Button color="success" className="me-4" onClick={editarEmpleadoPostApi}>Editar</Button>
                    <Button color="secondary" onClick={volver}>Volver</Button>
                </Col>
            </Row>
        </Container>
    )
}