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
    const { id } = useParams<{ id: string }>()
    const [empleado, setEmpleado] = useState<IEmpleado>(initialEmpleado);
    const navigate = useNavigate();

    useEffect(() => {

        const obtenerEmpleado = async () => {
            try {
                const response = await fetch(`${appsettings}Empleado/empleado/${id}`)

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
            const response = await fetch(`${appsettings.apiurl}Empleado/agregarempleado`, {
                method: 'POST',
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
                text: `An error occurred: ${error}`
            });
        }
    }

    return (
        <h1>Editar Empleado</h1>
    )
}