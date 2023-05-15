import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import React , { useState, useEffect } from 'react'
import {db} from '../firebase'
// import DatePicker from 'react-native-datepicker';


const EditEventScreen = () => {
    const [inputName, setInputName] = useState('');
    const [inputStart, setInputStart] = useState('');
    const [inputNotes, setInputNotes] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    const event = 
    {
        eventID: "j5chR4rmim2qrR67cVY8",
        eventDate: "Sunday",
        name: "Elliot",
        notes: "aaa",
        }


    useEffect(()=> {
      setInputName(event.name)
      setInputStart(event.eventDate)
      setInputNotes(event.notes)
    }, [])  
    const updateEvent = () => {
        const updatedEvent = {
          eventDate: inputStart,
          name: inputName,
          notes: inputNotes,
          
        };
        db
          .collection("users")
          .doc("2IIxL4BkHNPdU2y6NVWl")
          .collection("events")
          .doc(event.eventID)
          .update(updatedEvent)
          .then(() => {
            console.log("Event has been changed");
            
          });
      };
  return (
    <View>
            <Text style = {styles.title}>AddRecurringEventScreen</Text>

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
      
      <Button colorScheme="red" placeholder="Save Changes " onPress={updateEvent} ml={3}></Button>
    </View>
  )
}

export default EditEventScreen

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
  text1:{
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    justifyContent: 'center'
  }
})