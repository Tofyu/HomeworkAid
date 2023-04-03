import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, ImageBackground  } from "react-native";
import { Button, Input } from "@rneui/themed";
import { auth, db } from "../firebase";

const UserLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  

  //Login function
  const login = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        // navigation.navigate("User BottomTab")
          console.log("Logged in", user)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Log in failed", error)
        alert("Wrong password");
      });
  };

  return (
    
    <View style={{marginTop:230}}> 
      <Input
        placeholder="Enter your email"
        leftIcon={{ type: "material", name: "email" }}
        styles={styles}
        label="Email"
        onChangeText={setEmail}
      />

      <Input
        placeholder="Enter your password"
        leftIcon={{ type: "material", name: "lock" }}
        style={styles}
        label="Password"
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={{alignItems:'center'}}>
        <Button 
        title="Login" 
        buttonStyle={{ backgroundColor: 'rgba(39, 213, 245, 0.8)', borderRadius: 15 }} 
        titleStyle={{ fontWeight: 'bold', fontSize: 25 }} 
        icon={{name: 'sign-in',type: 'font-awesome',size: 20,color: 'white',}}
        onPress={login} 
        style={{ padding: 10, marginVertical: 5, width: 370 }} />

        <Button 
        title="Create Account" 
        buttonStyle={{backgroundColor: 'rgba(39, 213, 245, 0.8)', borderRadius: 15 }} 
        titleStyle={{ fontWeight: 'bold', fontSize: 25 }} 
        icon={{name: 'user-plus',type: 'font-awesome',size: 20,color: 'white',}}
        onPress={() => navigation.navigate("User Register")} 
        style={{padding: 10, width: 370 }} />
      </View>
    </View>
    
  )
}

export default UserLoginScreen

const styles = StyleSheet.create({})
