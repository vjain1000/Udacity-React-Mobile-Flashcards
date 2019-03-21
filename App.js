import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import Decks from './components/Decks';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { purple, white } from './utils/colors';
import { createAppContainer, createStackNavigator } from 'react-navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import Deck from './components/Deck'
import { AsyncStorage } from 'react-native'
import { FLASHCARD_STORAGE_KEY } from './utils/api'
import Quiz from './components/Quiz'
import { setLocalNotification } from './utils/helpers'

const configureStore = () => {
  const store = createStore(reducer, middleware);

  store.subscribe(() => {
      const log = JSON.stringify(store.getState())
      AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, log);
      console.log(log)
  });

  return store;
}

const Tabs = createAppContainer(createBottomTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}));

const MainNavigator = createAppContainer(createStackNavigator({
  Home: {
    screen: Tabs,
  },
  Decks: {
    screen: Decks,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
}));

export default class App extends React.Component {
  
  componentDidMount()
  {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={configureStore()}>
        <View style={{flex: 1}}>
        <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
