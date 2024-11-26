import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TaskDetailScreen = () => {
    const route = useRoute();
    const { taskId, title, description, completed } = route.params;
    const { fetchData } = route.params;
    const navigation = useNavigation();

    // Estados locais para edição
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedDescription, setEditedDescription] = useState(description);

    // Função para salvar a edição
    const handleSave = async () => {
        try {
            const response = await fetch(`http://192.168.1.103:8000/api/tasks/${taskId}/`, {
                method: "PUT", // Use PUT ou PATCH
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: editedTitle,
                    description: editedDescription,
                }),
            });

            if (response.ok) {
                alert("Tarefa alterada com sucesso!");
                if (fetchData) {
                    fetchData(); // Atualiza a lista de tarefas
                }
                navigation.goBack(); // Volta para a Home
            } else {
                alert("Erro ao alterar a tarefa.");
            }
        } catch (error) {
            console.error("Erro ao salvar a alteração da tarefa:", error);
            alert("Erro ao salvar a alteração da tarefa.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Editar Tarefa</Text>
            <TextInput
                style={styles.input}
                value={editedTitle}
                onChangeText={setEditedTitle}
                placeholder="Título"
            />
            <TextInput
                style={styles.input}
                value={editedDescription}
                onChangeText={setEditedDescription}
                placeholder="Descrição"
                multiline
            />
            <Button title="Salvar Alterações" onPress={handleSave} />
        </View>
    );
};

// Estilização da Tela de Detalhes
const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
});

export default TaskDetailScreen;
