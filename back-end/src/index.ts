// Responsável por conter o servidor, middleware e conexão com DB
import * as express from "express"
import { AppDataSource } from "./data-source"
import  routes from "./routes"
import * as cors from 'cors'

const app = express()
AppDataSource.initialize()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3333)


