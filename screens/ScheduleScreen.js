import { StyleSheet, Button, Text, TextInput, View, SectionList, SafeAreaView} from 'react-native'
import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import firebase from "firebase/app";

const ScheduleScreen = () => {
    const [homeworks, setHomeworks] = useState([])
    
    useEffect(()=>{
      fetchData();
    }, [])
  
    const Item = ({ name }) => (
      <View style={{ padding: 20 }}>
        <Text>{name}</Text>
      </View>
    );
    
    const SectionHeader = ({ dueDate }) => (
      <View style={{ backgroundColor: '#f2f2f2', padding: 10 }}>
        <Text>{dueDate}</Text>
      </View>
    );

    const fetchData = () => {
  
    console.log('2 useEffect start')
    let activitiesFromDB = [];
    db.collection("users").doc("YEuRehNNhMMQdrsqGWyi").collection("homeworks")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          activitiesFromDB.push({ id: doc.id, ...doc.data() });
        });
        console.log('3 useEffect finish db')
      })
        db.collection("users").doc("YEuRehNNhMMQdrsqGWyi").collection("events")
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
            activitiesFromDB.push({ id: doc.id, title:doc.data().name, dueDate:doc.data().eventStart });
          });
          console.log('3.0 useEffect finish db')
       
          console.log("3.1 *******************", activitiesFromDB)
          const groupedData = activitiesFromDB.reduce((acc, cur) => {
            let options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            const dueDate = cur.dueDate.toDate().toLocaleString(undefined, options); // format to date only;
            const item = { id: cur.id, name: cur.title, time: cur.dueDate.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
            const group = acc.find(group => group.dueDate === dueDate);
            if (!group) {
              acc.push({ dueDate, data: [item] });
            } else {
              group.data.push(item);
            }
            return acc;
          }, []);

          console.log("3.2************", groupedData)
        setHomeworks(groupedData);
        console.log('4 useEffect end')
      })  
        }

    const renderItem = ({ item }) => <Item name={item.name + "            " + item.time} />;
    const renderSectionHeader = ({ section: { dueDate } }) => <SectionHeader dueDate={dueDate} />;

    return (
      
      <SectionList 
      
      sections={homeworks}
      keyExtractor={(item, index) => item.id + index}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      
    />
    
      
    )
}

export default ScheduleScreen

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
    paddingTop: 5,
    paddingBottom: 5,
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
