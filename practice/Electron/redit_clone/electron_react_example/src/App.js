import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    axios
      .get('https://reddit.com/r/aww.json')
      .then((response) => {
        const data = response.data.data.children;
        console.log(data);
      })
      .catch(console.log);
  }

  render() {
    return (
      <div className="App">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
          <li className="list-group-item">Morbi leo risus</li>
          <li className="list-group-item">Porta ac consectetur ac</li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul>
      </div>
    );
  }
}

export default App;
