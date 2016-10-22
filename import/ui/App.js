import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="navi">
          <h3>SITCON x HK 2016</h3>
          <ul>
            <li>
              <Link to="/">
                Home
              </Link>
            </li>
            <li>
              <Link to="/todo">
                Todo
              </Link>
            </li>
          </ul>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export const Home = () => (
  <div className="home-container">
    <div className="intro">
      <h2>Introduction to Meteor + React</h2>
    </div>
  </div>
);

export default App;

export const About = () => (
  <h2>About</h2>
);
