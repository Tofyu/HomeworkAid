import { StyleSheet, Text, TextInput, View, CheckBox, Switch } from 'react-native'
import React , { useState } from 'react'
import { Button, Input } from '@rneui/themed';
import DatePicker from 'react-native-datepicker';
import {db} from '../firebase'

const AddEventScreen = () => {
  const [inputName, setInputName] = useState('');
  const [inputStart, setInputStart] = useState('');
  const [inputNotes, setInputNotes] = useState('');

  const addEvent = () => {
    const newEvent = {
      eventDate: inputStart,
      name: inputName,
      notes: inputNotes,
      recurring: false,
    };
    db.collection('users')
      .doc('2IIxL4BkHNPdU2y6NVWl')
      .collection('events')
      .add(newEvent)
      .then(() => {
        console.log('Event is added');
      });
  };

  return (
    <View>
      <Text style={styles.title}>AddEventScreen</Text>
      <Input
        style={styles.input}
        size="small"
        placeholder="[Enter Event Name]"
        value={inputName}
        onChangeText={(text) => setInputName(text)}
      />
      <DatePicker
        style={styles.datePicker}
        date={inputStart}
        mode="date"
        placeholder="[Select Event Start Date]"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            right: 0,
            top: 4,
          },
          dateInput: {
            borderWidth: 0,
          },
        }}
        onDateChange={(date) => setInputStart(date)}
      />
      <Input
        style={styles.input}
        size="small"
        value={inputNotes}
        placeholder="[Enter Event Notes]"
        onChangeText={(text) => setInputNotes(text)}
      />
      <Button
        title="Add Schedule"
        buttonStyle={{ backgroundColor: 'rgba(39, 213, 245, 0.8)', borderRadius: 15 }}
        titleStyle={{ fontWeight: 'bold', fontSize: 16 }}
        icon={{ name: 'calendar', type: 'font-awesome', size: 15, color: 'white' }}
        onPress={addEvent}
        style={{ padding: 10, marginVertical: 5, width: 370 }}
      />
    </View>
  );
};

export default AddEventScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: 2,
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    marginTop: 120,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 2,
    height: 30,
    fontSize: 14,
  },
  datePicker: {
    width: 200,
  },
});
