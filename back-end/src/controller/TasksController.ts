// Responsável por conter as funções/ métodos que serão executadas nas chamadas de API
import { AppDataSource } from "../data-source"
import { Tasks } from "../entity/Tasks";
import { Request, Response } from 'express'

// Método para retornar todas as tasks
export const getTasks = async (request:Request, response: Response) => {
    const tasks = await AppDataSource.getRepository(Tasks).find()
    return response.json(tasks)
}

// Método para retornar uma task específica, baseado no id
export const getTask = async (request: Request, response: Response) => {
    const { id  } = request.params
    const task = await AppDataSource.getRepository(Tasks).findOne({where: {id: parseInt(id, 10)}})
    return response.json(task)
}

// Método para criar e salvar uma nova task
export const saveTask = async (request:Request, response: Response) => {
    const task = await AppDataSource.getRepository(Tasks).save(request.body)
    return response.json(task)
}

// Método para atualizar uma ou mais tasks, baseado no id
export const updateTask = async (request: Request, response: Response) => {
    const { id } = request.params
    const task = await AppDataSource.getRepository(Tasks).update(id, request.body)

    if(task.affected === 1) {
        const taskUpdated = await AppDataSource.getRepository(Tasks).findOne({where: {id: parseInt(id, 10)}})
        return response.json(taskUpdated)
    }

    return response.status(404).json({ message: "Task not found!"})
}

// Método para atualizar o status de finished de uma task em específico
export const finishedTask = async (request: Request, response: Response) => {
    const { id } = request.params
    const task = await AppDataSource.getRepository(Tasks).update(id, {
        finished: true
    })

    if(task.affected === 1) {
       // const taskUpdated = await AppDataSource.getRepository(Tasks).findOne({where: {id: parseInt(id, 10)}})
        return response.json({ message: "Task finished"})
    }

    return response.status(404).json({ message: "Task not found!"})
}

export const removeTask = async (request: Request, response: Response) => {
    const { id } = request.params
    const task = await AppDataSource.getRepository(Tasks).delete(id)

    if(task.affected === 1) {
       // const taskUpdated = await AppDataSource.getRepository(Tasks).findOne({where: {id: parseInt(id, 10)}})
        return response.json({ message: "Task removed"})
    }

    return response.status(404).json({ message: "Task not found!"})
}