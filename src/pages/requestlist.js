import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  AsyncStorage,
  Alert,
  ListView,
  TouchableHighlight
} from 'react-native';


import {PROJECTED_API, STORAGE_KEY} from "./../consts";

var requests = [];
export default class RequestList extends Component {

  constructor(props) {
    super(props);

    var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});
   this.state = {
      dataSource: dataSource.cloneWithRows(requests),
     isLoading:true
   }


    this._loadRequets = this._loadRequets.bind(this);
    //this._showResult = this._showResult.bind(this);
  }

  async _loadRequets(){


      var DEMO_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
      console.log('DEMO_TOKEN:', DEMO_TOKEN)
      fetch(PROJECTED_API,{
        method: "GET",
        headers: {
          'Authorization': 'Token ' + DEMO_TOKEN,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }

      })
      .then((response) => response.json() )
      .then((resData) => {
        //console.log("message:"+resData);
        if(resData){

          requests = resData;
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(requests),
            isLoading:false,

          });
          //Alert.alert("Got  posted requests!");
        }else{
          Alert.alert("Could not get posted requests", "Please try again!");
        }

      })
      .catch((error) => {
        Alert.alert("Get posted requests error:", ""+error);
      });

  }

  componentDidMount(){

    console.log('componentDidMount:', this.state.requests);
    this._loadRequets();
    console.log('componentDidMount:', this.state.requests);
  }

  _showResult(requestRow, ref){
    //console.log('ref:', ref);
    //console.log('requestx:', requestRow);
    if(requestRow.results.length < 1)
      return;

    this.props.navigator.push({name: 'result', request: requestRow});

  }

  renderRequest(request){
    var row = request;
    return (

      <TouchableHighlight underlayColor='#dddddd'  onPress={this._showResult.bind(this, request)}>
        <View style={styles.container}>

        <View style={{flex:1}}>
        <Text style={styles.title}>{request.created}</Text>
      </View>

        <View style={{flex:1}}>
        <Text style={styles.result}>Result: {request.results.length}</Text>
      </View>
      </View>
    </TouchableHighlight>

    );

  }

  render() {

    //console.warn("render" + this.state.isLoading);
   var currentView = (this.state.isLoading) ? <View style={{height: 110, backgroundColor: '#dddddd'}} /> : <ListView dataSource={this.state.dataSource} renderRow={this.renderRequest.bind(this)} enableEmptySections={true}/>
   return(
     <View style={styles.container}>
       {currentView}
     </View>
   );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,                // take up all screen
    paddingTop: 20,         // start below status bar
    flexDirection: 'row'
  },
  loader: {
    flex: 1,
    alignItems: 'center',     // center horizontally
    justifyContent: 'center', // center vertically
  },
  heading:{
    fontSize:30,
    alignSelf: 'center',
    marginBottom: 30
  },
  title:{
    fontSize:20,
    alignSelf: 'flex-start',
    marginBottom: 10
  },
  result:{
    fontSize:30,
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginRight: 15,
  }

});
