import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { Component } from 'react';
import './App.css';
import Formula from './Formula/Formula';
import Introduction from './Introduction/Introduction';
import Card from './Cards/Cards';
import WeightDecrease from './Cards/WeightDecrease';
import WeightIncrease from './Cards/WeightIncrease';
// import { thisExpression } from '@babel/types';
 import Graph from './Graph/Graph';



class App extends Component {
  state =  {
    Gender: '',
    Age: '',
    Weight: '',
    Height: '',
    Activity: '1.375',
    DisplayFormula: false,
    DisplayCut: false,
    DisplayBulk: false,
    DisplayGraph: false,
    Calories: '',
    Modifier: '',
    CarbModifier: '0.4',
    FatModifier: '0.4',
    ProteinModifier: '0.2',
    IsButtonActive: false,
  };

  handleGenderChange = (event) => {
    this.setState({
      Gender: event.target.value,
    });
  };

  handleAgeChange = (event) => {
    this.setState({
      Age: event.target.value,
    });
  };

  handleWeightChange = (event) => {
    this.setState({
      Weight: event.target.value,
    });
  };

  handleHeightChange = (event) => {
    this.setState({
      Height: event.target.value,
    });
  };

  handleActivityChange = (event) => {
    this.setState({
      Activity: event.target.value,
    })
  };

  buttonClickHandler = () => {
    this.setState({
      DisplayFormula: true,
      Calories: this.state.Gender === "Male" ? parseInt(((10 * this.state.Weight) + (6.25 * this.state.Height) - (5 * this.state.Age) + 5) * this.state.Activity) : parseInt(((10 * this.state.Weight) + (6.25 * this.state.Height) - (5 * this.state.Age) - 161) * this.state.Activity),
      DisplayCut: false,
      DisplayBulk: false,
      DisplayGraph: false,
    })
    let ButtonName = document.getElementById('Calc-Btn');
    if(ButtonName.firstChild.data === 'Go back!') {
      ButtonName.firstChild.data = 'Calculate!'
    } else { ButtonName.firstChild.data = 'Calculate!' };
  };

  cutButtonHandler = () => {
    this.setState({
      DisplayFormula: false,
      DisplayCut: true,
      DisplayGraph: true,
      Modifier: -300,
      CarbModifier: '0.4',
      FatModifier: '0.4',
      ProteinModifier: '0.2'
    })
    document.getElementById('Calc-Btn').firstChild.data = 'Go back!';
  };

  bulkButtonHandler = () => {
    this.setState({
      DisplayFormula: false,
      DisplayBulk: true,
      DisplayGraph: true,
      Modifier: 300,
      CarbModifier: '0.4',
      FatModifier: '0.4',
      ProteinModifier: '0.2'
    })
    document.getElementById('Calc-Btn').firstChild.data = 'Go back!';
  };

  lowCarbHandler = () => {
    this.setState({
      CarbModifier: '0.25',
      FatModifier: '0.5',
      ProteinModifier: '0.25'
    });
  };

  highCarbHandler = () => {
    this.setState({
      CarbModifier: '0.5',
      FatModifier: '0.25',
      ProteinModifier: '0.25'
    })
  };


  render() {
    return (
    <div className="App container col-md-6 col-sm-12 py-5 justify-content-center">
      <Introduction />
      <form>
        <div className="form-check-inline col-2 justify-content-center pb-2">
          <input 
            type="radio" 
            value="Male" 
            name="gender" 
            className="form-check-input"
            onChange={this.handleGenderChange}
            id="male-check"
            />
          <label className="form-check-label" htmlFor="male-check">
            Male
          </label>
        </div>

        <div className="form-check-inline col-2 justify-content-center pb-2">
          <input 
            type="radio" 
            value="Female" 
            name="gender"
            className="form-check-input"
            onChange={this.handleGenderChange}
            id="female-check"
            /> 
          <label className="form-check-label" htmlFor="female-check">
            Female
          </label>
        </div>  
      
        <div className="form-group row justify-content-center">
          <label htmlFor="age" className="col-2 col-form-label">Age:</label> 
          <div className="col-4">
          <input 
            type="number" 
            name="age" 
            onChange={this.handleAgeChange}
            className="form-control"
            id="age"
            placeholder="(years)"
          />
          </div>
        </div>
        <div className="form-group row justify-content-center">
          <label htmlFor="weight" className="col-2 col-form-label">Weight:</label>
          <div className="col-4">
          <input 
            type="number" 
            name="weight" 
            onChange={this.handleWeightChange}
            className="form-control"
            id="weight"
            placeholder="(kg)"
          />
          </div>
        </div>
        <div className="form-group row justify-content-center">
          <label htmlFor="height" className="col-2 col-form-label">Height:</label>
          <div className="col-4">
          <input 
            type="number" 
            name="height" 
            onChange={this.handleHeightChange}
            className="form-control"
            id="height"
            placeholder="(cm)"
          />
          </div>
        </div>
        <div className="form-group row justify-content-center">
          <label htmlFor="activity" className="col-2 col-form-label">Activity:</label> 
          {/* Activity values are basically RMR multipliers, used later on in the Formula */}
          <div className="col-4">
          <select className="form-control" id="activity" value={this.state.Activity} onChange={this.handleActivityChange}>
            <option 
              value="1.2">Sedentary lifestyle
              </option>
            <option 
              value="1.375">Light excercise, 1-2 times per week
              </option>
            <option
              value="1.550">Moderate excercise, 3-5 times per week
              </option>
            <option
              value="1.725">Hard excercise, 6-7 times per week
              </option>
            <option
              value="1.9">Athlete, two times per day
              </option>
          </select>
          </div>
        </div>
      </form>
        <div className="py-2">
          <button  
            className="btn btn-primary"
            onClick={this.buttonClickHandler}
            id="Calc-Btn">
              Calculate!
          </button>
        </div>
      {this.state.DisplayFormula ?
        <Formula 
        gender={this.state.Gender}
        age={this.state.Age}
        weight={this.state.Weight}
        height={this.state.Height}
        activity={this.state.Activity}
        display={this.state.DisplayFormula}
        calories={this.state.Calories}
      /> : null
      }
      {this.state.DisplayFormula ?
        <Card
        handleCutButton={this.cutButtonHandler}
        handleBulkButton={this.bulkButtonHandler}
        />
      : null }
      {this.state.DisplayCut ? 
        <WeightDecrease 
        calories={this.state.Calories}
        handleClassic={this.cutButtonHandler}
        handleLowCarb={this.lowCarbHandler}
        handleHighCarb={this.highCarbHandler}
        />
      : null } 
      {this.state.DisplayBulk ? 
        <WeightIncrease 
        calories={this.state.Calories}
        handleClassic={this.bulkButtonHandler}
        handleLowCarb={this.lowCarbHandler}
        handleHighCarb={this.highCarbHandler}
        />
      : null }
      {/* {this.state.DisplayGraph ?
        <CanvasJSChart options={graphProperties} 
        />
      : null } */}
     {this.state.DisplayGraph ?
      <Graph  
        carbohydrates={parseInt((this.state.Calories + this.state.Modifier) * this.state.CarbModifier / 4)}
        fat={parseInt((this.state.Calories + this.state.Modifier) * this.state.FatModifier / 9)}
        protein={parseInt((this.state.Calories + this.state.Modifier) * this.state.ProteinModifier / 4)}
      />
    : null }
    </div>
  )};
}

export default App;
