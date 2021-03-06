import CanvasJSReact from '.././canvasjs.react.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { Component } from 'react';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graph extends Component {
  render() {
    const graphProperties = {
      animationEnabled: true,
      theme: "light1",
      title: {
        text: "Macronutrients Distribution for " + this.props.calories + " calories",
        fontWeight: "lighter",
        fontFamily: "tahoma",
        fontSize: 25,
      },
      axisY: {
        gridThickness: 0,
        labelFontColor: "transparent",
      },
      data: [{				
                type: "bar",
                indexLabelPlacement: "inside",
                indexLabel: "{label} - {y} 'grams'",
                dataPoints: [
                  { label: "Carbohydrates", y: this.props.carbohydrates  },
                  { label: "Fat", y: this.props.fat  },
                  { label: "Protein", y: this.props.protein  },
                ]
       }]
   };
   

  return (
   <CanvasJSChart options={graphProperties} 
   />
  )};
}
export default Graph; 