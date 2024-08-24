import { error } from "console";
import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto} from "../../domain/dtos";

const todos = [
    { id: 1, text: 'Buy milk', createdAt: new Date() },
    { id: 2, text: 'Buy milk', createdAt: null },
    { id: 3, text: 'Buy milk', createdAt: new Date() },

]

export class TodosController {
    //*DI
    constructor() { }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany();
        return res.json(todos)
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        const todo = await prisma.todo.findUnique({ where: { id: id } });
        // const todo = todos.find(todo => todo.id === id);
        (todo)
            ? res.json({ todo })
            : res.status(404).json({ error: `TODO with id ${id} not found` })
    }

    public createTodo = async (req: Request, res: Response) => {
        // const { text } = req.body

        const [error, createTodoDto] = CreateTodoDto.create(req.body)
        if (error) return res.status(400).json({error})
        // if (!text) return res.status(400).json({ error: 'Text property is required' });

        const todo = await prisma.todo.create({
            data: createTodoDto!
        })

        // const newTodo = {
        //     id: todos.length + 1,
        //     text: text,
        //     createdAt: null
        // }

        // todos.push(newTodo)
        res.json(todo)
    }

    public updateTodo = async (req: Request, res: Response) => {

        const id = +req.params.id

        // if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id}) 
        // const todo = todos.find(todo => todo.id === id);
        if(error) return res.status(400).json({error})
            // const { text, createdAt } = req.body;
        const todo = await prisma.todo.update({
            where: {id: id},
            data: updateTodoDto!.values
        })
        // if (!todo) return res.status(404).json({ error: `Todo wih id ${id} not found` });
        
        // todo.text = text || todo.text;
        // (createdAt == 'null')
        //     ? todo.createdAt = null
        //     : todo.createdAt = new Date(createdAt || todo.createdAt)
        res.json(todo)
    }

    public delteTodo = async (req: Request, res: Response) => {

        const id = +req.params.id
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });
        // const index = todos.findIndex(todo => todo.id === id);
        // if (index === -1) return res.status(404).json({ error: `Todo wih id ${id} not found` });
        // todos.splice(index, 1)
        const todo = await prisma.todo.delete({where: {id: id}})
        
        res.json(todo)
    }
}