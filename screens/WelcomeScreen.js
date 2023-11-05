import { StyleSheet, Text, View, FlatList, ImageBackground, TouchableOpacity } from 'react-native'
import { Button } from '@rneui/themed'
import React, { useState, useEffect } from 'react'
import { db, auth } from '../firebase'

const WelcomeScreen = ({navigation}) => {
    const colours = ['#d1f8ff', '#27d5f5',]
    const [homeworks, setHomeworks] = useState([])
    const [time, setTime] = useState(0)
    const [dueSoon, setDueSoon] = useState([])
    const [userInfo, setUserInfo] = useState(null)
    const user = auth.currentUser;

    useEffect(() => {
        const readHomeworks = () => {
            let homeworksFromDB = []
            let dueSoonFromDB = []
            db.collection('users').doc(user.uid).collection('homeworks').onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.data())
                    homeworksFromDB.push({ id: doc.id, ...doc.data() })
                    console.log("**************")
                    console.log(doc.data().dueDate.toDate())
                    console.log(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000))
                    console.log("********************" + (doc.data().dueDate.toDate() < new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)))
                })
                console.log("aaaaaaaaaaa", homeworksFromDB.length)
                setHomeworks([...homeworksFromDB])
                console.log("homeworks" + homeworks)
            })
        }
        
        const readUser = () => {
            // Assuming that 'user' is an authenticated user object with a 'uid' property
            // Get a reference to the document in the 'users' collection using the user's UID
            const userDocRef = db.collection('users').doc(user.uid);
          
            // Use the 'get' method to retrieve the document data
            userDocRef.get()
              .then((doc) => {
                if (doc.exists) {
                  // Document exists, you can access its data using doc.data()
                  const userData = doc.data();
                  setUserInfo(userData)
                  console.log("User data:", userData);
                } else {
                  console.log("No such document!");
                }
              })
              .catch((error) => {
                console.error("Error getting user document:", error);
              });
        };
        
        readHomeworks();
        readUser();
    }, [])

    useEffect(() => {
        console.log("*****", homeworks)
        console.log("*****", homeworks.length)
        setDueSoon(homeworks.filter((item) => {
            return (
                item.dueDate.toDate() > new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
            )
        }))
        console.log(dueSoon)
    }, [homeworks])

    useEffect(() => {
        let sum = 0
        dueSoon.forEach((item) => {
            sum += parseInt(item.timeNeeded);
        })
        console.log(sum)
        setTime(sum)
    }, [homeworks])

    const renderItem = ({ item, index }) => {
        let backgroundColor = { backgroundColor: colours[index % colours.length] }
        return (
            <View style={[styles.assignmentContainer, backgroundColor]}>
                <Text style={styles.assignmentTitle}>{item.title}</Text>
                <Text style={styles.assignmentDueDate}>
                    Due on: {item.dueDate.toDate().toDateString()}
                </Text>
            </View>
        )
    }

    return (
        <ImageBackground source={require('../assets/background_bottom.png')} resizeMode="cover" style={{ flex: 1, width: '100%', height: '100%' }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.welcomeText}>Welcome, {userInfo?.name} </Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Total homework minutes</Text>
                        <Text style={styles.statValueCircle}>{time}</Text>
                    </View>

                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Total assignments</Text>
                        <Text style={styles.statValueCircle}>{homeworks.length}</Text>
                    </View>
                </View>

                <View style={styles.dueSoonContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {dueSoon.length > 0 ? (
                        <Text style={styles.dueSoonTitle}>Due Soon:</Text>
                    ) : (<Text style={{ fontSize: 16 }}>No homework due soon.</Text>
                    )}
                    <Button
                        title="Add Homework"
                        buttonStyle={{ backgroundColor: 'rgba(39, 213, 245, 0.8)', borderRadius: 15 }}
                        titleStyle={{ fontWeight: 'bold', fontSize: 15 }}
                        icon={{ name: 'pencil-square', type: 'font-awesome', size: 15, color: 'white' }}
                        onPress={() => { navigation.navigate("Add Homework") }}
                        style={{ padding: 10, marginVertical: 5, width: 200 }}
                    />
                    </View>
                    <FlatList data={dueSoon} renderItem={renderItem} keyExtractor={(item) => item.id} />
                </View>

                <View style={{alignItems:'center'}}>
                    <Button
                        title="Move to Home"
                        buttonStyle={{ backgroundColor: 'rgba(39, 213, 245, 0.8)', borderRadius: 15 }}
                        titleStyle={{ fontWeight: 'bold', fontSize: 15 }}
                        icon={{ name: 'home', type: 'font-awesome', size: 15, color: 'white' }}
                        onPress={() => navigation.navigate('Home')}
                        style={{ padding: 10, marginVertical: 5, width: 200 }}
                    />
                </View>
            </View>
        </ImageBackground>
    )
}

export default WelcomeScreen

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
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingTop: 32,
    },
    header: {
        marginBottom: 24,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    dateText: {
        fontSize: 16,
        color: 'gray',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 5
    },
    dueSoonContainer: {
        flex: 1,
    },
    dueSoonTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    assignmentContainer: {
        padding: 16,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 8,
        marginBottom: 16,
    },
    assignmentTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    statValueCircle: {
        backgroundColor: '#27D5FAD3',
        borderRadius: 10,
        padding: 10,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        overflow: 'hidden',
    },
    assignmentDueDate: {
        fontSize: 14,
        color: 'black',
    },
})
