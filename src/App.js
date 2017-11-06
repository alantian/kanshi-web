import React from 'react';
import './App.css';
import Config from './Config.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {poem: "xxx"};

    this.setPoem = this.setPoem.bind(this);
    this.generateHandler = this.generateHandler.bind(this);
  }

  setPoem(poem) {
    this.setState({
      poem: poem
    });
  }

  generateHandler() {
    var that = this;
    var url = Config.url;
    fetch(url, {method: 'GET'}).then(
      function(response) {
        return response.json();
      }
    ).then(
      function(json){
        var poem = json['poem'];
        that.setPoem(poem);
      }
    ).catch(
      function(error){console.log(error);}
    );
  }

  render() {
    return (
      <div>
        <button onClick={this.generateHandler}> Generate </button>

        <p> text is {this.state.poem} </p>
      </div>
    );
  }
}

export default App;
