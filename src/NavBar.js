import React, { Component } from 'react';
import { FormattedMessage } from "react-intl";

class NavBar extends Component {
  render() {
    return (
      <div class="header">
        <div class="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">
            <a class="pure-menu-heading" href=""> <FormattedMessage id={'title'}/> </a>

            <ul class="pure-menu-list">
                <li class="pure-menu-item">
                  <a href="#" class="pure-menu-link"  onClick={()=>{this.props.onLocaleChange('zh')}}>中文</a>
                </li>
                <li class="pure-menu-item">
                  <a href="#" class="pure-menu-link"  onClick={()=>{this.props.onLocaleChange('en')}}>English</a>
                </li>
                <li class="pure-menu-item">
                  <a href="https://alantian.net" class="pure-menu-link" target="_blank" rel="noopener noreferrer">
                    <FormattedMessage id={'author_webpage'}/>
                  </a>
                </li>
            </ul>
        </div>
      </div>
    )
  }
}

export default NavBar;
