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
  Platform,
  Dimensions
} from 'react-native';


import {API_URL, PROJECTED_API, STORAGE_KEY} from './../consts';

var Form = t.form.Form;

var Person = t.struct(
  {
    message: t.String,
  }
);

const options = {

  fields:{
    message:{
      multiline: true,
      numberOfLines: 4,
    }
  }
};
var width = Dimensions.get('window').width;

export default class Request extends Component {
  constructor(props) {
    super(props);

    this.state = {page:'first'};

  }





  async _userPostRequest(){
    var value = this.refs.form.getValue();
    if(value){

      var DEMO_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
      console.log('DEMO_TOKEN:', DEMO_TOKEN)
      fetch(PROJECTED_API,{
        method: "POST",
        headers: {
          'Authorization': 'Token ' + DEMO_TOKEN,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: value.message,
        })

      })
      .then((response) => response.json() )
      .then((resData) => {
        console.log("message:"+resData);
        if(resData && resData.message){

          value.message="";

          Alert.alert("Message posted successfully!", resData.message);
        }else{
          Alert.alert("Message did not posted successfully!", "Please try again!");
        }

      })
      .catch((error) => {
        Alert.alert("Message posted error:", ""+error);
      });
    }else{

      Alert.alert("Request Message:", "Please input something!");
    }
  }


_requestList(){
  this.props.navigator.push({name:'requestlist'});
}

  render() {

    return (
      <View style={styles.container}>
      <View style={styles.titlerow}>
        <View style={{flex:1}}>
          <Text style={styles.title}>
              Your Message
          </Text>
          </View>
          <View style={{flex:1}}>
          <TouchableHighlight
            underlayColor='#99d9f4'
            style={styles.button}
            onPress={this._requestList.bind(this)}
            >
              <Text style={styles.buttonText}>Requests List</Text>
            </TouchableHighlight>
        </View>
        </View>

          <View style={styles.row}>
            <Form
              ref="form"
              type={Person}
              options={options}
            />
          </View>
          <View style={styles.row}>
            <TouchableHighlight onPress={this._userPostRequest.bind(this)}
              underlayColor='#99d9f4'
              style={styles.button}
              >
                <Text style={styles.buttonText}>Submit</Text>
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

  titlerow:{
    flex:1,
    flexDirection: 'row',
    marginBottom: 30
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
  buttonHalf: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex:0.4,
    alignItems: 'flex-end',
    width: width*0.4,

  },



});
