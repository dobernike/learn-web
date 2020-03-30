import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { observable, computed, configure, action, decorate } from "mobx";
import { observer } from "mobx-react";

configure({ enforceActions: `observed` });

class Store {
 devsList = [
    { name: "Jack", sp: 12 },
    { name: "Max", sp: 10 },
    { name: "Leo", sp: 8 }
  ];

  filter = '';

  get totalSum() {
    return this.devsList.reduce((sum, { sp }) => sum += sp, 0);
  }

  get topPerformer() {
    const maxSp = Math.max(...this.devsList.map(({sp}) => sp))

    return this.devsList.find(({sp, name}) => {
      if (maxSp === sp) {
        return name;
      }
    })
  }

  get filteredDevelopers() {
    const matchesFilter = new RegExp(this.filter, 'i')

    return this.devsList.filter(({name}) => !this.filter || matchesFilter.test(name))
  }

  clearList() {
    this.devsList = []
  }

  addDeveloper(dev) {
    this.devsList.push(dev)
  }

  updateFilter(value) {
    this.filter = value
  }
}

decorate(Store, {
  devsList: observable,
  filter: observable,
  totalSum: computed,
  topPerformer: computed,
  filteredDevelopers: computed,
  clearList: action,
  addDeveloper: action,
  updateFilter: action
})

const appStore = new Store();

const Row = ({ data: { name, sp } }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{sp}</td>
    </tr>
  );
};

@observer class Table extends Component {
  render() {
    const { store } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <td>Name:</td>
            <td>SP:</td>
          </tr>
        </thead>
        <tbody>
          {store.filteredDevelopers.map((dev, i) => (
            <Row key={i} data={dev} />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Team SP:</td>
            <td>{store.totalSum}</td>
          </tr>
          <tr>
            <td>Top Performer:</td>
            <td>{store.topPerformer ? store.topPerformer.name : ``}</td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

@observer class Controls extends Component {
  addDeveloper = () => {
    const name = prompt("The name:");
    const sp = parseInt(prompt("The story points:"), 10);
    this.props.store.addDeveloper({ name, sp });
  };

  clearList = () => {
    this.props.store.clearList();
  };

  filterDevelopers = ({target: {value}}) => {
    this.props.store.updateFilter(value)
  }

  render() {
    return (
      <div className="controls">
        <button onClick={this.clearList}>Clear table</button>
        <button onClick={this.addDeveloper}>Add record</button>
        <input value={this.props.store.filter} onChange={this.filterDevelopers} />
      </div>
    );
  }}

 class App extends Component {
  render() {
    return (
      <div>
        <h1>Sprint Board:</h1>
        <Controls store={appStore} />
        <Table store={appStore} />
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App store={Store} />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
