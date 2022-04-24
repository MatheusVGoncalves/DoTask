import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Button, Table } from "react-bootstrap";
import api from "../../services/api";

// Biblioteca para trabalhar com datas
import moment from 'moment'

interface ITask {
    id: number;
    title: string;
    description: string;
    finished: boolean;
    created_at: Date;
    updated_at: Date
}

const Tasks: React.FC = () => {

    const [ tasks, setTasks ] = useState<ITask[]>([]);
    const history = useNavigate();

    useEffect(() => {
        loadTasks()
    }, [])

    async function loadTasks() {
        const response = await api.get('/tasks')
        console.log(response)
        setTasks(response.data)
    }

    async function finishedTask(id: number) {
        await api.patch(`/tasks/${id}`)
        loadTasks()
    }

    async function deleteTask(id: number) {
        await api.delete(`/tasks/${id}`)
        loadTasks()
    }

    function formateDate(date: Date) {
        return moment(date).format("DD/MM/YYYY")
    } 

    // Navegação
    function newTask() {
        history('/tarefas_cadastro')
    }

    function editTask(id: number) {
        history(`/tarefas_cadastro/${id}`)
    }

    function viewTask(id: number) {
        history(`/tarefas/${id}`)
    }

    return (
        <div className="container mt-5 pt-4">
            <div className="d-flex justify-content-between mt-3 mb-3">
            <h1>TAREFAS</h1>
            <Button variant="dark" size="sm" onClick={newTask}>Nova Tarefa</Button>
            </div>
            
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>TÍTULO</th>
                        <th>DATA DE ATUALIZAÇÃO</th>
                        <th>STATUS</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map(task => (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td>{formateDate(task.updated_at)}</td>
                                <td>
                                <Badge pill bg={ task.finished ? "success" : "warning" }>
                                    { task.finished ? "FINALIZADO" : "PENDENTE"}
                                </Badge>
                                </td>
                                <td>
                                <Button disabled={task.finished} variant="primary" size="sm" onClick={() => editTask(task.id)}>Editar</Button>{' '}
                                <Button disabled={task.finished} variant="success" size="sm" onClick={() => finishedTask(task.id)}>Finalizar</Button>{' '}
                                <Button variant="info" size="sm" onClick={() => viewTask(task.id)}>Visualizar</Button>{' '}
                                <Button variant="danger" size="sm" onClick={() => deleteTask(task.id)} >Remover</Button>{' '}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Tasks;