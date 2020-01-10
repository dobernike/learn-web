const SimpleList = () => (
  <ul>
    {["a", "b", "c"].map(function(item) {
      return <li key={item}>{item}</li>;
    })}
  </ul>
);

const list = ["a", "b", "c"];
const SimpleList = () => (
  <ul>
    {list.map(function(item) {
      return <li key={item}>{item}</li>;
    })}
  </ul>
);

const list = ["a", "b", "c"];
const SimpleList = () => (
  <ul>
    {list.map(item => {
      return <li key={item}>{item}</li>;
    })}
  </ul>
);

const list = ["a", "b", "c"];
const SimpleList = () => (
  <ul>
    {list.map(item => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

const mylist = ["a", "b", "c"];
const App = () => <SimpleList list={mylist} />;
const SimpleList = ({ list }) => (
  <ul>
    {list.map(item => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

import React from "react";
const list = [
  {
    id: "a",
    firstname: "Robin",
    lastname: "Wieruch",
    year: 1988
  },
  {
    id: "b",
    firstname: "Dave",
    lastname: "Davidds",
    year: 1990
  }
];
const ComplexList = () => (
  <ul>
    {list.map(item => (
      <li key={item.id}>
        <div>{item.id}</div>
        <div>{item.firstname}</div>
        <div>{item.lastname}</div>
        <div>{item.year}</div>
      </li>
    ))}
  </ul>
);
export default ComplexList;

import React from "react";
const list = [
  {
    id: "a",
    firstname: "Robin",
    lastname: "Wieruch",
    year: 1988
  },
  {
    id: "b",
    firstname: "Dave",
    lastname: "Davidds",
    year: 1990
  }
];
const nestedLists = [list, list];
const NestedList = () => (
  <ul>
    {nestedLists.map((nestedList, index) => (
      <ul key={index}>
        <h4>List {index + 1}</h4>
        {nestedList.map(item => (
          <li key={item.id}>
            <div>{item.id}</div>
            <div>{item.firstname}</div>
            <div>{item.lastname}</div>
            <div>{item.year}</div>
          </li>
        ))}
      </ul>
    ))}
  </ul>
);
export default NestedList;

const list = [
  {
    id: "a",
    firstname: "Robin",
    lastname: "Wieruch",
    year: 1988
  },
  {
    id: "b",
    firstname: "Dave",
    lastname: "Davidds",
    year: 1990
  }
];
const App = () => <List list={list} />;
const List = ({ list }) => (
  <ul>
    {list.map(item => (
      <ListItem key={item.id} item={item} />
    ))}
  </ul>
);
const ListItem = ({ item }) => (
  <li>
    <div>{item.id}</div>
    <div>{item.firstname}</div>
    <div>{item.lastname}</div>
    <div>{item.year}</div>
  </li>
);

const List = ({ list }) => (
  <ul>
    {(list || []).map(item => (
      <ListItem key={item.id} item={item} />
    ))}
  </ul>
);

import React from "react";
const initialList = [];
const List = () => {
  const [list, setList] = React.useState(initialList);
  return (
    <div>
      <ul>
        {list.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
export default List;

import React from "react";
const initialList = ["Learn React", "Learn Firebase", "Learn GraphQL"];
const ListWithAddItem = () => {
  const [value, setValue] = React.useState("");
  const [list, setList] = React.useState(initialList);
  const handleChange = event => {
    setValue(event.target.value);
  };
  const handleSubmit = event => {
    if (value) {
      setList(list.concat(value));
    }
    setValue("");
    event.preventDefault();
  };
  return (
    <div>
      <ul>
        {list.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={handleChange} />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};
export default ListWithAddItem;

import React from "react";
const initialList = [
  { id: "a", name: "Learn React", complete: false },
  { id: "b", name: "Learn Firebase", complete: false },
  { id: "c", name: "Learn GraphQL", complete: false }
];
const ListWithUpdateItem = () => {
  const [list, setList] = React.useState(initialList);
  const handleChangeCheckbox = id => {
    setList(
      list.map(item => {
        if (item.id === id) {
          return { ...item, complete: !item.complete };
        } else {
          return item;
        }
      })
    );
  };
  return (
    <ul>
      {list.map(item => (
        <li key={item.id}>
          <label>
            <input
              type="checkbox"
              checked={item.complete}
              onChange={() => handleChangeCheckbox(item.id)}
            />
            {item.name}
          </label>
        </li>
      ))}
    </ul>
  );
};
export default ListWithUpdateItem;

import React from "react";
const initialList = [
  { id: "a", name: "Learn React" },
  { id: "b", name: "Learn Firebase" },
  { id: "c", name: "Learn GraphQL" }
];
const ListWithRemoveItem = () => {
  const [list, setList] = React.useState(initialList);
  const handleClick = id => {
    setList(list.filter(item => item.id !== id));
  };
  return (
    <ul>
      {list.map(item => (
        <li key={item.id}>
          <label>{item.name}</label>
          <button type="button" onClick={() => handleClick(item.id)}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};
export default ListWithRemoveItem;
