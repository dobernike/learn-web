// Rendering

import { React } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";

let Home = () => <div>Home</div>;
let Dash = () => <div>Dash</div>;

render(
  <Router>
    <Home path="/" />
    <Dash path="dashboard" />
  </Router>
);

// Navigate with Link

let Home = () => (
  <div>
    <h1>Home</h1>
    <nav>
      <Link to="/">Home</Link> | <Link to="dashboard">Dashboard</Link>
    </nav>
  </div>
);

let Dash = () => <div>Dash</div>;

render(
  <Router>
    <Home path="/" />
    <Dash path="dashboard" />
  </Router>
);

// Parse data from the URL

// at url "/invoice/23"
render(
  <Router>
    <Home path="/" />
    <Invoice path="invoice/:invoiceId" />
  </Router>
);

const Invoice = props => (
  <div>
    <h1>Invoice {props.invoiceId}</h1>
  </div>
);

// It`s the same as rendering the component directly.
<Invoice InvoiceId={23} />;

// Ambiguous Paths and Ranking

render(
  <Router>
    <Home path="/" />
    <Invoice path=":invoiceId" />
    <InvoiceList path="invoices" />
  </Router>
);

/*
Don`t worry about the order of your paths
The URL '/invoices' will render <InvoiceList/> and '/123' will rener <Invoice invoiceId={123} />. Home render on exactly match '/'.
*/

// Nested Component Paths

const Dash = ({ children }) => (
  <div>
    <h1>Dashboard</h1>
    <hr />
    {children}
  </div>
);

render(
  <Router>
    <Home path="/" />
    <Dash path="dashboard">
      <Invoices path="invoices" />
      <Team path="team" />
    </Dash>
  </Router>
);

// '/dashboard/invoices' render <Dash><Invoices/></Dash> if '/dashboard' only see <Dash/>

const Main = ({ children }) => (
  <div>
    <h1>Welcome to the App!</h1>
    <ul>
      <li>
        <Link to="dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="invoices">Invoices</Link>
      </li>
    </ul>
    <hr />
    {children}
  </div>
);

render(
  <Router>
    <Main path="/">
      <Invoices path="invoices" />
      <Dash path="dashboard" />
    </Main>
  </Router>
);

// Relative Links

render(
  <Router>
    <Home path="/" />
    <Dash path="dashboard">
      <Invoices path="invoices" />
      <Team path="team" />
    </Dash>
  </Router>
);

const Dash = ({ children }) => (
  <div>
    <h1>Dashboard</h1>
    <nav>
      <Link to="invoices">Invoices</Link>
      <Link to="team">Team</Link>
    </nav>
    <hr />
    {children}
  </div>
);

// Index Paths
// route to parent component '/'
render(
  <Router>
    <Home path="/" />
    <Dash path="dashboard">
      <DashboardGraphs path="/" />
      <InvoiceList path="invoices" />
    </Dash>
  </Router>
);

// Not found 'Default' Components

const NotFound = () => <div>Sorry, nothing here.</div>;

render(
  <Router>
    <Home path="/" />
    <Dash path="dashboard">
      <DashboardGraphs path="/" />
      <InvoiceList path="invoices" />
    </Dash>
    <NotFound default />
  </Router>
);

// Multiple Routers

render(
  <div>
    <Sidebar>
      <Router primary={false}>
        <HomeNav path="/" />
        <DashboardNav path="dashboard" />
      </Router>
    </Sidebar>

    <MainScreen>
      <Router>
        <Home path="/">
          <About path="about" />
          <Support path="support" />
        </Home>
        <Dash path="dashboard">
          <Invoices path="invoices" />
          <Team path="team" />
        </Dash>
      </Router>
    </MainScreen>
  </div>
);

// Embedded Routers
render(
  <Router>
    <Home path="/" />
    <Dash path="dashboard/*" />
  </Router>
);

const Dash = () => (
  <div>
    <p>A nested router</p>
    <Router>
      <DashboardGraphs path="/" />
      <InvoiceList path="invoices" />
    </Router>
  </div>
);

// Navigating Programmatically
import { navigate } from "@reach/router";

const Invoices = () => (
  <div>
    <NewInvoiceForm
      onSubmit={async event => {
        const newInvoice = await createInvoice(event.target);
        navigate("/invoices/${newInvoice.id}");
      }}
    />
  </div>
);

// better
const Invoices = ({ navigate }) => (
  <div>
    <NewInvoiceForm
      onSubmit={async event => {
        const newInvoice = await createInvoice(event.target);
        // can navigate to relative paths
        navigate(newInvoice.id);
      }}
    />
  </div>
);
<Router>
  <Invoices path="invoices" />
  <Invoice path="invoices/:id" />
</Router>;

// with React Suspense
class Invoices extends React.Component {
  state = {
    creatingNewInvoice: false;
  }

  render() {
    return (
      <div>
        <LoadingBar animate={this.state.creatingNewInvoice} />
        <NewInvoiceForm onSubmit={async event => {
          this.setState({ creatingNewInvoie: true });
          const newInvoice = await createInvoice(event.target);
          await navigate('/invoice/${newInvoice.id}');
          this.setState({ creatingNewInvoie: false })
        }} />
      </div>
    )
  }
}
