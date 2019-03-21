import React from 'react'
import { View, TouchableOpacity, Text, TextInput, Platform } from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { styles } from '../utils/styles'

function SubmitBtn ({ onPress, navigation }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  )
}

class AddCard extends React.Component {
    state = {
        question: '',
        answer: ''
    }

    submit = () => {
        const { question, answer } = this.state;
        const title = this.props.title;

        this.props.dispatch(addCard({title, card:{question, answer}}))
        this.props.navigation.goBack()
      }

    render()
    {
        return (
            <View style={styles.container}>
              <Text style={styles.text}>Question</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(question) => this.setState({question})}
                value={this.state.question}
                />
                <Text style={styles.text}>Answer</Text>
                <TextInput
                style={styles.textInput}
                onChangeText={(answer) => this.setState({answer})}
                value={this.state.answer}
                />
                <SubmitBtn onPress={this.submit}/>
                </View>
          )
    }
}

function mapStateToProps (state, params) {
  const title = params.navigation.state.params.title.name;

  return {
    title: title,
  }
}

export default connect(mapStateToProps)(AddCard)