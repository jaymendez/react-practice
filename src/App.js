import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Landing from './components/layout/Landing';
import ReactDOM from 'react-dom';
import AppBar from './components/materialize/appbar';
import CreateProject from './components/createProject/createProject';

function App() { 
    return (
      <div className="App">
        <Router>
                <AppBar text="Signed in as Geo" />
                <div className="App"  style={{ margin: 10 }}> 
                    <Route exact path="/" component={ Landing } />
                    {/* <Landing /> */}
                    <div className="container"> 
                        <Route exact path="/create" component={ CreateProject } />
                    </div> 
                </div>
            </Router>
      </div>
    );
}

export default App;
