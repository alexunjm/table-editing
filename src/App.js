import React, { Component } from 'react';

import Layout from "./components/Layout/Layout";
import TableContainer from './containers/Table/TableContainer';

class App extends Component {
  render() {
    return (
        <Layout>
          <TableContainer />
        </Layout>
      );
  }
}

export default App;
