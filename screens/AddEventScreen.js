import { StyleSheet, Text, TextInput, View, CheckBox, Switch, Button } from 'react-native'
import React , { useState } from 'react'
import {db} from '../firebase'
const AddEventScreen = () => {
    const [inputName, setInputName] = useState('');
    const [inputStart, setInputStart] = useState('');
    const [inputNotes, setInputNotes] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    const addEvent = () => {
      const newEvent = {
        eventDate: inputStart,
        name: inputName,
        notes: inputNotes,
        recurring: false
      };
      db
        .collection("users")
        .doc("2IIxL4BkHNPdU2y6NVWl")
        .collection("events")
        .add(newEvent)
        .then(() => {
          console.log("Event is added");
          
        });
    };

  return (
    <View>
        
      <Text>AddEventScreen</Text>
       <TextInput
        value={inputName}
        placeholder="Name: "
        onChangeText={text => setInputName(text)} 
      />
      {/* <DatePicker selected={startTime} onChange={(date) => setStartTime(date)} />
      <DatePicker selected={endTime} onChange={(date) => setEndTime(date)} />   */}
       <TextInput
        value={inputStart}
        placeholder="Start Date: "
        onChangeText={text => setInputStart(text)}
      />
      <TextInput
        value={inputNotes}
        placeholder="Notes "
        onChangeText={text => setInputNotes(text)}
      />
      
      <Button colorScheme="blue" placeholder="Add Event " onPress={addEvent} ml={3}></Button>
    </View>
    
  )
}

export default AddEventScreen

const styles = StyleSheet.create({
  title:{
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: 2,
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  label:{
    margin:8,
  }
})