import { Request, Response } from "express";

const todos = [
    {
        id: 1,
        text: 'Buy milk',
        completedAt: new Date(),
    },
    {
        id: 2,
        text: 'Buy bread',
        completedAt: null,
    },
    {
        id: 3,
        text: 'Buy butter',
        completedAt: new Date(),
    }
];


export class TodosController {

    //* DI
    constructor() { }

    public getTodos = (req: Request, res: Response) => {
        res.json(todos);
    };

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ error: `ID argument is not a number` });
        }

        const todo = todos.find(todo => todo.id === id);

        if (!todo) {
            return res.status(404).json({ error: `TODO with id: ${id} not found` });
        }

        res.json(todo);
    };

    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body;
        if (!text) return res.status(400).json({
            error: 'Text property is required'
        });

        const newTodo = {
            id: todos.length + 1,
            text: text,
            completedAt: null
        };

        todos.push(newTodo);

        res.json(newTodo);
    };

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;

        const { text, completedAt } = req.body;

        if (!text) return res.status(400).json({
            error: 'Text property is required'
        });

        if (isNaN(id)) {
            return res.status(400).json({ error: `ID argument is not a number` });
        }

        const todoFounded = todos.find(todo => todo.id === id);

        if (!todoFounded) {
            return res.status(404).json({ error: `TODO with id: ${id} not found` });
        }

        const updateTodo = {
            text: text || todoFounded.text,
            completedAt: completedAt ? new Date(completedAt) : completedAt === null || 'null' ? null : todoFounded.completedAt
        }

        // todoFounded.text = text;
        //! Reference

        todos.forEach((todo, index) => {
            if (todo.id === id) {
                todos[index] = {
                    id,
                    ...updateTodo
                }
            };
        });

        res.json({
            id,
            ...updateTodo
        });
    };

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ error: `ID argument is not a number` });
        }

        const todoFounded = todos.find(todo => todo.id === id);

        if (!todoFounded) {
            return res.status(404).json({ error: `TODO with id: ${id} not found` });
        }

        todos.splice(todos.indexOf(todoFounded), 1);
       
        
        res.json(todoFounded);
    };

}