import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import distanceCalulator from './distanceCalulator';
import Output from './Output';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zipOne: '',
      zipTwo: '',
      zipOneData: {},
      zipTwoData: {},
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
  };

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let zipOne = this.state.zipOne;
    let zipTwo = this.state.zipTwo;
    console.log(evt)
    axios.get(`api/${zipOne}`)
      .then(res => res.data)
      .then(data => {
        console.log(data)
        this.setState({
          zipOneData: data
        })
      })
      .catch(error => console.error(error.response))
    axios.get(`api/${zipTwo}`)
      .then(res => res.data)
      .then(data => this.setState({
        zipTwoData: data
      }))
      .catch(error => console.error(error.response))
  }

  validate(input) {
    let inputValid = input.match(/[\d]{5}/) && input !== '00000';
    return !inputValid;
  }

  render() {
    const errorOne = this.validate(this.state.zipOne);
    const errorTwo = this.validate(this.state.zipTwo);
    const errorStyle = { color: 'red' }
    const zipOneData = this.state.zipOneData;
    const zipTwoData = this.state.zipTwoData;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Zip Code Distance Calculator</h1>
          <h4>
            This app uses the haversine formula to calculate the approximate
            distance between US zip codes. Please enter two valid 5-digit zip
            codes to continue.
          </h4>
        </header>
        <div className="App-intro">
          <form
            className='ui form'
            onSubmit={this.handleSubmit}>
            <div className='field'>
              <label>Starting Zip Code</label>
              <input
                className={errorOne ? 'error' : ''}
                maxLength='5'
                value={this.state.zipOne}
                name='zipOne'
                onChange={this.handleChange}></input>
            </div>
            <div className='field'>
              <label>Destination Zip Code</label>
              <input
                className={errorTwo ? 'error' : ''}
                maxLength='5'
                value={this.state.zipTwo}
                name='zipTwo'
                onChange={this.handleChange}></input>
            </div>
            <div className='field'>
              <button disabled={errorOne || errorTwo} className='ui button' name='submit'>Get distance</button>
            </div>
            <div className='result'>
              {
                (zipOneData && zipOneData.lat) && (zipTwoData && zipTwoData.lat) ?
                  <div style={{ margin: '1em', borderWidth: '3px', borderStyle: 'solid' }}>
                    <Output zipOneData={zipOneData} zipTwoData={zipTwoData} />
                  </div> : ''
              }
              {errorOne || errorTwo ?
                <div style={errorStyle}>Please enter two valid 5-digit US zip codes</div> :
                ''
              }
              {zipOneData === null ? <div style={errorStyle}>The starting zip code is invalid</div> : ''}
              {zipTwoData === null ? <div style={errorStyle}>The destination zip code is invalid</div> : ''}
            </div>
          </form>
        </div>
      </div >
    );
  }
}

export default App;
