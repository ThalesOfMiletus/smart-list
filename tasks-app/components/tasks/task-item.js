import { TouchableOpacity, Text, StyleSheet, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TaskItem = ({ id, title, description, onDelete }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.card}>
            {/* Navegação para detalhes da tarefa */}
            <TouchableOpacity
                style={styles.touchable}
                onPress={() => navigation.navigate("Tasks", { taskId: id, title, description })}
            >
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </TouchableOpacity>

            {/* Botão de excluir */}
            <Button
                title="Excluir"
                color="red"
                onPress={() => onDelete(id)} // Chama a função passada como prop
            />
        </View>
    );
};

// Estilização do Card/Item
const styles = StyleSheet.create({
    card: {
        backgroundColor: "gray",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
    },
    touchable: {
        marginBottom: 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 16,
    },
    description: {
        fontSize: 14,
        color: "#666",
    },
});

export default TaskItem;
