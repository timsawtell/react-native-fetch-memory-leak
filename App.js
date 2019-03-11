import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gets: 0,
      movies: []
    }
  }

  componentDidMount() {
    this.hitAnAPI();
  }
  
  hitAnAPI = () => {
    this.getMoviesFromApiAsync().then(this.doSomethingWithData);
  }

  getMoviesFromApiAsync() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then(this.processJSON)
      .then(this.processMovies)
  }

  processJSON = (response) => response.json()

  processMovies = (responseJson) => {
    return responseJson.movies;
  }

  doSomethingWithData = (movies) => {
    // here is where the dev would move the final movies array data into their state system of choice. 
    // For this example we'll use React component state.
    this.setState({
      gets: this.state.gets + 1,
      movies
    });
    setTimeout(this.hitAnAPI) // start all over again to test out the memory management changes 
  }

  render() {
    return (
      <View style={{
        justifyContent: "center",
        alignContent: "center",
        flex: 1
      }}>
        <Text>Memory Leak Demo.</Text>
        <Text>JSON object Gets: {this.state.gets}</Text>
      </View>
    );
  }
}