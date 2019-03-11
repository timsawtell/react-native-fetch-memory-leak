import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gets: 0,
      leakyDataPressed: false
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
    this.setState({
      gets: this.state.gets + 1
    });
    console.log(JSON.stringify(movies))
    setTimeout(this.hitAnAPI, 300) // start all over again
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