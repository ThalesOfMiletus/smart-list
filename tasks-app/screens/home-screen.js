import React from "react";
import { View, Button, StyleSheet } from "react-native";
import TaskList from "../components/tasks/task-list";

const HomeScreen = ({ navigation }) => {
    const [data, setData] = React.useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch("http://192.168.1.103:8000/api/tasks/");
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            {/* Lista de Tarefas */}
            <TaskList data={data} fetchData={fetchData} />

            {/* Botão para Criar Nova Tarefa */}
            <Button
                title="Nova Tarefa"
                onPress={() => navigation.navigate("CreateTask", { fetchData })}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});

export default HomeScreen;
