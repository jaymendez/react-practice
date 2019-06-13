import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Landing from './components/layout/Landing';
import ReactDOM from 'react-dom';
import AppBar from './components/materialize/appbar';
import CreateProject from './components/createProject/createProject';
import CreateProject2 from './components/createProject2';
import Dnd from './components/testing/DragAndDrop';

function App() { 
    return (
      <div className="App">
        <Router>
            <AppBar text="Signed in as Geo" />
            <div className="App"  style={{ margin: 10 }}> 
                <Route exact path="/" component={ Landing } />
                {/* <Landing /> */}
                <div className="container"> 
                    <Route exact path="/create" component={ CreateProject2 } />
                    <Route exact path="/dnd" component={ Dnd } />
                </div> 
            </div>
        </Router>
      </div>
    );
}

export default App;
