import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const CreateTaskScreen = ({ route, navigation }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { fetchData } = route.params;

    const handleCreateTask = async () => {
        try {
            const response = await fetch("http://192.168.1.103:8000/api/tasks/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                    completed: false, // Nova tarefa sempre começa como "não concluída"
                }),
            });

            if (response.ok) {
                alert("Tarefa criada com sucesso!");
                if (fetchData) {
                    fetchData(); // Atualiza a lista de tarefas
                }
                navigation.goBack(); // Volta para a Home
            } else {
                alert("Erro ao criar a tarefa.");
            }
        } catch (error) {
            console.error("Erro ao criar a tarefa:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Título</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o título"
                value={title}
                onChangeText={setTitle}
            />

            <Text style={styles.label}>Descrição</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite a descrição"
                value={description}
                onChangeText={setDescription}
                multiline
            />

            <Button title="Criar Tarefa" onPress={handleCreateTask} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
});

export default CreateTaskScreen;
