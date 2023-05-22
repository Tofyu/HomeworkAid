import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, {useState, useEffect} from 'react'
import {db} from '../firebase'
import { Button, Input } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from "firebase/app";

const EditHomeworkScreen = ( {navigation} ) => {
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [startDate, setStartDate] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [type, setType] = useState('')
  const [subject, setSubject] = useState('')
  const [timeNeeded, setTimeNeeded] = useState('')
  const [priority, setPriority] = useState('')
  const [note, setNote] = useState('')


  useEffect(()=>{
    fetchData();
  }, [])

  const fetchData = () => {

    db.collection("users").doc("YEuRehNNhMMQdrsqGWyi").collection("homeworks").doc("BqwMYSdg5sG5uwoRfjkY").get().then((doc) => {
      if (doc.exists) {
          setTitle(doc.data().title)
          setStartDate(doc.data().startDate.toDate().toLocaleString())
          setDueDate(doc.data().dueDate.toDate().toLocaleString())
          setDifficulty(doc.data().difficulty)
          setType(doc.data().type)
          setTimeNeeded(doc.data().timeNeeded)
          setSubject(doc.data().subject)
          setPriority(doc.data().priority)
          setNote(doc.data().note)
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });

  }

  const editHomework = () => {
    db.collection("users").doc("YEuRehNNhMMQdrsqGWyi").collection("homeworks").doc("BqwMYSdg5sG5uwoRfjkY").update({ title: title, startDate: startDate, dueDate: dueDate, difficulty: difficulty, type: type, timeNeeded: timeNeeded, subject: subject, priority: priority, note: note }) 
    .then(() => { 
      console.log("Document successfully updated!"); 
      navigation.navigate("Home")
    })
     .catch((error) => { // The document probably doesn't exist. 
      console.error("Error updating document: ", error); });
  }


    return (
      <ImageBackground source = {require('../assets/background_bottom.png')} resizeMode="cover" style= 
      {{flex: 1, width: '100%', height:'100%'}}>
        <View styles={styles.content}>

          <Input
           style={styles.input} 
            placeholder="[Enter Title]"
            label="Title"
            value = {title}
            onChangeText = {setTitle}
          />
         
          <Input
           style={styles.input} 
            placeholder="[Enter Start Date MM DD, YY]"
            label="Start Date"
            value = {startDate}
            onChangeText = {setStartDate}
          />
        
          <Input
           style={styles.input} 
            placeholder="[Enter Due Date MM DD, YY]"
            label="Due Date"
            value = {dueDate}
            onChangeText = {setDueDate}
          />
        
         <Input
          style={styles.input} 
            placeholder="[Enter number 1 (lowest) - 5 (highest)]"
            label="Difficulty"
            value = {difficulty}
            onChangeText = {setDifficulty}
            keyboardType = "numeric"
          />

        <Input
         style={styles.input} 
            placeholder="[Enter Type]"
            label="Type"
            value = {type}
            onChangeText = {setType}
          />
          
        <Input
         style={styles.input} 
            placeholder="[Enter Subject]"
            label="Subject"
            value = {subject}
            onChangeText = {setSubject}
          />

        <Input
         style={styles.input} 
            placeholder="[Enter number of minutes needed]"
            label="Time Needed"
            value = {timeNeeded}
            onChangeText = {setTimeNeeded}
          />

        <Input
         style={styles.input} 
            placeholder="[Enter number 1 (lowest) - 5 (highest)]"
            label="Priority"
            value = {priority}
            onChangeText = {setPriority}
            keyboardType = "numeric"
          />

        <Input
         style={styles.input} 
            placeholder="[Any notes or reminders?]"
            label="Notes"
            value = {note}
            onChangeText = {setNote}
          />

<View style={styles.buttonContainer}>
          <Button 
        title="Edit Homework" 
        buttonStyle={{ backgroundColor: 'rgba(39, 213, 245, 0.8)', borderRadius: 15 }} 
        titleStyle={{ fontWeight: 'bold', fontSize: 15 }} 
        icon={{name: 'pencil-square',type: 'font-awesome',size: 15,color: 'white',}}
        onPress={editHomework} 
        style={{ padding: 10, marginVertical: 5, width: 200 }} />

<Button 
        title="Cancel" 
        buttonStyle={{ backgroundColor: 'rgba(39, 213, 245, 0.8)', borderRadius: 15 }} 
        titleStyle={{ fontWeight: 'bold', fontSize: 15 }} 
        icon={{name: 'arrow-circle-left',type: 'font-awesome',size: 15,color: 'white',}}
        onPress={() => navigation.navigate('Home')}
        style={{ padding: 10, marginVertical: 5, width: 200 }} />
          </View>
        </View>
        </ImageBackground>
  )
}

export default EditHomeworkScreen

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
  },
  text2:{
    fontSize: 15,
    letterSpacing: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    marginTop:60,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 2,
    // Adjust the height and font size to make the input smaller
    height: 30,
    fontSize: 14,
  },
  buttonContainer: {
    flex:1,
    flexDirection:'row',
    marginTop: 20,
    justifyContent:'space-around'

  },
  button: {
    marginBottom: 10,
    width: 200,
  },
})
