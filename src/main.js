import React, { Component } from 'react';
var t = require('tcomb-form-native');

import {
  StyleSheet,
  AppState,
  Navigator,
  Platform,
  BackAndroid
} from 'react-native';



import Login from './pages/login';
import Request from './pages/request';
import RequestList from './pages/requestlist';
import Result from './pages/result'

var ROUTES = {
    login: Login,
    request: Request,
    requestlist: RequestList,
    result: Result,
};





export default class auth0 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,

    };

    this.navigator = null;

    this.handleBack = (() => {
      console.log('Back is clicked!');
      if (this.navigator && this.navigator.getCurrentRoutes().length > 1){
        this.navigator.pop();
        return true; //avoid closing the app
      }

      return false; //close the app
    }).bind(this) //don't forget bind this, you will remenber anyway.
  }

  componentDidMount(){

    AppState.addEventListener('change', function(currentAppState){
      if (currentAppState === 'active'){
        console.log('Foreground');

      } else if (currentAppState === 'background'){
        console.log('backgroud');

      }
    });
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack);







  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack);
  }

  render(){
    var login_key = this.state.key?this.state.key:false;
    return (

        <Navigator
          style={ styles.container}
          initialRoute={ {name: 'login'} }
          renderScene={this.renderScene}
          configureScrene={ () => { return Navigator.SceneConfigs.FloatFromRight;}}
        />


    )
  }

  renderScene(route, navigator){
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />;
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
