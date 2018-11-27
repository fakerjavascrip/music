import React, { Component } from 'react';
import { Router, Route, Redirect } from 'react-router';
import ReactDOM from 'react-dom'
import main from './components/main.jsx'
import { BrowserRouter,HashRouter } from 'react-router-dom';
import './App.css';
class App extends Component {
  constructor(props,context){
    super(props,context);
  }
  addTodo = ()=>{
    this.props.destroyTodo();
  }
  render(){
    return (
        <div className="App">
          <HashRouter>
          <Route path='/' component={main}></Route>
          </HashRouter>
        </div>
    );
  }
}
export default App;
