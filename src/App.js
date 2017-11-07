import React, { Component } from 'react';
import './App.css';
import Config from './Config.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {poem_sents: []};

    this.setPoem = this.setPoem.bind(this);
    this.generateHandler = this.generateHandler.bind(this);
  }

  setPoem(poem) {
    var p = poem;
    p = p.replace(/，/g, "，$");
    p = p.replace(/。/g, "。$");
    var ps = p.split('$');

    this.setState({
      poem_sents: ps
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
    let poem = null;

    if (this.state.poem_sents.length >= 4) {
      poem = (
        <h1 class="splash-head poem">
          <div>
            <p>  {this.state.poem_sents[0]} </p>
            <p>  {this.state.poem_sents[1]} </p>
            <p>  {this.state.poem_sents[2]} </p>
            <p>  {this.state.poem_sents[3]} </p>
          </div>
        </h1>
      )
    } else {
      poem = (
        <p>  </p>
      )
    }
    return (
      <div class="with-chinese">
        <div class="splash-container">
          <div class="splash">
            <p class="splash-subhead">
              基於深度網絡、符合平仄押韻的五言絕句生成系統。
            </p>

            <p>
              <a class="pure-button pure-button-primary button-xlarge" onClick={this.generateHandler}>
                點此唸兩句詩
              </a>
            </p>

            {poem}
          </div>
        </div>

        <div class="content-wrapper">
          <div class="content">
            <div class="content-head is-center">
              <p>
                藉由<a href="https://openreview.net/forum?id=SyqShMZRb&noteId=SyqShMZRb" target="_blank" rel="noopener noreferrer">此提交論文所提出技術</a>，
                由 <a href="https://chainer.org/" target="_blank" rel="noopener noreferrer">Chainer</a> 實現，利用<a href="http://ytenx.org/" target="_blank" rel="noopener noreferrer">韻典</a>所提供《廣韻》、《平水韻》以規定平仄押運。
              </p>
              <p>
                在線 Demo 基於 <a href="https://reactjs.org/ " target="_blank" rel="noopener noreferrer">React</a> 構建，
                使用 <a href="https://purecss.io" target="_blank" rel="noopener noreferrer">Pure CSS</a>。
              </p>
            </div>
          </div>
        </div>
      </div>



    );
  }
}

export default App;
