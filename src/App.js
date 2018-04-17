import React, { Component } from 'react';

import Layout from "./components/Layout/Layout";
import TableContainer from './containers/Table/TableContainer';

class App extends Component {
  render() {
    return <div>
        <Layout>
          <TableContainer />
        </Layout>
      </div>;
  }
}

export default App;
