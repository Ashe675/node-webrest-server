import { Request, Response } from "express";
import { prisma } from '../../data/postgres/index';
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/todos";

export class TodosController {

    //* DI
    constructor() { }

    public getTodos = async (req: Request, res: Response) => {

        const todos = await prisma.todo.findMany();

        res.json(todos);
    };

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ error: `ID argument is not a number` });
        }

        const todo = await prisma.todo.findUnique({
            where: {
                id
            }
        })

        // const todo = todos.find(todo => todo.id === id);

        if (!todo) {
            return res.status(404).json({ error: `TODO with id: ${id} not found` });
        }

        res.json(todo);
    };

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if ( error ) return res.status(400).json({
            error: error
        });

        const newTodo = await prisma.todo.create({
            data: createTodoDto!
        })

        res.json(newTodo);
    };

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;

        const [error, updateTodoDto] = UpdateTodoDto.create({
            ...req.body,
            id
        })

        if (error) return res.status(400).json({
            error
        });

        const todoFounded = await prisma.todo.findUnique({
            where: {
                id
            }
        })

        // const todoFounded = todos.find(todo => todo.id === id);

        if (!todoFounded) {
            return res.status(404).json({ error: `TODO with id: ${id} not found` });
        }

        // const updateTodo = {
        //     text: text || todoFounded.text,
        //     completedAt: completedAt ? new Date(completedAt) : completedAt === null || 'null' ? null : todoFounded.completedAt
        // }

        // todoFounded.text = text;
        // //! Reference

        // todos.forEach((todo, index) => {
        //     if (todo.id === id) {
        //         todos[index] = {
        //             id,
        //             ...updateTodo
        //         }
        //     };
        // });

        // const newCompletedAt = completedAt && completedAt !== 'null' ? new Date(completedAt) : completedAt === null || completedAt === 'null' ? null : todoFounded.completedAt

        const updatedTodo = await prisma.todo.update({
            where: {
                id
            },
            data: updateTodoDto!.values
        })

        res.json(updatedTodo);
    };

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ error: `ID argument is not a number` });
        }

        const todoFounded = await prisma.todo.findUnique({
            where: {
                id
            }
        })

        if (!todoFounded) {
            return res.status(404).json({ error: `TODO with id: ${id} not found` });
        }

        const deletedTodo = await prisma.todo.delete({
            where: {
                id
            }
        });

        (deletedTodo)
            ? res.json(deletedTodo)
            : res.status(400).json({ error: `Todo with id: ${id} does not exist` })
    };

}