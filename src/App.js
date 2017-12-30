import React, { Component } from 'react';
import './App.css';
import Config from './Config.js';
import NavBar from './NavBar.js';
import Content from './Content.js';
import twitter_bird_logo from './twitter_bird_logo.svg'

import { IntlProvider, addLocaleData, FormattedMessage } from "react-intl";
import zh_locale from './locale/zh_locale';
import en_locale from './locale/en_locale';
import ja_locale from './locale/ja_locale';
import en from "react-intl/locale-data/en";
import zh from "react-intl/locale-data/zh";
import ja from "react-intl/locale-data/ja";
addLocaleData([...en,...zh,...ja]);


class App extends Component {

  constructor(props) {
    super(props);

    this.langcode_to_locale = {'en': en_locale, 'zh': zh_locale, 'ja': ja_locale};
    this.default_langcode = 'en';
    this.default_locale = en_locale;
    this.langcode_to_ui_div_class = {'en': 'ui-en', 'zh': 'ui-zh', 'ja': 'ui-ja'};
    this.default_ui_div_class = 'ui-en';

    this.chooseDefaultLocale = this.chooseDefaultLocale.bind(this);
    this.getLocaleMessage = this.getLocaleMessage.bind(this);
    this.getUIDivName = this.getUIDivName.bind(this);
    this.handleLocaleChange = this.handleLocaleChange.bind(this);
    this.setPoem = this.setPoem.bind(this);
    this.generateHandler = this.generateHandler.bind(this);

    this.state = {
      poem_sents: [],
      locale : this.chooseDefaultLocale(),
      ui_div_name: this.getUIDivName(this.chooseDefaultLocale()),
    };

  }

  chooseDefaultLocale(){
    var langcode = navigator.language.slice(0,2);
    return (langcode in this.langcode_to_locale) ? langcode : this.default_locale;
  }

  getLocaleMessage() {
    return this.langcode_to_locale[this.state.locale] || this.default_locale;
  }

  getUIDivName(langcode) {
    return this.langcode_to_ui_div_class[langcode] || this.default_ui_div_class;
  }

  handleLocaleChange(newLocale){
    this.setState({
        locale: newLocale,
        ui_div_name: this.getUIDivName(newLocale),
    });
  }

  setPoem(poem) {
    var p = poem;
    p = p.replace(/，/g, "$");
    p = p.replace(/。/g, "$");
    var ps = p.split('$');

    this.setState({
      poem_sents: ps,
      poem_full: poem,
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

    /* Only chrome / opera on desktop show vertial text correctly now. */
    const { detect } = require('detect-browser');
    const browser = detect();
    console.log(browser);
    var poem_class = "poem";
    if (browser && browser.os !== "iOS") {
      switch (browser.name) {
        case 'chrome':
        case 'opera':
          poem_class = "poem-rl";
          break;
        default:
      }
    }
    poem_class = "splash-head " + poem_class;

    var poem_content = null, share_content = null;
    if (this.state.poem_sents.length >= 4) {
      poem_content = (
        <div class={poem_class}>
          <div>
            <p>  {this.state.poem_sents[0]} </p>
            <p>  {this.state.poem_sents[1]} </p>
            <p>  {this.state.poem_sents[2]} </p>
            <p>  {this.state.poem_sents[3]} </p>
          </div>
        </div>
      )

      share_content = (
        <a
          class="pure-button pure-button-primary button-xlarge twitter-share-button"
          href={
            "https://twitter.com/intent/tweet?"
            + "text="
            + encodeURIComponent("「" + this.state.poem_full + "」" + " Automatically created by Five-syllable Chinese Quatrain Generator #KanshiGenerator :")
            + "&url="
            + encodeURIComponent("https://alantian.github.io/kanshi-web")
          }
          target="_blank" rel="noopener noreferrer"
        >
          <img src={twitter_bird_logo} alt="Twitter Logo" class="twitter-logo" />
          <FormattedMessage id={'share'}/>
        </a>
      )
    } else {
      poem_content = (
        <div> </div>
      )
    }

    var poem = null, share = null;
    poem = (
      <div class="poem-outer-wrapper">
        <div class="poem-inner-wrapper">
          {poem_content}
        </div>
      </div>
    )
    share = (
      <p>
        {share_content}
      </p>
    )

    return (

      <IntlProvider
        locale={this.state.locale}
        messages={this.getLocaleMessage()}
      >

        <div class={this.state.ui_div_name}>

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

              {share}

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
