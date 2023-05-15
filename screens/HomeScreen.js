import { StyleSheet, Text, View, FlatList, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import ReactDropdown from 'react-dropdown'
import { db } from '../firebase'

const HomeScreen = () => {
    const colours = ['#d1f8ff','#27d5f5',]
    const [homeworks, setHomeworks] = useState([])
    const [filteredHW, setFilteredHW] = useState([])
    const [subjects, setSubjects] = useState([])
    const [HWFilter, setHWFilter] = useState("All")
    const [subjectFilter, setSubjectFilter] = useState("All")

    useEffect(() => {
        let homeworksFromDB = []
        let subjectsFromDB = []

        db.collection('users').doc('k4UBkks0q2pL5RtjZstY').collection('homeworks').onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log("doc:")
                console.log(doc.data())
                homeworksFromDB.push({id: doc.id, ...doc.data()})
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
    }, [])

    useEffect(() => {
        console.log("subjects:")
        console.log(subjects)
    }, [subjects])

    useEffect(() => {
        console.log("homeworks")
        console.log(homeworks)
        console.log("filtered:")
        console.log(filteredHW)
    }, [filteredHW])

    useEffect(() => {
        setFilteredHW(homeworks)
        filter();
    }, [HWFilter, subjectFilter])

    const filter = () => {
        if(HWFilter != "All")
            setFilteredHW(homeworks.filter((item) => item.type == HWFilter))
        if(subjectFilter != "All")
            setFilteredHW(filteredHW.filter((item) => item.subject == subjectFilter))
    }

    const renderItem = ({item, index}) => (
        <View style = {{backgroundColor: colours[index % colours.length], width: '100%'}}>
            <Text style = {styles.text1}>{item.title}</Text>
            <Text style = {styles.text2}>Type: {item.type}</Text>
            <Text style = {styles.text3}>Difficulty Level: {"*".repeat(item.difficulty)}</Text>
        </View>
    )

    return (
        <ImageBackground source = {require('../assets/background3.png')} resizeMode = "cover" style = {{flex: 1, width: '100%', height:'100%'}}>
            <View style = {{flex: 1, alignItems: 'center'}}>
                <Text style = {styles.title}>Agenda Planner</Text>
                <Text>Category:</Text>
                <ReactDropdown options = {["All", "Homework", "Exam", "Project"]} value = "All" onChange={((option) => setHWFilter(option.value))}></ReactDropdown>
                <Text>Subject:</Text>
                <ReactDropdown options = {["All", ...subjects]} value = "All" onChange={((option) => setSubjectFilter(option.value))}></ReactDropdown>
                <FlatList data = {filteredHW} renderItem = {renderItem}></FlatList>
            </View>
        </ImageBackground>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    title:{
        fontSize: 30,
        fontWeight: '700',
        letterSpacing: 2,
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 15,
    },
    text1:{
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,
        paddingTop: 5,
        paddingLeft: 10,
        justifyContent: 'center',
    },
    text2:{
        fontSize: 14,
        letterSpacing: 1,
        justifyContent: 'center',
    },
    text3:{
        fontSize: 14,
        letterSpacing: 1,
        justifyContent: 'center',
        paddingBottom: 5,
    },
})
