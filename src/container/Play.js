import React, {Component} from 'react';
import Options from '../component/Options';
import Spinner from '../component/Spinner';
import Lottie from 'react-lottie';
import resim from '../../src/trivia.jpeg';

import * as corrrectQuestion from '../Animations/tick-green.json';

class Play extends Component{

  constructor(){
    super();
    this.state = {
      timer: 15,
      qNumber: 1,
      questions: {},
      score: 0,
      selectedAnswer: '',
      evaluate: false
    }
  }
  

  // set the questions to the state
  componentDidMount(){
    this.setState({
      questions: this.props.questions,
    })
    this.timer()
  }

  // clock timer
  timer(){
      setInterval(() => {
        if(this.state.timer === false) return
        if(this.state.timer === 1){
          this.setState({
            evaluate: 'spin',
        })
        }
        if(this.state.timer < 1){
          this.setState({
            evaluate: 'no time',
            selectedAnswer: false
        })
        } else {
          this.setState({
            timer: this.state.timer - 1
          })
        }
      }, 1000)
  }

  // change selected answer
  change(a){
    this.setState({selectedAnswer: a})
  }

  // evaluate if answer is right
  evaluate(){
    setTimeout(()=>{
      this.setState({evaluate: 'spin', timer: false})
    }, 250)

    setTimeout(()=>{
      if (this.state.selectedAnswer === this.state.questions[this.state.qNumber - 1].correctAns){
        this.setState({
          evaluate: 'correct',
          score: this.state.score + 100,
        })
        
      } else{
        this.setState({
          evaluate: 'wrong',
        })
      }
    }, 450)

  }

  next(){
    if(this.state.qNumber === 10){
      this.props.finished('pass')
    }
    setTimeout(()=>{
      this.setState({evaluate: 'spin', timer: false})
    }, 150)
    setTimeout(()=>{
      this.setState({
        timer: 15,
        qNumber: this.state.qNumber + 1,
        evaluate: false,
        selectedAnswer: ''
      })
    },300)
  }


  click(){
    if(this.state.evaluate === false){
      this.evaluate()
    } else {
      this.next()
    }
  }



  render(){

    let question;
    let options;
    let answer;
    let opt;
                          
    if(this.state.questions.length > 1){

      question = this.state.questions[this.state.qNumber - 1].question
      answer = this.state.questions[this.state.qNumber - 1].correctAns
      options = this.state.questions[this.state.qNumber -1].options
      opt = options.map((ans, i) => {
        return <Options 
                  key={i}
                  option={ans}
                  answer={answer}
                  change={(a)=>this.change(a)} />
      })
    }

    // spinner
    if(this.state.evaluate === 'spin'){
      opt = <Spinner />
    }
    
    // correct answer
    if(this.state.evaluate === 'correct'){

      const correctOptions = {
    loop: true,
    autoplay: true, 
    animationData: corrrectQuestion,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

        opt = 
        
        <div className="evaluate" style={{marginBottom:"4rem"}}>
          <img src={resim} alt="trivia" style={{widh:"4rem",height:"4rem"}}/>
          {/* <Lottie options={correctOptions}
              height={400}
              width={400} /> */}
                <h1>Correct!</h1>
                <h1>You have earned 100 Points</h1>
                <h1>Total : {this.state.score}</h1>

              </div>
    }

    // wrong answer
    if(this.state.evaluate === 'wrong'){
      this.props.finished('fail');
         opt = <div className="evaluate">
                 <h1 >You are wrong!</h1>
                 <p>The answer is: {decodeURIComponent(this.state.questions[this.state.qNumber - 1].correctAns)}</p>
                 <p>{decodeURIComponent(this.state.questions[this.state.qNumber - 1].correctAns)}</p>
               </div>
    }

    // run out of time
    if(this.state.evaluate === 'no time'){
      this.props.finished('time')
      opt = <div className="evaluate">
              <h1 >You run out of time. Think faster!</h1>
              <p>The answer is;</p>
              <p>{decodeURIComponent(this.state.questions[this.state.qNumber - 1].correctAns)}</p>
            </div>
    }



    return (
      <div className="play">

        <div className="top">
          <p>Question  {this.state.qNumber} / 10</p>
          <p>{this.state.score} Points</p>
          <p>Remaining Time: {this.state.timer === false ? 0 : this.state.timer}</p>
          
        </div>
        
        <div className="question">
          <h1>Question {this.state.qNumber}</h1>
          <h1>{decodeURIComponent(question)}</h1>
        </div>


        <div className='options'>
          {opt}
        </div>
       
        <button
          style={{marginTop:"2rem"}}
          disabled={this.state.selectedAnswer === '' ? true : false}
          onClick={()=>{
            if(this.state.evaluate === false){
              this.evaluate()
            } else {
              this.next()
            }
          }}>
            {this.state.evaluate === false ? 'Check my answer!' :
              'Continue!'}</button>
      </div>
  )}
}

export default Play