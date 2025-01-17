import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDatasourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repository";

export class TodoRoutes {

    static get routes(): Router {

        const router = Router();

        const datasource = new TodoDatasourceImpl();

        const todoRepository = new TodoRepositoryImpl(datasource);

        const todoController = new TodosController(todoRepository);

        router.get('/', todoController.getTodos);

        router.get('/:id', (req, res) => {
            todoController.getTodoById(req, res)
        });

        router.post('/', (req, res) => {
            todoController.createTodo(req, res);
        });

        router.put('/:id', (req, res) => {
            todoController.updateTodo(req, res);
        });

        router.delete('/:id', (req, res) => {
            todoController.deleteTodo(req, res);
        });


        return router;
    };

};