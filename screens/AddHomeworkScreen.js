import { StyleSheet, Text, View, ImageBackground, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { auth, db } from '../firebase'
import { Button, Input, Slider } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from "firebase/app";

const AddHomeworkScreen = ({ navigation }) => {
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date())
  const [difficulty, setDifficulty] = useState('')
  const [type, setType] = useState('')
  const [subject, setSubject] = useState('')
  const [timeNeeded, setTimeNeeded] = useState('')
  const [priority, setPriority] = useState('')
  const [note, setNote] = useState('')

  const userID = auth.currentUser.uid;

  const addHomework = () => {
    db.collection("users").doc(userID).collection("homeworks").add({
      title: title,
      difficulty: difficulty,
      startDate: firebase.firestore.Timestamp.fromDate(new Date(Date.parse(startDate))),
      dueDate: firebase.firestore.Timestamp.fromDate(new Date(Date.parse(dueDate))),
      type: type,
      subject: subject,
      timeNeeded: timeNeeded,
      priority: priority,
      note: note

    })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        console.log("Added homework succesfully!")
        navigation.navigate('Home')
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  const handleSliderChange = (value) => {
    const newDifficulty = Number(value); // Convert the value to a number
    setDifficulty(newDifficulty);
  };

  const handleSliderChange2 = (value) => {
    const newPriority = Number(value); // Convert the value to a number
    setPriority(newPriority);
  };

  return (
    <SafeAreaView>
      <View styles={styles.content}>
        <Input
          style={styles.input}
          placeholder="[Enter Title]"
          label="Title"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.text2}> Start Date </Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={startDate}
          mode="date"
          is24Hour={true}
          display="default"
        />

        <Text style={styles.text2}> Due Date </Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={dueDate}
          mode="date"
          is24Hour={true}
          display="default"
        />

        <Input
          style={styles.input}
          placeholder="[Enter Type]"
          label="Type"
          value={type}
          onChangeText={setType}
        />

        <Input
          style={styles.input}
          placeholder="[Enter Subject]"
          label="Subject"
          value={subject}
          onChangeText={setSubject}
        />

        <Input
          style={styles.input}
          placeholder="[Enter number of minutes needed]"
          label="Time Needed"
          value={timeNeeded}
          onChangeText={setTimeNeeded}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.text2}>Difficulty</Text>
          <Slider
            style={styles.slider}
            value={difficulty}
            minimumValue={1}
            maximumValue={5}
            step={1}
            onValueChange={handleSliderChange}
            thumbStyle={{ height: 20, width: 20 }}
          />
          <Text style={[styles.input, { marginLeft: 10 }]}>{difficulty}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.text2}>Priority</Text>
          <Slider
            style={styles.slider}
            value={priority}
            minimumValue={1}
            maximumValue={5}
            step={1}
            onValueChange={handleSliderChange2}
            thumbStyle={{ height: 20, width: 20 }}
          />
          <Text style={[styles.input, { marginLeft: 10 }]}>{priority}</Text>
        </View>

        <Input
          style={styles.input}
          placeholder="[Any notes or reminders?]"
          label="Notes"
          value={note}
          onChangeText={setNote}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Add Homework"
            buttonStyle={{ backgroundColor: 'rgba(39, 213, 245, 0.8)', borderRadius: 15 }}
            titleStyle={{ fontWeight: 'bold', fontSize: 15 }}
            icon={{ name: 'pencil-square', type: 'font-awesome', size: 15, color: 'white', }}
            onPress={addHomework}
            style={{ padding: 10, marginVertical: 5, width: 200 }} />

          <Button
            title="Cancel"
            buttonStyle={{ backgroundColor: 'rgba(39, 213, 245, 0.8)', borderRadius: 15 }}
            titleStyle={{ fontWeight: 'bold', fontSize: 15 }}
            icon={{ name: 'arrow-circle-left', type: 'font-awesome', size: 15, color: 'white', }}
            onPress={() => navigation.navigate('Home')}
            style={{ padding: 10, marginVertical: 5, width: 200 }} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AddHomeworkScreen

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: 2,
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'center'
  },
  text2: {
    marginBottom: 3,
    paddingHorizontal: 5,
    fontSize: 16,
    color: 'rgb(134, 147, 158)',
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    marginTop: 60,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 2,
    // Adjust the height and font size to make the input smaller
    height: 30,
    fontSize: 14,
    fontWeight: 'bold'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around'

  },
  button: {
    marginBottom: 10,
    width: 200,
  },
  slider: {
    width: '60%',
    height: 10
  },
})
