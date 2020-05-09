import React from 'react';
import Spinner from '../component/Spinner';
import Category from '../component/Category';
import Difficulty from '../component/Difficulty';

export default (props) => {

  let btn = props.spinner ? <Spinner /> : 
            <button
              onClick={()=>props.click('play')}>Test me now!</button>

  return (
    <div className="init">
      <h1>Trivia Crack</h1>
      <p>This app tests how good you are in general information and 
        current events. You are given 15 seconds to answer each question of 10. 
        Each question is in multiple choice. If you make a mistake, test is over</p>
        <Category handleCategory={props.handleCategory} />
          <Difficulty handleDifficulty={props.handleDifficulty} />
      {btn}
    </div>
  )
}
