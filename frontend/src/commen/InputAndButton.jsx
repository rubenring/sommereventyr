import React, { Component } from 'react';
import './inputAndButton.css';

export class InputAndButton extends Component {
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onChange(e){
    this.props.onChange(e.target.value)
  }
  onClick(){
    this.props.onClick(this.props.value)
  }
  render(){
    return (
      <section className='input-and-button'>
         <label htmlFor={this.props.id} className='input-and-button-label'>
          {this.props.label}
          <br/>
          <input 
            className='input-and-button-input'
            id={this.props.id} 
            value={this.props.value} 
            onChange={this.onChange} 
          />
         </label>
         <button 
          className='input-and-button-button'
          onClick={this.onClick}
         >
          Send svar
         </button>
      </section>
    );
  }

};