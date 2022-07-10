import { GetServerSideProps } from 'next';
import { FormEvent, Key, useEffect, useState } from 'react';
import { prisma } from '../../lib/prisma';

type Task = {
    id: Key,
    title: String,
    isDone: Boolean,
    date: String,
}

type TaskProps = {
    tasks: Task[]
}

export const getServerSideProps: GetServerSideProps = async () => {
    const tasks = await prisma.task.findMany();

    const data = tasks.map((task: any) => {
        return {
            id: task.id,
            title: task.title,
            isDone: task.isDone,
            date: task.createdAt.toISOString(),
        }
    });

    return {
        props: {
            tasks: data
        }
    }
}

export default function App({ tasks }: TaskProps) {

    const [newTask, setNewTask] = useState('');
    const [tasksS, setTasksS] = useState<any>();

    useEffect(() => {
        setTasksS(tasks);
    }, []);

    async function handleCreateTask(event : FormEvent){
        event.preventDefault();

        const result = await fetch('http://localhost:3000/api/tasks/create', {
            method: 'POST',
            body: JSON.stringify({ title: newTask }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        setNewTask('');
        //setTasksS([...tasks, result]);
    }

    return (
        <div>
            <h1 className='text-5xl'>Tasks</h1>
            {/*
                <button onClick={()  => signOut({ redirect... })}>Sair</button>
            */}
            
            <ul>
                {tasksS?.map((task: any) => <li className='text-2xl' key={task.id}>{task.title}</li>)}
            </ul>
            <form onSubmit={handleCreateTask}>
                <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)} />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}