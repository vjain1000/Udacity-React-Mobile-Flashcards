import { StyleSheet } from 'react-native'
import { white, purple } from './colors'

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: white,
      justifyContent: 'center',
      flexDirection: 'column',
    },
    column: {
      flexDirection: 'column',
      flex: 1,
      alignItems: 'center',
    },
    iosSubmitBtn: {
      backgroundColor: purple,
      padding: 10,
      borderRadius: 7,
      height: 45,
      marginLeft: 40,
      marginRight: 40,
      justifyContent: 'center',
    },
    AndroidSubmitBtn: {
      backgroundColor: purple,
      padding: 10,
      paddingLeft: 30,
      paddingRight: 30,
      paddingTop: 30,
      height: 45,
      borderRadius: 2,
      alignSelf: 'flex-end',
      justifyContent: 'center',
      alignItems: 'center',
    },
    submitBtnText: {
      color: white,
      fontSize: 22,
      textAlign: 'center',
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 30,
      marginRight: 30,
    },
    text: {
        textAlign: 'center',
        color: purple,
        fontSize: 30
      },
    textInput: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
    }
  })