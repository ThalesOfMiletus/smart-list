import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CreateTaskScreen from './screens/CreateTaskScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => (
  <Stack.Navigator initialRouteName="Login">
    {/* Definindo a tela de Login como inicial */}
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: true }} />
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="CreateTask" component={CreateTaskScreen} options={{ headerShown: true }} />
  </Stack.Navigator>
);

export default AppNavigator;




export type RootStackParamList = {
  Home: undefined;
  TaskList: undefined;
  CreateTask: undefined;
};