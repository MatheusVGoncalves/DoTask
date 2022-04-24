import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Badge, Button, Card } from 'react-bootstrap';
import api from '../../../services/api';
import moment from 'moment';

interface ITask {
    id: number;
    title: string;
    description: string;
    finished: boolean;
    created_at: Date;
    updated_at: Date;
}

const TaskDetail: React.FC = () => {

    const history = useNavigate();
    const { id } = useParams();
    const [task, setTask] = useState<ITask>();

    useEffect(() => {
        findTask()
    }, [id])

    async function findTask() {
        const response = await api.get<ITask>(`/tasks/${id}`)
        setTask(response.data)
    }

    function back() {
        history(-1)
    }

    function formateDate(date: Date | undefined) {
        return moment(date).format("DD/MM/YYYY")
    } 

    return (
        <div className="container mt-5 pt-4">
            <div className="d-flex justify-content-between mt-3 mb-3">
                <h1>DETALHES DA TAREFA ✍️</h1>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
            <div>
                <Card >
                    <Card.Body>
                        <Card.Title>{task?.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            <Badge pill bg={ task?.finished ? "success" : "warning" }>
                                { task?.finished ? 'Finalizado' : 'Pendente'}
                            </Badge>
                        </Card.Subtitle>
                        <br />
                        <Card.Text>
                            {task?.description}
                            <br />
                            <br />
                            <strong><em>Data de Criação: <Badge pill bg='dark'>{formateDate(task?.created_at)}</Badge></em></strong>
                            <br />
                            <strong><em>Data de Atualização: <Badge pill bg='dark'>{formateDate(task?.updated_at)}</Badge></em></strong>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>

        </div>
    );
}

export default TaskDetail;