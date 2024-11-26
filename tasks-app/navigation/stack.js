import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/home-screen";
import TaskDetailScreen from "../screens/task-detail-screen";
import CreateTaskScreen from "../screens/CreateTaskScreen";

const Stack = createStackNavigator();

export const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Tasks" component={TaskDetailScreen} />
            <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
        </Stack.Navigator>
    );
}

