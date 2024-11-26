/*task-list.js*/
import { View, Text, FlatList, RefreshControl, StyleSheet } from "react-native";
import TaskItem from "../tasks/task-item";

const TaskList = ({ data, fetchData }) => {
    const handleDelete = async (taskId) => {
        try {
            const response = await fetch(`http://192.168.1.103:8000/api/tasks/${taskId}/`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Tarefa excluída com sucesso!");
                if (fetchData) {
                    fetchData(); // Atualiza a lista após exclusão
                }
            } else {
                alert("Erro ao excluir a tarefa.");
            }
        } catch (error) {
            console.error("Erro ao excluir a tarefa:", error);
        }
    };

    const renderItem = ({ item }) => (
        <TaskItem
            id={item.id}
            title={item.title}
            description={item.description}
            onDelete={handleDelete}
        />
    );

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
        />
    );
};



// Estilização da Lista
const styles = StyleSheet.create({
    list: {
        padding: 10,
    },
});

export default TaskList;
