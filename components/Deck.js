import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { purple, white } from '../utils/colors'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'

function AddCardBtn ({ navigation, name }) {
    return (
      <TouchableOpacity
        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
        onPress={() => navigation.navigate('AddCard', {title: {name}})} >
          <Text style={styles.submitBtnText}>Add Card</Text>
      </TouchableOpacity>
    )
  }

  function StartQuizBtn ({ navigation, name }) {
    return (
      <TouchableOpacity
        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
        onPress={() => navigation.navigate('Quiz', {title: {name}})} >
          <Text style={styles.submitBtnText}>Start Quiz</Text>
      </TouchableOpacity>
    )
  }

  function DeckBtn ({ onPress, name }) {
    return (
      <TouchableOpacity
        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
        onPress={onPress}>
          <Text style={styles.submitBtnText}>{name}</Text>
      </TouchableOpacity>
    )
  }

class Deck extends React.Component {
    state = {
        name: '',
        cards: ''
    }

    componentDidMount()
    {
      this.props.dispatch(receiveDecks(getDecks()))
    }

    render()
    {
        return (
            <View style={styles.container}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.subTitle}>{this.props.numOfCards} cards</Text> 
            <AddCardBtn navigation={this.props.navigation} name={this.props.title}/>
            <StartQuizBtn name={this.props.title} navigation={this.props.navigation} />
            </View>
          )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: white,
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'column',
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
    title: {
        alignItems: 'center',
        fontSize: 25,
        color: purple,
        paddingTop: 10
    },
    subTitle: {
        alignItems: 'center',
        fontSize: 20,
        color: purple,
        padding: 10
    }
  })

  function mapStateToProps (state, params) {
    const title = params.navigation.state.params.title.name;

    return {
      title: title,
      deck: state.decks[title],
      numOfCards: state.decks[title].cards.length
    }
  }

  export default connect(mapStateToProps)(Deck)