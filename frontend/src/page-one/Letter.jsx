import React, {Component} from 'react';
import './pageOne.css';

export class Letter extends Component{
  constructor(props){
    super(props);
    this.state = {
      active: false
    }
  }
  letterClick = (value) => {
    if(value === 'R'){
      this.setState({
        active: true
      })
    }
  }
  render(){
    return (
      <span 
        onClick={() => this.letterClick(this.props.text)} 
        className={`${this.state.active ? 'active-letter' : ''} letter`}> 
          { ` ${this.props.text} ` } 
        </span>
    );
  }
};
