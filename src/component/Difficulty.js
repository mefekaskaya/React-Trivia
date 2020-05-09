import React from 'react';
import './Section.css';

export default function Difficulty(props) {

    const {handleDifficulty} = props;

    const Difficulties = [
        {value:0,label:'Any Difficulty'},
        {value:1,label:'easy'},
        {value:2,label:'medium'},
        {value:3,label:'hard'},
    ]


    return (
        <div>
            <select
              className="select-css"
              onChange={handleDifficulty}
              style={{ margin: "1rem 1rem",textTransform:"capitalize" }}
            >
              <option defaultValue>Choose Difficulty</option>
              {Difficulties.map((difficulty,index) => (
                <option key={index} data-key={difficulty.label} value={difficulty.label}>
                  {difficulty.label}
                </option>
              ))}
            </select>
        </div>
    )
}
