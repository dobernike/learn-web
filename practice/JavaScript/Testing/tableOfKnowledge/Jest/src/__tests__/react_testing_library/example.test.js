import React from "react";
import { render } from "@testing-library/react";
// first test
test("hello world", () => {
  const { getByText } = render(<p>Hello Jest!</p>);
  expect(getByText("Hello Jest!")).toBeInTheDocument();
});
// snapshots
test("shows out of cheese error message", () => {
  const { container } = render(<Pizza />);
  expect(container.firstChild).toMatchSnapshot();
});

test("shows out of cheese error message", () => {
  const { getByRole } = render(<Pizza />);
  const error = getByRole("alert").textContent;
  expect(error).toMatchInlineSnapshot("Error: Out of cheese!");
});

// <button data-testid="cookButton">Cook pizza!</button>
const { getByText } = render(<Pizza />);
getByText(/cook pizza!/i);
// or
const { getByTestId } render(<Pizza />);
getByTestId('cookButton');

// TESTING REACT COMPONENTS
// Testing rendering
import React from 'react';
import { render } from '@testing-library/react';
import Pizza from '../Pizza';

test('contains all ingredients', () => {
  const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];
  const { getByText } = render(<Pizza ingredients={ingredients} />);

  ingredients.forEach(ingredient => {
    expect(getByText(ingredient)).toBeInTheDocument();
  });

// Testing user interaction
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ExpandCollapse from '../ExpandCollapse';

test('button expands and collapses the content', () => {
  const children = 'Hello world';
  const { getByText, queryByText } = render(
    <ExpandCollapse excerpt="Information about dogs">
      {children}
    </ExpandCollapse>
  );

  expect(queryByText(children)).not.toBeInTheDocument();

  fireEvent.click(getByText(/expand/i));

  expect(queryByText(children)).toBeInTheDocument();

  fireEvent.click(getByText(/collapse/i));

  expect(queryByText(children)).not.toBeInTheDocument();
});

// Testing event handlers
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '../Login';

test('submits username and password', () => {
  const username = 'me';
  const password = 'please';
  const onSubmit = jest.fn();
  const { getByLabelText, getByText } = render(
    <Login onSubmit={onSubmit} />
  );

  fireEvent.change(getByLabelText(/username/i), {
    target: { value: username }
  });

  fireEvent.change(getByLabelText(/password/i), {
    target: { value: password }
  });

  fireEvent.click(getByText(/log in/i));

  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith({
    username,
    password
  });
});

// Async tests
const wait = (time = 0) =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

test('something async', async () => {
  // Run an async operation...
  await wait(100).then(() => {
    expect(getByText(/done!/i)).toBeInTheDocument();
  });
});

import { wait } from '@testing-library/react';

test('something async', async () => {
  // Run an async operation...
  await wait(() => {
    expect(getByText(/done!/i)).toBeInTheDocument();
  });
});

test('something async', async () => {
  expect.assertions(1);
  // Run an async operation...
  expect(await findByText(/done!/i)).toBeInTheDocument();
});

// Testing network requests and mocks
import React from 'react';

const defaultFetchIngredients = () => fetch(URL).then(r => r.json());

export default function RemotePizza({ fetchIngredients }) {
  const [ingredients, setIngredients] = React.useState([]);

  const handleCook = () => {
    fetchIngredients().then(response => {
      setIngredients(response.args.ingredients);
    });
  };

  return (
    <>
      <button onClick={handleCook}>Cook</button>
      {ingredients.length > 0 && (
        <ul>
          {ingredients.map(ingredient => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      )}
    </>
  );
}

RemotePizza.defaultProps = {
  fetchIngredients: defaultFetchIngredients
};

import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import RemotePizza from '../RemotePizza';

const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];

test('download ingredients from internets', async () => {
  expect.assertions(4);

  const fetchIngredients = () =>
    Promise.resolve({
      args: { ingredients }
    });
  const { getByText } = render(
    <RemotePizza fetchIngredients={fetchIngredients} />
  );

  fireEvent.click(getByText(/cook/i));

  await wait(() => {
    ingredients.forEach(ingredient => {
      expect(getByText(ingredient)).toBeInTheDocument();
    });
  });
});

export const fetchIngredients = () =>
  fetch(
    'https://httpbin.org/anything?ingredients=bacon&ingredients=mozzarella&ingredients=pineapples'
  ).then(r => r.json());

  import React from 'react';
  import { fetchIngredients } from '../services';

  export default function RemotePizza() {
    /* Same as above */
  }

  import React from 'react';
  import { render, fireEvent, wait } from '@testing-library/react';
  import RemotePizza from '../RemotePizza';
  import { fetchIngredients } from '../../services';

  jest.mock('../../services');

  afterEach(() => {
    fetchIngredients.mockReset();
  });

  const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];

  test('download ingredients from internets', async () => {
    expect.assertions(4);

    fetchIngredients.mockResolvedValue({ args: { ingredients } });

    const { getByText } = render(<RemotePizza />);

    fireEvent.click(getByText(/cook/i));

    await wait(() => {
      ingredients.forEach(ingredient => {
        expect(getByText(ingredient)).toBeInTheDocument();
      });
    });
  });

  import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import RemotePizza from '../RemotePizza';

const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];

afterAll(() => {
  fetchMock.restore();
});

test('download ingredients from internets', async () => {
  expect.assertions(4);

  fetchMock.restore().mock(/https:\/\/httpbin.org\/anything\?.*/, {
    body: { args: { ingredients } }
  });

  const { getByText } = render(<RemotePizza />);

  fireEvent.click(getByText(/cook/i));

  await wait(() => {
    ingredients.forEach(ingredient => {
      expect(getByText(ingredient)).toBeInTheDocument();
    });
  });
});

import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import nock from 'nock';
import RemotePizza from '../RemotePizza';

const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];

afterEach(() => {
  nock.restore();
});

test('download ingredients from internets', async () => {
  expect.assertions(5);

  const scope = nock('https://httpbin.org')
    .get('/anything')
    .query(true)
    .reply(200, { args: { ingredients } });

  const { getByText } = render(<RemotePizza />);

  fireEvent.click(getByText(/cook/i));

  expect(scope.isDone()).toBe(true);

  await wait(() => {
    ingredients.forEach(ingredient => {
      expect(getByText(ingredient)).toBeInTheDocument();
    });
  });
});

// debugging
const { debug } = render(<p>Hello Jest!</p>);
debug();
// -> <p>Hello Jest!</p>

debug(getByText(/expand/i));
