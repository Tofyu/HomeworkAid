import { StyleSheet, Text, View } from 'react-native'
import React from 'react'



const EditRecurringEventScreen = () => {
    const [inputName, setInputName] = useState('');
    const [inputStart, setInputStart] = useState('');
    const [inputNotes, setInputNotes] = useState('');
    // const [startDate, setStartDate] = useState('');
    // const [endDate, setEndDate] = useState('');
    const [isSunday, setIsSunday] = useState(false);
    const [isMonday, setIsMonday] = useState(false);
    const [isTuesday, setIsTuesday] = useState(false);
    const [isWednesday, setIsWednesday] = useState(false);
    const [isThursday, setIsThursday] = useState(false);
    const [isFriday, setIsFriday] = useState(false);
    const [isSaturday, setIsSaturday] = useState(false);

    const event = 
    {
        eventID: "j5chR4rmim2qrR67cVY8",
        eventDate: "Sunday",
        name: "Orchestra",
        notes: "hello",
        isSunday: true,
        isMonday: true,
        isTuesday: false,
        isWednesday: false,
        isThursday: true,
        isFriday: false,
        isSaturday: false
    }


  return (
    <View>
            <Text style = {styles.title}>Edit Recurring Event</Text>

    </View>
  )
}

export default EditRecurringEventScreen

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
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  label:{
    margin:8,
  }
})