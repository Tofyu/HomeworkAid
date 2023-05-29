import { StyleSheet, Text, TextInput, View} from 'react-native'
import React , { useState } from 'react'
import { Button, Input,CheckBox } from "@rneui/themed";

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
        isSunday: isSunday,
        isMonday: isMonday,
        isTuesday: isTuesday,
        isWednesday: isWednesday,
        isThursday: isThursday,
        isFriday: isFriday,
        isSaturday: isSaturday
      };
      db
        .collection("users")
        .doc("2IIxL4BkHNPdU2y6NVWl")
        .collection("recurringEvents")
        .add(newEvent)
        .then(() => {
          console.log("Recurring Event is added");
          
        });
    };

  return (
    <View>
        
      <Text style = {styles.title}>AddRecurringEventScreen</Text>
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
        <View style={{flexDirection:"row"}}>
        <CheckBox
          title="Sunday"
          value={isSunday}
          onValueChange={() => setIsSunday(!isSunday)}
        />
        </View>
        <View style={{flexDirection:"row"}}>
        <CheckBox
          title="Monday"
          value={isMonday}
          onValueChange={() => setIsMonday(!isMonday)}
        />
        </View>
        
        <View style={{flexDirection:"row"}}>
        <CheckBox
          title="Tuesday"
          value={isTuesday}
          onValueChange={() => setIsTuesday(!isTuesday)}
        />
        </View>
        <View style={{flexDirection:"row"}}>
        <CheckBox
          title="Wednesday"
          value={isWednesday}
          onValueChange={() => setIsWednesday(!isWednesday)}
        />
        </View>
        <View style={{flexDirection:"row"}}>
        <CheckBox
          title="Thursday"
          value={isThursday}
          onValueChange={() => setIsThursday(!isThursday)}
        />
        </View>
        <View style={{flexDirection:"row"}}>
        <CheckBox
          title="Friday"
          value={isFriday}
          onValueChange={() => setIsFriday(!isFriday)}
        />
        </View>
        <View style={{flexDirection:"row"}}>
        <CheckBox
          title="Saturday"
          value={isSaturday}
          onValueChange={() => setIsSaturday(!isSaturday)}
        />
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
