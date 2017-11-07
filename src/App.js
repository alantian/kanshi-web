import React, { Component } from 'react';
import './App.css';
import Config from './Config.js';
import NavBar from './NavBar.js';
import Content from './Content.js';

import { IntlProvider, addLocaleData, FormattedMessage } from "react-intl";
import zh_locale from './locale/zh_locale';
import en_locale from './locale/en_locale';
import en from "react-intl/locale-data/en";
import zh from "react-intl/locale-data/zh";
addLocaleData([...en,...zh,]);


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      poem_sents: [],
      locale : this.chooseDefaultLocale(),
    };

    this.setPoem = this.setPoem.bind(this);
    this.generateHandler = this.generateHandler.bind(this);
  }

  chooseDefaultLocale(){
      switch(navigator.language.slice(0,2)){
          case 'en':
              return 'en';
          case 'zh':
              return 'zh';
          default:
              return 'en';
      }
  }

  getLocaleMessage(){
        switch(this.state.locale){
            case 'en':
                return en_locale;
            case 'zh':
                return zh_locale;
            default:
                return en_locale;
        }
    }

  handleLocaleChange(newLocale){
    this.setState({
        locale: newLocale,
    });
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

      <IntlProvider
        locale={this.state.locale}
        messages={this.getLocaleMessage()}
      >

        <div class="with-chinese">

          <NavBar onLocaleChange={nl=>this.handleLocaleChange(nl)} />

          <div class="splash-container">
            <div class="splash">
              <p class="splash-subhead">
                <FormattedMessage id={'intro'}/>
              </p>

              <p>
                <a class="pure-button pure-button-primary button-xlarge" onClick={this.generateHandler}>
                  <FormattedMessage id={'generate_poem'}/>
                </a>
              </p>
              {poem}
            </div>
          </div>

          <Content locale={this.state.locale}/>
        </div>

      </IntlProvider>

    );
  }
}

export default App;
