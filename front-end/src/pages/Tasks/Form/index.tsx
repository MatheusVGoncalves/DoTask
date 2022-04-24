import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import api from "../../../services/api";

interface ITask {
    title: string;
    description: string;
}

const Tasks: React.FC = () => {

    // Hooks do React Router Dom
    const history = useNavigate(); // Para trabalhar com navegação
    const { id } = useParams() // Para pegar parâmetros passados na URL

    const [model, setModel] = useState<ITask>({
        title: '',
        description: ''
    })

    useEffect(() => {
        if( id !== undefined) {
            findTask(id)
        }
    }, [id])

    function updateModel (e: ChangeEvent<HTMLInputElement>) {
         setModel({
             ...model,
             [e.target.name]: e.target.value
         })
    }

    async function onSubmit (e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if( id !== undefined) {
            const response = await api.put(`/tasks/${id}`, model)
        } else {
            const response = await api.post('/tasks', model)
        }
        back()
    }

    function back() {
        history(-1)
    }

    async function findTask (id: string) {
        const response = await api.get(`tasks/${id}`)
        setModel({
            title: response.data.title,
            description: response.data.description
        })
    }

    return (
        <div className="container mt-5 pt-4">
            <div className="d-flex justify-content-between mt-3 mb-3">
                <h1>NOVA TAREFA! 📋</h1>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
            <div>
                <Form onSubmit={onSubmit}>

                    <Form.Group className="mb-3">
                        <Form.Label>Título</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Insira sua tarefa" 
                            name='title' 
                            value={model.title}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} 
                        />
                        <Form.Text className="text-muted">
                        Seja objetivo para definir sua tarefa 🚀
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control 
                            as='textarea' 
                            rows={3} 
                            placeholder="Descreva sua tarefa" 
                            name='description' 
                            value={model.description}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} 
                        />
                    </Form.Group>

                    <Button variant="dark" type="submit">
                        Salvar 💾
                    </Button>
                </Form>
            </div>


        </div>
    )
}

export default Tasks;