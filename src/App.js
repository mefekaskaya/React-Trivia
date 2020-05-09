import React, {Component} from 'react';
import axios from 'axios';
import './App.css';


import Init from './container/Init'
import Play from './container/Play'
import Result from './component/Result'

class App extends Component {
  constructor(){
    super();
    this.state = {
      page: 'init',
      spinner: false,
      questions: {},
      level: 1,
      passed: false,
      token: '',
      category:0,
      difficulty:''
    }
    this.handleCategory=this.handleCategory.bind(this);
    this.handleDifficulty=this.handleDifficulty.bind(this);
  }

  handleCategory(e){
    const selectedIndexOfCategory = e.target.options.selectedIndex;
        this.setState({
          category:e.target.options[selectedIndexOfCategory].getAttribute('data-key')
        });
        console.log(this.state.category);
      }

  handleDifficulty(e){
    const selectedIndexOfDifficulty = e.target.options.selectedIndex;
        this.setState({difficulty:e.target.options[selectedIndexOfDifficulty].getAttribute('data-key')});
        console.log(this.state.difficulty);
      }

  shuffle(a) {
    return a.sort(() => Math.random() - 0.5)
  }

  start (){
    this.setState({spinner: !this.state.spinner})
    setTimeout(()=>{
      this.getUrl()  
    }, 300)
  }
    
  async getToken(){
    await axios.get('https://opentdb.com/api_token.php?command=request')
      .then(res => {
        this.setState({token: res.data.token})
      })
  }

  getUrl = async () => {
    if(this.state.token !== ''){
      this.getToken()
    }
    
    
    let url = (this.state.category!==0 && this.state.difficulty!=='') ? `https://opentdb.com/api.php?amount=10&category=${this.state.category}&difficulty=${this.state.difficulty}&type=multiple` : (this.state.category!==0 && this.state.difficulty==='') ? (`https://opentdb.com/api.php?amount=10&category=${this.state.category}&type=multiple`) : (this.state.category===0 && this.state.difficulty!=='') ? `https://opentdb.com/api.php?amount=10&difficulty=${this.state.difficulty}&type=multiple` : `https://opentdb.com/api.php?amount=10&type=multiple`
    
    let res = await axios.get(url)
    
    if (res.data.results) {
      let questions = res.data.results.map((q)=>{
        let opt = q.incorrect_answers
        opt.push(q.correct_answer)
        return {
          question: q.question,
          correctAns: q.correct_answer,
          options: this.shuffle(opt)
        }
      })
      this.setState({
        questions,
        page: 'play',
        spinner: false
      })
    }
  }

  finished(a){
    if(a === 'pass') {
      this.setState({page: 'result', passed: true})
    } else{
      this.setState({page: 'result'})
    }
  }

  play(){
    this.getUrl()
  }

  render(){
    let page = this.state.page === 'init' ? 
                  <Init 
                    click={(a)=>this.start(a)}
                    spinner={this.state.spinner}
                    handleCategory={this.handleCategory}
                    handleDifficulty={this.handleDifficulty} /> : 
                    
               this.state.page === 'play' ?
                  <Play 
                    questions={this.state.questions}
                    level={this.state.level}
                    finished={(a)=>this.finished(a)} /> : 

               this.state.page === 'result' ? 
                  <Result
                    pass={this.state.passed}
                    play={()=>this.play()}/> : null

    return (
      <div className="App">
        <div className="container">
          {page}
      </div>
    </div>
  )}
}

export default App;



