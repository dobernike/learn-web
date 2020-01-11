import React, { Component } from "react";

class ProductList extends Component {
  state = {
    products: []
  };

  componentDidMount() {
    getProducts().then(products => {
      this.setState({
        products
      });
    });
  }

  render() {
    return (
      <ul>
        {this.state.products.map(product => (
          <li>
            <span>{product.name}</span>
            <a href="#">Add to Cart</a>
          </li>
        ))}
      </ul>
    );
  }
}

export { ProductList };

import React, { Component } from "react";

class ProductTable extends Component {
  state = {
    products: []
  };

  componentDidMount() {
    getProducts().then(products => {
      this.setState({
        products
      });
    });
  }

  handleDelete = currentProduct => {
    const remainingProducts = this.state.products.filter(
      product => product.id !== currentProduct.id
    );
    deleteProducts(currentProduct.id).then(() => {
      this.setState({
        products: remainingProducts
      });
    });
  };

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>
                <button onClick={() => this.handleDelete(product)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export { ProductTable };

import React from "react";

const ProductList = ({ products }) => {
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          <span>{product.name}</span>
          <a href="#">Add to Cart</a>
        </li>
      ))}
    </ul>
  );
};

export { ProductList };

import React, { Component } from "react";

class ProductData extends Component {
  state = {
    products: []
  };

  componentDidMount() {
    getProducts().then(products => {
      this.setState({
        products
      });
    });
  }

  render() {
    return "what should we return here?";
  }
}

export { ProductData };

const sum = (a, b, fn) => {
  const result = a + b;
  fn(result);
};

//Usage

sum(1, 2, result => {
  console.log(result);
});

const alertFn = result => {
  alert(result);
};

sum(3, 6, alertFn);

import React, { Component } from "react";

class ProductData extends Component {
  state = {
    products: []
  };

  componentDidMount() {
    getProducts().then(products => {
      this.setState({
        products
      });
    });
  }

  render() {
    return this.props.render({
      products: this.state.products
    });
  }
}

export { ProductData };

<ProductData
  render={({ products }) => <ProductList products={products} />}
/>


<ProductData
  render={({ products }) => <ProductTable products={products} />}
/>


<ProductData render={({ products }) => (
  <h1>
      Number of Products:
      <strong>{products.length}</strong>
  </h1>

)} />

import React, { Component } from "react";

const withProductData = WrappedComponent =>
  class ProductData extends Component {
    state = {
      products: []
    };

    componentDidMount() {
      getProducts().then(products => {
        this.setState({
          products
        });
      });
    }

    render() {
      return <WrappedComponent products={this.state.products} />;
    }
  };

export { withProductData };

// Wrap ProductList, ProductTable to get the higher order components
const ProductListWithData = withProductData(ProductList);
const ProductTableWithData = withProductData(ProductTable);


// Use the higher order components just like normal components.

<div>
  <ProductListWithData />
  <ProductTableWithData />
</div>
