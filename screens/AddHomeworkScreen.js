import { StyleSheet, Button, TextInput, View } from 'react-native'
import React, {useState} from 'react'
import {firestore} from '../firebase'

const AddHomeworkScreen = () => {
  const [title, setTitle] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [type, setType] = useState('')
  const [subject, setSubject] = useState('')
  const [timeNeeded, setTimeNeeded] = useState('')
  const [priority, setPriority] = useState('')
  const [note, setNote] = useState('')


  const addHomework = () => {
    console.log("Added homework succesfully!")
  }

    return (
        <View>
          <Text> Add Homework Screen</Text>

          <TextInput
            placeholder="Title"
            label="Title"
            value = {title}
            onChangeText = {setTitle}
          />
         
         <TextInput
            placeholder="Difficulty"
            label="Difficulty"
            value = {difficulty}
            onChangeText = {setDifficulty}
          />

        <TextInput
            placeholder="Type"
            label="Type"
            value = {type}
            onChangeText = {setType}
          />
          
        <TextInput
            placeholder="Subject"
            label="Subject"
            value = {subject}
            onChangeText = {setSubject}
          />

        <TextInput
            placeholder="Time Needed"
            label="Time Needed"
            value = {timeNeeded}
            onChangeText = {setTimeNeeded}
          />

        <TextInput
            placeholder="Priority"
            label="Priority"
            value = {priority}
            onChangeText = {setPriority}
          />

        <TextInput
            placeholder="Notes"
            label="Notes"
            value = {note}
            onChangeText = {setNote}
          />

          <View style={{alignItems:'center'}}>
          <Button title="Add Homework" onPress={addHomework} />
          <Button title="Cancel" onPress={()=>navigation.navigate('Home')}/>
          </View>
        </View>
  )
}

export default AddHomeworkScreen

const styles = StyleSheet.create({})