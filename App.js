import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserSignUpScreen from './screens/UserSignUpScreen';
import UserLoginScreen from './screens/UserLoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import EditHomeworkScreen from './screens/EditHomeworkScreen';
import AddHomeworkScreen from './screens/AddHomeworkScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import EditEventScreen from './screens/EditEventScreen';
import EditRecurringEventScreen from './screens/EditRecurringEventScreen';
import AddEventScreen from './screens/AddEventScreen';
import AddRecurringEventScreen from './screens/AddRecurringEventScreen';

const HomeworkStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Edit Homework" component={EditHomeworkScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Add Homework" component={AddHomeworkScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

const ScheduleStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Schedule" component={ScheduleScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Edit Event" component={EditEventScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Edit Recurring Event" component={EditRecurringEventScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Add Event" component={AddEventScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Add Recurring Event" component={AddRecurringEventScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

const BottomTab = () =>{
  const Tab = createBottomTabNavigator();

  return(
    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        />
        <Tab.Screen name="Homework" component={HomeworkStack} options={{
          headerShown: false,
          tabBarLabel: 'Homework',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-open-variant" color={color} size={size} />
          ),
        }}
        />
        <Tab.Screen name="Schedule" component={ScheduleStack} options={{
          headerShown: false,
          tabBarLabel: 'Schedule',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-arrow-right" color={color} size={size} />
          ),
        }}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
        />
      </Tab.Navigator>
  )
}

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="User Login" component={UserLoginScreen} options={{headerShown:false}}/>
      <Stack.Screen name="User Register" component={UserSignUpScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="User BottomTab" component={BottomTab} options={{headerShown:false}}/>
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})
