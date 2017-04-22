import React, { Component } from 'react';
var t = require('tcomb-form-native');

import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableHighlight,
  Alert,
  AlertIOS,
  Platform
} from 'react-native';


import {API_URL, PROJECTED_API, STORAGE_KEY} from './../consts';

var Form = t.form.Form;

var Person = t.struct(
  {
    username: t.String,
    password: t.String
  }
);

const options = {};

var isLoggedIn=false;

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn:false,
      token: null,
    };

  }
  async _getToken(){
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      if (value !== null){
        // We have data!!
        console.log(value);
        this.props.navigator.push({name: 'request'});
      }
    } catch (error) {
      // Error retrieving data
    }
  }
  componentDidMount(){
    this._getToken();
  }

  async _onValueChange(item, selectedValue){
      try{
        await AsyncStorage.setItem(item, selectedValue);
      } catch(error){
        console.log('AsyncStorage error: ' + error.message);
      }
  }





  _userSignup(){
      var value = this.refs.form.getValue();
      if(value){
        fetch(API_URL+"/api/signup/",
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: value.username,
            password: value.password,
          })
        }
      )
        .then((response) => response.json())
        .then((resData) => {
          if(resData && resData.auth_token){
            console.log('resData:', resData.auth_token);
            this._onValueChange(STORAGE_KEY, resData.auth_token);
            Alert.alert(
              "Signup Success!",
              "Try to post your request"
            );

            this.props.navigator.push({name: 'request'});
          }else{

            console.log('signup error:', error);
            Alert.alert(
              "Signup Error!",
              'Please try again!'
            );
          }


        })
        .catch((error) => {

          console.log('signup error:', error);
          Alert.alert(
            "Signup Error!",
            ""+error
          );
        });
      }
  }

  _userLogin(){
    var value = this.refs.form.getValue();
    if(value){
      fetch(API_URL+"/auth-token/",
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: value.username,
          password: value.password,
        })
      }
    )
      .then((response) => response.json())
      .then((resData) => {
        //this.setState({isLoggedIn:!this.state.isLoggedIn});
        console.log('resData:', resData.token);
        if(resData && resData.token){
          this._onValueChange(STORAGE_KEY, resData.token);
          /*
          Alert.alert(
            "Login Success!",
            "Try to post your request"

          );*/
          
          this.props.navigator.push({name: 'request'});
        }else{
          Alert.alert(
            "Login Error!",
            "username and/or password are invalid!"

          );
        }

      })
      .catch((error) => {
        console.log('error:', "" + error);
        Alert.alert(
          "Login Error!",
          "" + error

        );
      });
    }
  }

  async _userLogout(){
    try{
      await AsyncStorage.removeItem(STORAGE_KEY);
      Alert.alert("Logout Success!");
      this.setState({isLoggedIn:!this.state.isLoggedIn});

    }catch(error){
      console.log('AsyncStorage error: ', error.message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Signup/Login below to post your requests
          </Text>
        </View>
        <View style={styles.row}>
          <Form
            ref="form"
            type={Person}
            options={options}
          />
        </View>

        <View style={styles.row}>
          <TouchableHighlight onPress={this._userSignup.bind(this)}
            underlayColor='#99d9f4'
            style={styles.button}

            >
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableHighlight>
        </View>
        <View style={styles.row}>
          <TouchableHighlight onPress={this._userLogin.bind(this)}
            underlayColor='#99d9f4'
            style={styles.button}

            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableHighlight>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding:20,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize:30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText:{
    height: 18,
    color: '#fff',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },

});
