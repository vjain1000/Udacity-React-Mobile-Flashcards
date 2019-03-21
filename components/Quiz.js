import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { purple, white, green } from '../utils/colors'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

function GenericBtn ({ disabled, onPress, text }) {
    return (
      <TouchableOpacity
        disabled={disabled}
        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
        onPress={onPress} >
          <Text style={styles.submitBtnText}>{text}</Text>
      </TouchableOpacity>
    )
  }

function AnswerBtn ({ onPress, navigation, name }) {
    return (
      <TouchableOpacity
        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
        onPress={onPress} >
          <Text style={styles.submitBtnText}>Show Answer</Text>
      </TouchableOpacity>
    )
  }

  function NextBtn ({ onPress, navigation, name }) {
    return (
      <TouchableOpacity
        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
        onPress={onPress} >
          <Text style={styles.submitBtnText}>Next</Text>
      </TouchableOpacity>
    )
  }

class Quiz extends React.Component {
    state = {
        index: 0,
        showAnswer: false,
        correct: 0,
        answered: false,
        finished: false
    }

    next = () => {
        var { index, finished } = this.state;
        const { numOfQuestions } = this.props;

        if (index == numOfQuestions - 1)
        {
            finished = true;
            clearLocalNotification()
            .then(setLocalNotification)
        }
        else
        {
            index++
        }

        this.setState({index, answered: false, finished, showAnswer: false })
      }

    restart = () => {
        this.setState({index: 0, showAnswer: false, correct: 0, answered: false, finished: false})
    }

    answer = () => {
        const { correct } = this.state

        this.setState({answered: true, correct: correct+1 })
    }

    toHome = () => {
        this.props.navigation.goBack()
      }

    render()
    {
        const { index, showAnswer, answered, finished } = this.state

        return (
            <View style={styles.container}>
            {(this.props.numOfQuestions === 0) ? (
                <View>
                <Text>No questions are available. Please add some!</Text>
                </View>
            ) : (
                <View>
                    <Text style={styles.remainingTxt}>{this.state.index+1} of {this.props.numOfQuestions} questions</Text> 
                {finished == false ? (
                    <View>   
                    <Text style={styles.questionTxt}>Question: {this.props.cards[index].question}</Text>
                    {showAnswer === true && 
                        <Text style={styles.questionTxt}>Answer: {this.props.cards[index].answer}</Text>}
                    <AnswerBtn onPress={() => {this.setState({showAnswer: !showAnswer})}}></AnswerBtn>
                    <NextBtn onPress={this.next}></NextBtn>
                    {answered == false && <GenericBtn onPress={this.answer} text="Correct"></GenericBtn>}
                    </View>
                ) : (
                    <View>
                    <Text style={styles.remainingTxt}>{this.state.correct} answers were correct!</Text>
                    <GenericBtn onPress={this.restart} text="Restart Quiz"></GenericBtn>
                    <GenericBtn onPress={this.toHome} text="Go Back"></GenericBtn>
                    </View>
                    )
                }
                </View>
                )
            }
            </View>
        )
            
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
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
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 30,
      marginRight: 30,
    },
    questionTxt: {
        textAlign: 'center',
        color: purple,
        fontSize: 30
    },
    remainingTxt: {
        color: green,
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
    }
  })

  function mapStateToProps (state, params) {
    const title = params.navigation.state.params.title.name;

    return {
      title: title,
      cards: state.decks[title].cards,
      numOfQuestions: state.decks[title].cards.length
    }
  }

  export default connect(mapStateToProps)(Quiz)