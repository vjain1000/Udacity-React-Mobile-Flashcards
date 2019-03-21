import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput } from 'react-native'
import { purple, white } from '../utils/colors'
import { connect } from 'react-redux'
import { addDeck } from '../actions';

function SubmitBtn ({ onPress, navigation }) {
    return (
      <TouchableOpacity
        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
        onPress={onPress}>
          <Text style={styles.submitBtnText}>Create Deck</Text>
      </TouchableOpacity>
    )
  }

class AddDeck extends React.Component {
    state = {
        title: ''
    }

    submit = () => {
        this.props.dispatch(addDeck({title: this.state.title}))
        this.props.navigation.navigate('Deck', {title: {name: this.state.title}})
      }

    render()
    {
        return (
            <View style={styles.container}>
            <Text style={styles.text}>What is the title of your new deck?</Text>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(title) => this.setState({title})}
                value={this.state.title}
                />
            <SubmitBtn onPress={this.submit} />
            </View>
          )
    }
}

const styles = StyleSheet.create({
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
      }
  })

  function mapStateToProps (state, { navigation }) {
  
    return {
      entryId: 1,
    }
  }

  export default connect(mapStateToProps)(AddDeck)