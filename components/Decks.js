import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform, ScrollView, Animated } from 'react-native'
import { purple, white } from '../utils/colors'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'

  function DeckBtn ({ onPress, navigation, name, count}) {
    return (
      <TouchableOpacity
        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
        onPress={() => onPress(name)} >
          <Text style={styles.submitBtnText}>{name}</Text>
          <Text style={styles.subText}>{count} cards</Text>
      </TouchableOpacity>
    )
  }

class Decks extends React.Component {
    state = {
        name: '',
        cards: '',
        opacity: new Animated.Value(1)
    }

    submit = () => {
        this.props.navigation.navigate('AddCard')
      }

    componentDidMount()
    {
      this.props.dispatch(receiveDecks(getDecks()))
    }

    onPress = (name) => {
      const { opacity } = this.state
      Animated.timing(opacity, {toValue: 0, duration: 500}).start(() => {
        Animated.timing(opacity, {toValue: 1, duration: 500}).start(() => {
          this.props.navigation.navigate('Deck', {title: {name}})})
        })
    }

    render()
    {
      const { opacity } = this.state
        return (
            <Animated.View style={[styles.container, {opacity}]}>
              <ScrollView>
                {this.props.deckData.map( (deck) => <DeckBtn onPress={this.onPress} key={deck.title} name={deck.title} count={deck.count} navigation={this.props.navigation}></DeckBtn>)}
              </ScrollView>
            </Animated.View>
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
    subText: {
      fontSize: 8,
      color: white,
      textAlign: 'center'
    }
  })

  function mapStateToProps ({decks}) {
    const deckData = Object.keys(decks).map((key) => {
      return {title: key, count: decks[key].cards.length}
    })
    return {
      decks,
      deckData
    }
  }

  export default connect(mapStateToProps)(Decks)