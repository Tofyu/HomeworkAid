import { StyleSheet, Text, View,  ImageBackground } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Button, Input } from "@rneui/themed";
import { auth, db } from "../firebase";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({})
  const [grade, setGrade] = useState()
  const [school, setSchool] = useState()

  useEffect(()=> {
    db.collection("users").doc("6RVMkgLe9IaCmmptxu3F").get().then((doc) => {
      let data = {userID: doc.id, ...doc.data()}
      console.log(data)
      setUser(data)
    })
  }, [])

  useEffect(() => {
    console.log("user: " + user + "\n")
  })

const save = () => {db.collection("users").doc("6RVMkgLe9IaCmmptxu3F").update({ grade: grade, school: school })
 .then(() => { console.log("Document successfully updated!"); }) 
 .catch((error) => {console.error("Error updating document: ", error); });}

  return (
    <ImageBackground source = {require('../assets/background_bottom.png')} resizeMode="cover" style= 
    {{flex: 1, width: '100%', height:'100%'}}>

    <View>
      <Text style ={styles.title}>Your Profile</Text>
      <Text style  ={styles.text1}>{user.grade + "th grade"}</Text>
      
      <Input
      placeholder="Enter New Grade"
      onChangeText={setGrade}
      value={grade}
      />

      <Text style  ={styles.text1}>{user.school}</Text>

      <Input
      placeholder="Enter new school"
      onChangeText={setSchool}
      value={school}
      />

      <Button 
        title="Save" 
        buttonStyle={{ backgroundColor: 'rgba(39, 213, 245, 0.8)', borderRadius: 15 }} 
        titleStyle={{ fontWeight: 'bold', fontSize: 25 }} 
        //icon={{name: 'sign-in',type: 'font-awesome',size: 20,color: 'white',}}
        onPress={save} 
        style={{ padding: 10, marginVertical: 5, width: 370 }} />

      

      
    </View>
    </ImageBackground>
  )
}

export default ProfileScreen

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

