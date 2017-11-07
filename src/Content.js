import React, { Component } from 'react';
import './App.css';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale : props.locale,
    };
  }

  render(){

    var en_result = (
      <div>
        <p>
          Backend deep model is based on the method proposed in <a href="https://openreview.net/forum?id=SyqShMZRb&noteId=SyqShMZRb" target="_blank" rel="noopener noreferrer">this submission to ICLR</a>,
          implemented with <a href="https://chainer.org/" target="_blank" rel="noopener noreferrer">Chainer</a>,
          using traditional rhyme and tonal data (<a href="https://en.wikipedia.org/wiki/Guangyun">Guangyun</a>) from <a href="http://ytenx.org/" target="_blank" rel="noopener noreferrer">ytenx</a>.
        </p>
        <p>
          Online demo is implemented with <a href="https://reactjs.org/ " target="_blank" rel="noopener noreferrer">React</a>,
          with sytle sheets from <a href="https://purecss.io" target="_blank" rel="noopener noreferrer">Pure CSS</a>. Better viewed with <a href="https://www.google.com/get/noto/help/cjk/">Noto Sans CJK</a>.
        </p>
      </div>
    );

    var zh_result = (
      <div>
        <p>
          後臺深度模型藉由<a href="https://openreview.net/forum?id=SyqShMZRb&noteId=SyqShMZRb" target="_blank" rel="noopener noreferrer">此提交論文所提出技術</a>構建，
          由 <a href="https://chainer.org/" target="_blank" rel="noopener noreferrer">Chainer</a> 實現，利用<a href="http://ytenx.org/" target="_blank" rel="noopener noreferrer">韻典</a>所提供《廣韻》、《平水韻》以規定平仄押運。
        </p>
        <p>
          在線 Demo 基於 <a href="https://reactjs.org/ " target="_blank" rel="noopener noreferrer">React</a> 構建，
          使用 <a href="https://purecss.io" target="_blank" rel="noopener noreferrer">Pure CSS</a>。爲最佳顯示效果請安裝 <a href="https://www.google.com/get/noto/help/cjk/">Noto Sans CJK</a> 字體。
        </p>
      </div>
    );

    var result = null;
    if (this.props.locale === "en"){
      result = en_result;
    }else if (this.props.locale === "zh"){
      result = zh_result;
    }else {
      result = en_result;
    }

    return (
      <div class="content-wrapper">
        <div class="content">
          <div class="content-head is-center">
            {result}
          </div>
        </div>
      </div>
    )
  }
}

export default Content;
