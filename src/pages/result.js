import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  TouchableHighlight,
  Image
} from 'react-native';


var Carousel = require('react-native-carousel');


export default class Result extends Component {

  constructor(props) {
    super(props);


   this.state = {

   };

   this._backToRequest = this._backToRequest.bind(this);


  }



  componentDidMount(){

    console.log('componentDidMount:', this.props.route);

  }

  _backToRequest(){

    this.props.navigator.pop();

  }



  render() {
    var request = this.props.route.request;
    //console.warn("render:" , request);
    var results = [];
    request.results.map((result, i) => {
      console.log('result:', result);

      results.push(
        <View style={styles.container} key={result.id}>
          <Image style={{width:100}} source={{uri:"{result.photo}"}} />

          <Text style={styles.title}>{result.name}</Text>
          <Text style={styles.contact}>{result.contact_info}</Text>
          <Text style={styles.title}>{result.description}</Text>
        </View>
      );
    });

    console.log('results:', results);

   return(
     <View style={styles.containerOuter}>
       <View style={styles.headingRow}>
         <View style={{flex:1}}>
           <Text style={styles.title} numberOfLines={1}>
               Request: {request.created}
           </Text>
           </View>
           <View style={{flex:1}}>
           <TouchableHighlight
             underlayColor='#99d9f4'
             style={styles.button}
             onPress={this._backToRequest}
             >
               <Text style={styles.buttonText}>Requests List</Text>
             </TouchableHighlight>
         </View>
         </View>

     <Carousel width={375}>
        {results}
      </Carousel>


    </View>
   );
  }
}


const styles = StyleSheet.create({
  container: {
    width: 375,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  containerOuter: {
    flex: 1,                // take up all screen
    paddingTop: 20,         // start below status bar


  },
  headingRow:{

    flexDirection: 'row',
    marginBottom: 30,
    height: 80,
  },
  titlerow:{

    marginBottom: 30
  },
  title:{
    fontSize:20,
    alignSelf: 'center',
    marginBottom: 10,
  },
  contact:{
    fontSize:30,
    alignSelf: 'center',
    marginBottom: 10,
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  buttonText:{
    height: 18,
    color: '#fff',
    alignSelf: 'center'
  },

});
