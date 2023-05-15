import { StyleSheet,  View, ImageBackground } from 'react-native'
import { Button, Input } from "@rneui/themed";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import firebase from "firebase/app";

const UserSignUpScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [pswd, setPswd] = useState();
    const [grade, setGrade] = useState();
    const [school, setSchool] = useState();
    


    const Register = () => {
        auth
          .createUserWithEmailAndPassword(email, pswd)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
    
            user
              .updateProfile({
                displayName: name,
              })
              .then(() => {

                const newUser = {name, email, grade, school, created:firebase.firestore.Timestamp.fromDate(new Date())}
                db.collection("users").add(newUser)
                console.log("password:",pswd )

                console.log("Update successful");
                navigation.navigate('User Login')
                // ...
              })
              .catch((error) => {
                console.log("An error occurred when update", error);
                // ...
              });
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            console.log("An error occurred when creating", error);
          });
      };
    
  return (
    <ImageBackground source = {require('../assets/background3.png')} resizeMode="cover" style= 
    {{flex: 1, width: '100%', height:'100%'}}>
    
    <View style={{marginTop:230}}>
        
      <Input
        placeholder="Enter your name"
        leftIcon={{ type: "material", name: "badge" }}
        styles={styles}
        label="Name"
        onChangeText={setName}
      />

      <Input
        placeholder="Enter your email"
        leftIcon={{ type: "material", name: "email" }}
        styles={styles}
        label="Email"
        onChangeText={setEmail}
      />

      <Input
        placeholder="Enter your grade"
        leftIcon={{ type: "material", name: "e" }}
        styles={styles}
        label="Grade"
        onChangeText={setGrade}
        
      />

      <Input
        placeholder="Enter your school"
        leftIcon={{ type: "material", name: "school" }}
        styles={styles}
        label="School"
        onChangeText={setSchool}
        
      />

      <Input
        placeholder="Enter your password"
        leftIcon={{ type: "material", name: "lock" }}
        styles={styles}
        label="Password"
        onChangeText={setPswd}
        secureTextEntry
      />


      <View style={{alignItems:'center'}}>
      <Button 
      title="Sign up" 
      type = "outline"
      buttonStyle={{borderColor: 'rgba(39, 213, 245, 0.8)', backgroundColor: 'rgba(209, 248, 255, 0.8)', borderRadius: 15, borderWidth: 2 }} 
      titleStyle={{ color: 'rgba(39, 213, 245, 0.8)', fontWeight: 'bold', fontSize: 25 }} 
      onPress={Register} 
      style={{padding: 10, width:350}}/>

      <Button 
      title="Move to Login" 
      buttonStyle={{backgroundColor: 'rgba(39, 213, 245, 0.8)', borderRadius: 15 }} 
      titleStyle={{ fontWeight: 'bold', fontSize: 25 }} 
      icon={{name: 'arrow-right',type: 'font-awesome',size: 20,color: 'white',}}
      onPress={()=>navigation.navigate('User Login')} 
      style={{padding: 10, width:350, marginVertical:5}}/>
      </View>

    </View>
    </ImageBackground>
    
  )
}

export default UserSignUpScreen

const styles = StyleSheet.create({})
