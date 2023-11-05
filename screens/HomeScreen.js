import { StyleSheet, Text, View, FlatList, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
// import ReactDropdown from 'react-dropdown'
// import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, Input } from "@rneui/themed";
import Icon from 'react-native-vector-icons/FontAwesome'
import { db, auth } from '../firebase'

const HomeScreen = ({ navigation }) => {
    const colours = ['#d1f8ff', '#27d5f5',]
    const [filteredHW, setFilteredHW] = useState([])
    const [filteredEvents, setFilteredEvents] = useState([])
    const [subjects, setSubjects] = useState([])
    const [HWFilter, setHWFilter] = useState("All")
    const [subjectFilter, setSubjectFilter] = useState("All")
    const [homeworks, setHomeworks] = useState([])
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(['Allcategory', 'AllSubject']);
    const [items, setItems] = useState([
        {label: 'All Category', value: 'AllCategory'},
        {label: 'Homework', value: 'Homework', parent: 'AllCategory'},
        {label: 'Exam', value: 'Exam', parent: 'AllCategory'},
        {label: 'Project', value: 'Project', parent: 'AllCategory'},
        {label: 'All Subjects', value: 'AllSubject'},
       
    ]);
    
    const user = auth.currentUser;

    useEffect(() => {
        let homeworksFromDB = []
        let subjectsFromDB = []
        let eventsFromDB = []

        db.collection('users').doc(user.uid).collection('homeworks').onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log("doc:")
                console.log(doc.data())
                homeworksFromDB.push({ id: doc.id, ...doc.data() })
                console.log("subject: ", doc.data().subject)
                subjectsFromDB.push(doc.data().subject)
            })

            setHomeworks([...homeworksFromDB])
            setFilteredHW([...homeworksFromDB])

            console.log("unfiltered subjects")
            console.log(subjectsFromDB)
            let temp = subjectsFromDB.filter((item, index) => subjectsFromDB.indexOf(item) === index)
            console.log("temp")
            console.log(temp)
            setSubjects([...temp])
            console.log("subjects:")
            console.log(subjects)
        })

        db.collection('users').doc(user.uid).collection('events').onSnapshot((querySnapshot) => {
            console.log('Events:')
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                let date = doc.data().eventStart.toDate()
                if(date.getFullYear() === new Date().getFullYear && date.getMonth() === new Date().getMonth && date.getDate() === new Date().getDate()) {
                    eventsFromDB.push({id: doc.id, ...doc.data()})
                    console.log("Event added")
                }
                console.log("Event: ", doc.data().eventStart)
            })
        })
    }, [])

    useEffect(() => {
        console.log("subjects:")
        console.log(subjects)
    }, [subjects])

    // useEffect(() => {
    //     console.log("homeworks")
    //     console.log(homeworks)
    //     console.log("filtered:")
    //     console.log(filteredHW)
    // }, [filteredHW])

    // useEffect(() => {
    //     setFilteredHW(homeworks)
    //     filter();
    // }, [HWFilter, subjectFilter])

    // const filter = () => {
    //     if (HWFilter != "All")
    //         setFilteredHW(homeworks.filter((item) => item.type == HWFilter))
    //     if (subjectFilter != "All")
    //         setFilteredHW(filteredHW.filter((item) => item.subject == subjectFilter))
    // }

    useEffect(() => {
        let toAdd = homeworks
        setFilteredHW([])
        for(let x = 0; x < toAdd.length; x++) {
            for(let y = 0; y < value.length; y++) {
                if(value[y] == 'AllCategory' || toAdd[x].type == value[y]) {
                    setFilteredHW(...filteredHW, toAdd[x])
                    toAdd.splice(x)
                    x--;
                    y = value.length;
                }
            }
        }
        console.log('val')
        console.log(value)
        console.log('\nfiltered')
        console.log(filteredHW)
    }, [value])

    const renderItem = ({ item, index }) => {
        // <View style={{ backgroundColor: colours[index % colours.length], width: '100%' }}>
        //     <Text style={styles.text1}>{item.title}</Text>
        //     <Text style={styles.text2}>Type: {item.type}</Text>
        //     <Text style={styles.text3}>Difficulty Level: {"*".repeat(item.difficulty)}</Text>
        // </View>
        let backgroundColor = { backgroundColor: colours[index % colours.length] }
        return (
            <View style={[styles.assignmentContainer, backgroundColor]}>
                <Text style={styles.assignmentTitle}>{item.title}</Text>
                <Text style={styles.text2}>Type: {item.type}</Text>
                <Text style={styles.text3}>Difficulty Level: {"*".repeat(item.difficulty)}</Text>
                <Text style={styles.assignmentDueDate}>
                    Due on: {item.dueDate.toDate().toDateString()}
                </Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, paddingTop: 40, paddingHorizontal: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center', marginVertical: 20, zIndex:2 }}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                theme="DARK"
                multiple={true}
                mode="BADGE"
                badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
              />
              <TouchableOpacity onPress={() => navigation.navigate("Add Homework")} style={{ marginLeft: 10 }}>
                <Icon name="plus" size={24} color="#FF6CB9" />
              </TouchableOpacity>
            </View>
            <FlatList data={filteredHW} renderItem={renderItem} style={{zIndex:1}} />
            <Text>Today's events</Text>
            <FlatList data = {filteredEvents} renderItem = {renderItem} style = {{zIndex:1}} />
        </View>
      );
}

export default HomeScreen

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
    text1: {
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,
        paddingTop: 5,
        paddingLeft: 10,
        justifyContent: 'center',
    },
    text2: {
        fontSize: 14,
        letterSpacing: 1,
        justifyContent: 'center',
    },
    text3: {
        fontSize: 14,
        letterSpacing: 1,
        justifyContent: 'center',
        paddingBottom: 5,
    },
    assignmentContainer: {
        padding: 16,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 8,
        marginBottom: 16,
    },
})
