var ace = require('brace');
var React = require('react');

module.exports = React.createClass({
  propTypes: {
    mode  : React.PropTypes.string,
    theme : React.PropTypes.string,
    name : React.PropTypes.string,
    height : React.PropTypes.string,
    width : React.PropTypes.string,
    fontSize : React.PropTypes.number,
    showGutter : React.PropTypes.bool,
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
    onLoad: React.PropTypes.func,
    maxLines : React.PropTypes.number,
    readOnly : React.PropTypes.bool,
    highlightActiveLine : React.PropTypes.bool,
    showPrintMargin : React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      name   : 'brace-editor',
      mode   : '',
      theme  : '',
      height : '500px',
      width  : '500px',
      value  : '',
      fontSize   : 12,
      showGutter : true,
      onChange   : null,
      onLoad     : null,
      maxLines   : null,
      readOnly   : false,
      highlightActiveLine : true,
      showPrintMargin     : true
    };
  },
  onChange: function() {
    var value = this.editor.getValue();
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  },
  componentDidMount: function() {
    this.editor = ace.edit(this.props.name);
    this.editor.$blockScrolling = Infinity;
    this.editor.getSession().setMode('ace/mode/'+this.props.mode);
    this.editor.setTheme('ace/theme/'+this.props.theme);
    this.editor.setFontSize(this.props.fontSize);
    this.editor.on('change', this.onChange);
    this.editor.setValue(this.props.value, 1);
    this.editor.renderer.setShowGutter(this.props.showGutter);
    this.editor.setOption('maxLines', this.props.maxLines);
    this.editor.setOption('readOnly', this.props.readOnly);
    this.editor.setOption('highlightActiveLine', this.props.highlightActiveLine);
    this.editor.setShowPrintMargin(this.props.setShowPrintMargin);

    if (this.props.onLoad) {
      this.props.onLoad(this.editor);
    }

    //To focus the ace editor
    this.editor.focus();
    var session = this.editor.getSession();
    //Get the number of lines
    var count = session.getLength();
    //Go to end of the last line
    this.editor.gotoLine(count, session.getLine(count-1).length);
  },

  componentWillReceiveProps: function(nextProps) {
    this.editor = ace.edit(nextProps.name);
    this.editor.getSession().setMode('ace/mode/'+nextProps.mode);
    this.editor.setTheme('ace/theme/'+nextProps.theme);
    this.editor.setFontSize(nextProps.fontSize);
    this.editor.setOption('maxLines', nextProps.maxLines);
    this.editor.setOption('readOnly', nextProps.readOnly);
    this.editor.setOption('highlightActiveLine', nextProps.highlightActiveLine);
    this.editor.setShowPrintMargin(nextProps.setShowPrintMargin);
    if (this.editor.getValue() !== nextProps.value) {
      this.editor.setValue(nextProps.value, 1);
    }
    this.editor.renderer.setShowGutter(nextProps.showGutter);
    if (nextProps.onLoad) {
      nextProps.onLoad(this.editor);
    }
  },

  render: function() {
    var divStyle = {
      width: this.props.width,
      height: this.props.height
    };
    return (<div id={this.props.name} onChange={this.onChange} style={divStyle}></div>);
  }
});
