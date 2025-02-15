import { prisma } from '../../data/postgres';
import { CreateTodoDto, TodoEntity, UpdateTodoDto } from '../../domain';
import { TodoDatasource } from '../../domain/datasources/todo.datasource';

export class TodoDatasourceImpl implements TodoDatasource {

    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        
        const newTodo = await prisma.todo.create({
            data: createTodoDto!
        });

        return TodoEntity.fromObject(newTodo);
    }

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();

        return todos.map(TodoEntity.fromObject);
    }

    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findUnique({
            where: {
                id
            }
        })

        if (!todo) throw `Todo with id ${id} not found`;

        return TodoEntity.fromObject(todo);
    }

    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {

        await this.findById(updateTodoDto.id);

        const updatedTodo = await prisma.todo.update({
            where: {
                id: updateTodoDto.id
            },
            data: updateTodoDto!.values
        });

        return TodoEntity.fromObject(updatedTodo)
    }

    async deleteById(id: number): Promise<TodoEntity> {
        await this.findById(id);

        const deletedTodo = await prisma.todo.delete({
            where: {
                id
            }
        });

        return TodoEntity.fromObject(deletedTodo);
    }

}