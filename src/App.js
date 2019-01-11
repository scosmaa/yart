import React, { Component } from 'react';
import Table from './Components/Table'
import './App.scss';

import columns from './fakeData/settings.json'
import data from './fakeData/data.json'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Table data={data} columns={columns}></Table>
      </div>
    );
  }
}

export default App;
