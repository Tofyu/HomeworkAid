import { StyleSheet, Text, TextInput, View } from 'react-native'
import React , { useState, useEffect } from 'react'
import {db} from '../firebase'
import { Button, Input } from "@rneui/themed";

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
            <Text style = {styles.title}>Edit Event Screen</Text>


            <Input
        style = {styles.input}
        size="small"
        placeholder="[Enter Event Name]"
        value={inputName}
        onChangeText={text => setInputName(text)} 
      />
       <Input
        style={styles.input}
        size="small"
        value={inputStart}
        placeholder="[Enter Event Start Date] "
        onChangeText={text => setInputStart(text)}
      />
      <Input
        style={styles.input}
        size="small"
        value={inputNotes}
        placeholder="[Enter Event Notes]"
        onChangeText={text => setInputNotes(text)}
      />
      
      <Button title="Update Event" 
        buttonStyle={{ backgroundColor: 'rgba(39, 213, 245, 0.8)', borderRadius: 15 }} 
        titleStyle={{ fontWeight: 'bold', fontSize: 16 }} 
        icon={{name: 'calendar',type: 'font-awesome',size: 15,color: 'white',}}
        onPress={updateEvent} 
        style={{ padding: 10, marginVertical: 5, width: 370 }} />
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