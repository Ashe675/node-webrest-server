import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodosControllerDDD {

    //* DI
    constructor(
        private readonly todoRepository: TodoRepository,
    ) {}

    public getTodos = async (req: Request, res: Response) => {

        const todos = await this.todoRepository.getAll();

        res.json(todos);
    };

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;

        // const todo = todos.find(todo => todo.id === id);
        try {
            const todo = await this.todoRepository.findById(id);
            res.json(todo);
        } catch (error) {
            res.status(400).json({error});   
        };
    };

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) return res.status(400).json({
            error: error
        });

        const newTodo = await this.todoRepository.create(createTodoDto!);

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

        // const todoFounded = todos.find(todo => todo.id === id);


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

        const updatedTodo = await this.todoRepository.updateById(updateTodoDto!);

        res.json(updatedTodo);
    };

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;

        const deletedTodo = await this.todoRepository.deleteById(id);

        res.json(deletedTodo);
    };

}