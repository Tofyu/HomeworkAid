import { StyleSheet, Text, TextInput, View ,CheckBox} from 'react-native'
import React , { useState } from 'react'
import { Button, Input } from "@rneui/themed";

// import DateTimePicker from '@react-native-community/datetimepicker';

// import DatePicker from 'react-native-datepicker';

import {db} from '../firebase'
const AddRecurringEventScreen = () => {
    const [inputName, setInputName] = useState('');
    const [inputStart, setInputStart] = useState('');
    const [inputNotes, setInputNotes] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isSunday, setIsSunday] = useState(false);
    const [isMonday, setIsMonday] = useState(false);
    const [isTuesday, setIsTuesday] = useState(false);
    const [isWednesday, setIsWednesday] = useState(false);
    const [isThursday, setIsThursday] = useState(false);
    const [isFriday, setIsFriday] = useState(false);
    const [isSaturday, setIsSaturday] = useState(false);

    const addEvent = () => {
      const newEvent = {
        eventDate: inputStart,
        name: inputName,
        notes: inputNotes,
        recurring: true,
        isSunday: isSunday
      };
      db
        .collection("users")
        .doc("2IIxL4BkHNPdU2y6NVWl")
        .collection("recurringEvents")
        .add(newEvent)
        .then(() => {
          console.log("Event is added");
          
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
      {/* <TextInput>
        value={startDate}
        placeholder="Start Date: "
        onChangeText={text => setInputStart(text)}
      </TextInput> */}
      
      {/* <DateTimePicker
    testID="dateTimePicker"
    value={startDate}
    mode={'date'}
    is24Hour={true}
    display="default"
    
  /> */}

        
        
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
        <View style={{flexDirection:"row"}}>
        <CheckBox
          value={isSunday}
          onValueChange={() => setIsSunday(!isSunday)}
        />
        <Text>     Sunday</Text>
        </View>
        <View style={{flexDirection:"row"}}>
        <CheckBox
          value={isMonday}
          onValueChange={() => setIsMonday(!isMonday)}
        />
          <Text>     Monday</Text>
        </View>
        
        <View style={{flexDirection:"row"}}>
        <CheckBox
          value={isTuesday}
          onValueChange={() => setIsTuesday(!isTuesday)}
        />
          <Text>     Tuesday</Text>
        </View>
        <View style={{flexDirection:"row"}}>
        <CheckBox
          value={isWednesday}
          onValueChange={() => setIsWednesday(!isWednesday)}
        />
          <Text>     Wednesday</Text>
        </View>
        <View style={{flexDirection:"row"}}>
        <CheckBox
          value={isThursday}
          onValueChange={() => setIsThursday(!isThursday)}
        />
          <Text>     Thursday</Text>
        </View>
        <View style={{flexDirection:"row"}}>
        <CheckBox
          value={isFriday}
          onValueChange={() => setIsFriday(!isFriday)}
        />
          <Text>     Friday</Text>
        </View>
        <View style={{flexDirection:"row"}}>
        <CheckBox
          value={isSaturday}
          onValueChange={() => setIsSaturday(!isSaturday)}
        />
          <Text>     Saturday</Text>
        </View>
        
        
       
        
        
     
      <Button 
        title="Add Recurring Event" 
        buttonStyle={{ backgroundColor: 'rgba(39, 213, 245, 0.8)', borderRadius: 15 }} 
        titleStyle={{ fontWeight: 'bold', fontSize: 25 }} 
        //icon={{name: 'sign-in',type: 'font-awesome',size: 20,color: 'white',}}
        onPress={addEvent} 
        style={{ padding: 10, marginVertical: 5, width: 370 }} />

    </View>
    
  )
}

export default AddRecurringEventScreen

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
    flexDirection: 'column',
    marginBottom: 20,
  },
  label:{
    margin:8,
  }
})