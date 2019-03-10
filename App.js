import React, { Component } from 'react';
import { Text, View, Button, ActivityIndicator } from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      jsonGets: 0,
      leakyDataPressed: false
    }
  }

  getJSONText = () => {
    fetch('https://raw.githubusercontent.com/timsawtell/react-native-fetch-memory-leak/master/package.json').then((response) => {
      return response.json()
    }).then((responseAsJSON) => {
      this.setState({
        jsonGets: this.state.jsonGets + 1
      })
      setTimeout(this.getJSONText, 100);
    })
  }

  getLeakyData = () => {
    this.setState({
      leakyDataPressed: true
    })
    fetch('http://ipv4.download.thinkbroadband.com/5MB.zip').then((response) => {
      this.setState({
        leakyDataPressed: false
      })
      setTimeout(this.getJSONText, 100);
    })
  }

  componentDidMount() {
    this.getJSONText()
  }

  render() {
    return (
      <View style={{
        justifyContent: "center",
        alignContent: "center",
        flex: 1
      }}>
        <Text>Memory Leak Demo.</Text>
        <Text>JSON Text Gets: {this.state.jsonGets}</Text>
        <Button onPress={this.getLeakyData} title="Get Leaky Data" disabled={this.state.leakyDataPressed} />
        <ActivityIndicator animating={this.state.leakyDataPressed} />
        <Text>The reason this leaks is because the programmer isn't doing anything with the response. The reason why the `JSON Text Gets` do not leak is because the value is read (via .json()) and this in turn signals to the RCTBlobManager to delete that data (with my modification to `RCTFileReaderModule`). If you don't want fetch results to stay in memory forever, you'd best read the response via .json() or .text() .</Text>
      </View>
    );
  }
}