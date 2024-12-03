import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.103:8000/tasks/'; // Alterar o IP para o do seu local

export interface Task {
    id: number;
    titulo: string;
    descricao: string;
    concluida: boolean;
}

export const getTasks = async (): Promise<Task[]> => {
    const response = await fetch(`${API_BASE_URL}get-tasks/`)
    if (!response.ok) {
        throw new Error('Erro ao buscar tarefas');
    }
    const data = await response.json();
        return data;
};

export const criarTarefaPorRelato = async (relato: string): Promise<any> => {
    try {
        const response = await fetch(`${API_BASE_URL}create-from-relato/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ relato }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro ao criar tarefa');
        }

        const data = await response.json();
        console.log('Tarefa criada:', data);
        return data;
    } catch (error) {
        console.error('Erro ao criar tarefa por relato:', error);
        throw error;
    }
};

export const updateTask = async (id: number, titulo: string, descricao: string, p0: boolean): Promise<Task> => {
    const response = await axios.patch(`${API_BASE_URL}${id}/`, { titulo, descricao });
    return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
    const response = await axios.delete(`${API_BASE_URL}${id}/`);
    return response.data;
};

export const toggleCompleteTask = async (id: number, concluida: boolean): Promise<Task> => {
    const response = await axios.patch(`${API_BASE_URL}${id}/`, { concluida });
    return response.data;
};
