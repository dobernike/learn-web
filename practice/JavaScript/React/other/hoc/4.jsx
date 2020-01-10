const starWarsChars = [
  { name: "Luke", side: "light" },
  { name: "Darth Vader", side: "dark" },
  { name: "Obi-wan Kenobi", side: "light" },
  { name: "Palpatine", side: "dark" }
];

class FilteredList extends React.Component {
  constructor(props) {
          super(props)      this.state = { value: this.props.defaultState }
        }
           updateState(value) {      this.setState({ value })   }   render() {      const otherSide = this.state.value === 'dark' ? 'light' : 'dark';      const transformedProps = this.props.list.filter(char =&gt; char.side === this.state.value)      return (         <div>            <button onClick={() => this.updateState(otherSide)}>Switch</button>            {transformedProps.map(char =&gt;               <div key={char.name}>                  <div>Character: {char.name}</div>                  <div>Side: {char.side}</div>               </div>            )}         </div>      )   }
}

ReactDOM.render (   <FilteredList defaultState='dark' list={starWarsChars} />,   document.getElementById('app'))


const numbers = [1, 5, 8, 10, 21]
const createAddingFunction = number =&gt; arr => arr.map(num =&gt; num + number)const numbersPlusOne = createAddingFunction(1)console.log(numbersPlusOne(numbers))  // [2, 6, 9, 11, 22]
