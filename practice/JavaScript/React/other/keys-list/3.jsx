const joshs = [{ Name: "Josh" }, { Name: "Joshina" }, { Name: "Notjosh" }];

<div>
  {joshs.map((person, index) => (
    <span key={index}>{person.name}</span>
  ))}
</div>;

[
  {
    Type: "span",
    Key: "0",
    Children: "Josh"
  },
  {
    Type: "span",
    Key: "1",
    Children: "Joshina"
  },
  {
    Type: "span",
    Key: "2",
    Children: "Notjosh"
  }
][
  ({
    Type: "span",
    Key: "0", // Expected 0 to match 'Josh'
    Children: "Mega Josh" // IM DIFFERENT, REDRAW ME
  },
  {
    Type: "span",
    Key: "1", // Expected 1 to match 'Joshina'
    Children: "Josh" // IM DIFFERENT, REDRAW ME
  },
  {
    Type: "span",
    Key: "2", // Expected 2 to match 'Notjosh'
    Children: "Joshina" // IM DIFFERENT, REDRAW ME
  },
  {
    Type: "span",
    Key: "3", // IM NEW
    Children: "Notjosh" // DRAW ME
  })
];

<div>
  {people.map((person, index) => (
    <span key={`key-${person.name}`}>{person.name}</span>
  ))}
</div>;

[
  {
    Type: "span",
    Key: "key-Josh",
    Children: "Josh"
  },
  {
    Type: "span",
    Key: "key-Joshina",
    Children: "Joshina"
  },
  {
    Type: "span",
    Key: "key-Notjosh",
    Children: "Notjosh"
  }
];

[
  {
    Type: "span",
    Key: "key-Mega Josh", // IM NEW
    Children: "Mega Josh" // DRAW ME
  },
  {
    Type: "span",
    Key: "key-Josh", // Expected 'key-Josh' to match 'Josh'
    Children: "Josh" // IM THE SAME, DONT REDRAW ME
  },
  {
    Type: "span",
    Key: "key-Joshina", // Expected 'key-Joshina' to match 'Joshina'
    Children: "Joshina" // IM THE SAME, DONT REDRAW ME
  },
  {
    Type: "span",
    Key: "key-Notjosh", // Expected 'key-Notjosh' to match 'Notjosh'
    Children: "Notjosh" // IM THE SAME, DONT REDRAW ME
  }
];
