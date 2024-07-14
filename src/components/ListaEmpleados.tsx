import { ChangeEvent, useEffect, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { IEmpleado } from "../interfaces/EmpleadoInterface"
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Table } from "reactstrap"

export function ListaEmpleados() {
    const [empleados, setEmpleados] = useState<IEmpleado[]>([]);

    const obtenerEmpleados = async () => {
        try {
            const response = await fetch(`${appsettings.apiurl}Empleado/empleados`)

            if (response.ok) {
                const dataEmpleado = await response.json();
                setEmpleados(dataEmpleado);
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

    useEffect(() => {
        obtenerEmpleados();
    }, []);

    const eliminarEmpleado = (idEmpleado: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    const response = await fetch(`${appsettings.apiurl}Empleado/deleteempleado/${idEmpleado}`, { method: "DELETE" })

                    if (response.ok) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your user has been deleted.",
                            icon: "success"
                        });
                        await obtenerEmpleados();
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
        });
    }

    return (
        <Container>
            <Row>
                <Col className="mt-5" sm={{ size: 8, offset: 2 }} >
                    <h4>Empleados</h4>
                    <hr></hr>
                    <Link className="btn btn-success mb-3" to="/agregarempleado">Agregar Empleado</Link>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Sueldo</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                empleados.map((item) => (
                                    <tr key={item.idEmpleado}>
                                        <td>{item.nombre}</td>
                                        <td>{item.correo}</td>
                                        <td>{item.sueldo}</td>
                                        <td>
                                            <Link className="btn btn-primary m-1" to={`/empleado/${item.idEmpleado}`}>Editar</Link>
                                            <Button className="btn btn-danger m-1" onClick={() => {
                                                eliminarEmpleado(item.idEmpleado!)
                                            }}>Eliminar</Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );

}