import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import SearchScreen from './screens/SearchScreen'
import TransactionScreen from './screens/TransactionScreen'

export default class App extends React.Component{

  render(){
    return (
        <AppContainer/>
      );
    }
  }

  const TabNavigator=createBottomTabNavigator({
    TransactionScreen:{screen:TransactionScreen},
    SearchScreen:{screen:SearchScreen}
  },
  {
  defaultNavigationOptions: ({navigation})=>({
    tabBarIcon:({})=>{
      const routeName = navigation.state.routeName
      if(routeName==='TransactionScreen'){
        return(
          <Image style={{width:40,height:40}}
            source={require('./assets/book.png')}
          />
        )
      } else if(routeName==='SearchScreen'){
        return(
          <Image style={{width:40,height:40}}
            source={require('./assets/searchingbook.png')}
          />
        )
      }
    }
  })
}
  )
  
  const AppContainer = createAppContainer(TabNavigator);

