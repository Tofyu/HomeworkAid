import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, Input,CheckBox } from "@rneui/themed";




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

    const recurevent = 
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

    useEffect(()=> {
      setInputName(recurevent.name)
      setInputStart(recurevent.eventDate)
      setInputNotes(recurevent.notes)
      setIsSunday(recurevent.isSunday)
      setIsMonday(recurevent.isMonday)
      setIsTuesday(recurevent.isTuesday)
      setIsWednesday(recurevent.isWednesday)
      setIsThursday(recurevent.isThursday)
      setIsFriday(recurevent.isFriday)
      setIsSaturday(recurevent.isSaturday)



    }, [])  
    const updateEvent = () => {
        const updatedEvent = {
          eventDate: inputStart,
          name: inputName,
          notes: inputNotes,
          isSunday: isSunday,
          isMonday: isMonday,
          isTuesday: isTuesday,
          isWednesday: isWednesday,
          isThursday: isThursday,
          isFriday: isFriday,
          isSaturday: isSaturday

        };
        db
          .collection("users")
          .doc("j5chR4rmim2qrR67cVY8")
          .collection("recurringEvents")
          .doc(recurevent.eventID)
          .update(updatedEvent)
          .then(() => {
            console.log("Event has been changed");
            
          });
      };
  return (
    <View>
            <Text style = {styles.title}>AddRecurringEventScreen</Text>

      <Input
        style = {styles.input}
        size="small"
        placeholder="[Enter Event Name]"
        value={inputName}
        onChangeText={text => setInputName(text)} 
      />
       <Input
        style={styles.input}
        size="small"
        value={inputStart}
        placeholder="[Enter Event Start Date] "
        onChangeText={text => setInputStart(text)}
      />
      <Input
        style={styles.input}
        size="small"
        value={inputNotes}
        placeholder="[Enter Event Notes]"
        onChangeText={text => setInputNotes(text)}
      />
      <View style={{flexDirection:"row"}}>
        <CheckBox
          title="Sunday"
          value={isSunday}
          onValueChange={() => setIsSunday(!isSunday)}
        />
        </View>
        <View style={{flexDirection:"row"}}>
        <CheckBox
          title="Monday"
          value={isMonday}
          onValueChange={() => setIsMonday(!isMonday)}
        />
        </View>
        
        <View style={{flexDirection:"row"}}>
        <CheckBox
          title="Tuesday"
          value={isTuesday}
          onValueChange={() => setIsTuesday(!isTuesday)}
        />
        </View>
        <View style={{flexDirection:"row"}}>
        <CheckBox
          title="Wednesday"
          value={isWednesday}
          onValueChange={() => setIsWednesday(!isWednesday)}
        />
        </View>
        <View style={{flexDirection:"row"}}>
        <CheckBox
          title="Thursday"
          value={isThursday}
          onValueChange={() => setIsThursday(!isThursday)}
        />
        </View>
        <View style={{flexDirection:"row"}}>
        <CheckBox
          title="Friday"
          value={isFriday}
          onValueChange={() => setIsFriday(!isFriday)}
        />
        </View>
        <View style={{flexDirection:"row"}}>
        <CheckBox
          title="Saturday"
          value={isSaturday}
          onValueChange={() => setIsSaturday(!isSaturday)}
        />
        </View>
        <Button title="Update Event" 
        buttonStyle={{ backgroundColor: 'rgba(39, 213, 245, 0.8)', borderRadius: 15 }} 
        titleStyle={{ fontWeight: 'bold', fontSize: 16 }} 
        icon={{name: 'calendar',type: 'font-awesome',size: 15,color: 'white',}}
        onPress={updateEvent} 
        style={{ padding: 10, marginVertical: 5, width: 370 }} />
    </View>
)}

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