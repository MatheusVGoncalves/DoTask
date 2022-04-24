// Responsável por relacionar as rotas com as funções a serem executadas
import { Router, Response ,Request } from 'express'
import { finishedTask, getTask, getTasks, removeTask, saveTask, updateTask } from "./controller/TasksController"

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
    return response.json({ message: 'hello matheus'})
})

routes.get('/tasks', getTasks)

routes.get('/tasks/:id', getTask)

routes.post('/tasks', saveTask)

routes.put('/tasks/:id', updateTask)

routes.patch('/tasks/:id', finishedTask)

routes.delete('/tasks/:id', removeTask)

export default routes