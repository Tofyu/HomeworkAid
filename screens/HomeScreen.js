import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { db } from '../firebase'

const WelcomeScreen = () => {
    const [homeworks, setHomeworks] = useState([])
    const [time, setTime] = useState(0)
    const [dueSoon, setDueSoon] = useState([])

    useEffect(() => {
        let homeworksFromDB = []
        let dueSoonFromDB = []
        db.collection('users').doc('k4UBkks0q2pL5RtjZstY').collection('homeworks').onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                homeworksFromDB.push({id: doc.id, ...doc.data()})
                console.log("**************")
                console.log(doc.data().dueDate.toDate())
                console.log(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000))
                console.log("********************" + (doc.data().dueDate.toDate() < new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)))
            })
            console.log("aaaaaaaaaaa", homeworksFromDB.length)
            setHomeworks([...homeworksFromDB])
            console.log("homeworks" + homeworks)
        })
    }, [])

    useEffect(() => {
        console.log("*****", homeworks)
        console.log("*****", homeworks.length)
        setDueSoon(homeworks.filter((item) => { return (
            item.dueDate.toDate() < new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
        )}))
        console.log(dueSoon)
    }, [homeworks])

    useEffect(()=> {
        let sum = 0
        homeworks.forEach((item) => {
            sum += item.timeNeeded;
        })
        console.log(sum)
        setTime(sum)
    }, [homeworks])

    const renderItem = ({item}) => {
        return (
            <View>
                <Text>{item.title}</Text>
            </View>
        )
    }

    return (
        <View>
            <Text>Welcome, (name)</Text>
            <Text>Today is {new Date().toString()}</Text>
            <Text>Total homework time: {time}</Text>
            <Text>Total number of assignments: {homeworks.length}</Text>

            <Text>Due Soon:</Text>
            <FlatList data = {dueSoon} renderItem = {renderItem}></FlatList>

        </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({})
