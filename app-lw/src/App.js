import ReactDOM from 'react-dom';
import React, { useState } from "react";
import { render } from '@testing-library/react';
import './App.css';

class SegmentSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.props.onSegmentChange(e.target.value);
  }

  handleClick(e) {
    this.props.onResetClick();
  }

  render() {
    const segMax = this.props.segMax;
  return(
    <div id="selectionWidget">
      {segMax === "0" &&
      <div>
      <label>Choose your clock type:</label>
      <br/>
      <select value={segMax} onChange={this.handleChange}>
        <option value="0">Select Clock</option>
        <option value="4">4 - Complex</option>
        <option value="6">6 - Considerable</option>
        <option value="8">8 - Daunting</option>
      </select>
      </div>
       }
       {segMax !== "0" && <button id="resetButton" onClick={this.handleClick}>Reset</button>}
    </div>
  ) }
}

function Counter(props) {
  let [counter, setCounter] = useState(0);
  
  return(
      <div id="counterWidget">
        { props.segMax === 0 && setCounter(0) }
        <button onClick={() => (counter > 0) ? setCounter(counter = counter - 1) : counter}>-</button>
        <h2 id="currentCountWidget"> &nbsp;{counter} / {props.segMax}&nbsp; </h2>
        <button onClick={() => (counter < props.segMax) ? setCounter(counter = counter + 1) : counter}>+</button>
      </div>
    )
  }

class CounterDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }
  

  handleChange(e) {
    this.props.onDescriptionChange(e.target.value)
  }

  render() {
    const descriptionText = this.props.descriptionText;
    return(
      <div id="descriptionWidget">
        <div>
          <textarea 
            maxLength="100"
            rows="4"
            columns="25"
            id="descriptionBox"
            type="text" 
            placeholder="Clock description"
            value={descriptionText} 
            onChange={this.handleChange}
           />
        </div>
      </div>
    )
  }

}

class IndividualCounter extends React.Component {
  constructor(props) {
    super(props);
    this.handleSegmentChange = this.handleSegmentChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = {segMax: '0', descriptionText: ''};
    }

  handleSegmentChange(segMax) {
    this.setState({segMax});
  }

  handleDescriptionChange(descriptionText) {
    this.setState({descriptionText});
  }

  handleResetClick(segMax, descriptionText) {
    this.setState({segMax: "0", descriptionText: ''});
  }

  render(){
    const segMax = this.state.segMax;
    const descriptionText = this.state.descriptionText;
    return(
      <div>
        <SegmentSelector 
          segMax={segMax} 
          onSegmentChange={this.handleSegmentChange} 
          onResetClick={this.handleResetClick} />
        <CounterDescription 
          descriptionText={descriptionText} 
          onDescriptionChange={this.handleDescriptionChange} />
        <br/>
        <Counter segMax={segMax}/>
      </div>
  );
  }
}

export default function App(props) {
  return(
    <div>
      <header>
         <h2>Lightning Wall v1.1: A Blades in the Dark Companion App</h2>
      </header>
      <main>
        <div id='wrapper'>
          <div className="indCounterPane"><IndividualCounter /></div>
          <div className="indCounterPane"><IndividualCounter /></div>
          <div className="indCounterPane"><IndividualCounter /></div>
          <div className="indCounterPane"><IndividualCounter /></div>
          <div className="indCounterPane"><IndividualCounter /></div>
          <div className="indCounterPane"><IndividualCounter /></div>
        </div>
      </main>
      <footer>
        <p>by L. Norman, based on the <a href="https://bladesinthedark.com/"> Blades in the Dark</a> role-playing game by John Harper</p>
      </footer>
    </div>
  )
}