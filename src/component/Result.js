import React, {Fragment} from 'react';
import Lottie from 'react-lottie';
import resim from '../../src/trivia.jpeg';
import * as succesData from '../Animations/confetti.json';
import * as failureData from '../Animations/student.json';

export default function (props){
  let text;

  const successOptions = {
    loop: true,
    autoplay: true, 
    animationData: succesData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const failureOptions = {
    loop: true,
    autoplay: true, 
    animationData: failureData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  if(props.pass){
    text = <Fragment>
              <h2>Congratulations!</h2>
              {/* <Lottie options={successOptions}
              height={400}
              width={400} /> */}
                        <img src={resim} alt="trivia" style={{widh:"4rem",height:"4rem"}}/>

              <p>You knew all the questions in this test</p>
              <button 
                onClick={()=>props.play()}>Play Again!</button>
            </Fragment> 
  } else {
    text = <Fragment>
      {/* <Lottie options={failureOptions}
              height={400}
              width={400} /> */}
              <h2>Sorry!</h2>
              <img src={resim} alt="trivia" style={{widh:"4rem",height:"4rem"}}/>

              <p>You gotta study more</p>
              <button
                onClick={()=>props.play()}>Try Again!</button>
            </Fragment> 
  }

  return (
   <div className="result">
     {text}
    </div>
  );
}
