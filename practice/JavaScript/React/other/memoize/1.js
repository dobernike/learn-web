import React from "react";
import logo from "./logo.svg";
import { Wrapper } from "./Wrapper";

function App() {
  const names = ["Alice", "Bob"];

  return <Shuffle names={names} />;
}

function Shuffle(props) {
  const { names } = props;

  const [name, setName] = React.useState(names[0]);
  const getName = React.useCallback(() => {
    const index = Math.floor(Math.random() * names.length);
    setName(names[index]);
  }, [names]);

  const clearName = React.useCallback(() => {
    setName(null);
  }, []);

  return (
    <Wrapper>
      <img src={logo} className="logo" alt="logo" />
      <h1>Memoize Test with Name Shuffling</h1>

      {React.useMemo(() => {
        console.log("Name re-render");
        return (
          <>
            <h2>Selected Name: {name ? name : "None"}</h2>
          </>
        );
      }, [name])}

      <Button label="Shuffle" click={getName} />
      <Button label="Clear" click={clearName} />
    </Wrapper>
  );
}

function WrappedButton(props) {
  console.log("button Re-render");
  return (
    <button
      onClick={() => {
        props.click();
      }}
    >
      {props.label}
    </button>
  );
}

const Button = React.memo(WrappedButton);

export default App;
