
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import '../../App.css';
import Table from '../materialize/captureme-table';
import Search from '../materialize/search_bar';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

 


class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: [],
            items: [{name: 'Jay'}, {name: 'Wick'}, {name: 'Jeremy'}]
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({
          filtered: this.state.items
        });
      }
      
      componentWillReceiveProps(nextProps) {
        this.setState({
          filtered: nextProps.items
        });
      }
 
    handleChange(e) {
            // Variable to hold the original version of the list
        let currentList = [];
            // Variable to hold the filtered list before putting into state
        let newList = [];

            // If the search bar isn't empty
        if (e.target.value !== "") {
            // Assign the original list to currentList
            currentList = this.state.items;
            console.log(this.state.items);
                    // Use .filter() to determine which items should be displayed
                    // based on the search terms
            newList = currentList.filter(item => {
                        // change current item to lowercase
                const lc = item.name.toLowerCase();
                        // change search term to lowercase
                const filter = e.target.value.toLowerCase();
                        // check to see if the current list item includes the search term
                        // If it does, it will be added to newList. Using lowercase eliminates
                        // issues with capitalization in search terms and search content
                return lc.includes(filter);
            });
        } else {
                // If the search bar is empty, set newList to original task list
            newList = this.state.items;
        }
            // Set the filtered state based on what our rules added to newList
        this.setState({
            filtered: newList
        });
    }

  render() {
    return (
        <div className="Landing">
          <br />
          <br />
          <Grid container spacing={24}  alignItems="flex-end">
            <Grid item xs={2} >
              <Typography component="h6" variant="h6" gutterBottom>
                Admin Projects
              </Typography>
            </Grid>
            <Grid item xs={4}>
                <Search onChange={this.handleChange} />
                {/* <input type="text" className="input" onChange={this.handleChange} placeholder="Search..." /> */}
            </Grid>
            <Grid item xs={4}>
              <Link to="/create" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{width: "30%"}}
                  // className={classes.button}
                >
                  Create Project
                </Button>
              </Link>
              
              <Button
                variant="contained"
                color="secondary"
                style={{width: "30%"}}
                // className={classes.button}
              >
                Users
              </Button>
            </Grid>
          </Grid>
            <br/>
            <Table data={this.state.filtered}></Table>
      </div>
    )
  }
}

export default Landing;