import { StyleSheet, Button, Text, TextInput, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import {db} from '../firebase'
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
        <View>
          <Text style={styles.text1} > Title </Text>
          <TextInput
           style={styles.text2} 
            placeholder="[Enter Title]"
            label="Title"
            value = {title}
            onChangeText = {setTitle}
          />
         
         <Text style={styles.text1} > Start Date </Text>
          <TextInput
           style={styles.text2} 
            placeholder="[Enter Start Date MM DD, YY]"
            label="Start Date"
            value = {startDate}
            onChangeText = {setStartDate}
          />
        

         <Text style={styles.text1} > Due Date </Text>
          <TextInput
           style={styles.text2} 
            placeholder="[Enter Due Date MM DD, YY]"
            label="Due Date"
            value = {dueDate}
            onChangeText = {setDueDate}
          />
        
         <Text style={styles.text1} > Difficulty </Text>
         <TextInput
          style={styles.text2} 
            placeholder="[Enter number 1 (lowest) - 5 (highest)]"
            label="Difficulty"
            value = {difficulty}
            onChangeText = {setDifficulty}
            keyboardType = "numeric"
          />

        <Text style={styles.text1} > Type </Text>
        <TextInput
         style={styles.text2} 
            placeholder="[Enter Type]"
            label="Type"
            value = {type}
            onChangeText = {setType}
          />
          
          <Text style={styles.text1} > Subject </Text>  
        <TextInput
         style={styles.text2} 
            placeholder="[Enter Subject]"
            label="Subject"
            value = {subject}
            onChangeText = {setSubject}
          />

        <Text style={styles.text1} > Time Needed </Text>  
        <TextInput
         style={styles.text2} 
            placeholder="[Enter number of minutes needed]"
            label="Time Needed"
            value = {timeNeeded}
            onChangeText = {setTimeNeeded}
          />

        <Text style={styles.text1} > Priority </Text>  
        <TextInput
         style={styles.text2} 
            placeholder="[Enter number 1 (lowest) - 5 (highest)]"
            label="Priority"
            value = {priority}
            onChangeText = {setPriority}
            keyboardType = "numeric"
          />

        <Text style={styles.text1} > Notes </Text> 
        <TextInput
         style={styles.text2} 
            placeholder="[Any notes or reminders?]"
            label="Notes"
            value = {note}
            onChangeText = {setNote}
          />

          <View style={{alignItems:'center'}}>
          <Button 
          buttonStyle={{ backgroundColor: 'rgba(39, 213, 245, 0.8)', borderRadius: 15 }} 
          titleStyle={{ fontWeight: 'bold', fontSize: 25 }} 
          style={{ padding: 10, marginVertical: 5, width: 370 }}
          title="Edit Homework" onPress={editHomework} />

          <Button 
          buttonStyle={{ backgroundColor: 'rgba(39, 213, 245, 0.8)', borderRadius: 15 }} 
          titleStyle={{ fontWeight: 'bold', fontSize: 25 }} 
          style={{ padding: 10, marginVertical: 5, width: 370 }}
          title="Cancel" onPress={()=>navigation.navigate('Home')}/>
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
  }
})
