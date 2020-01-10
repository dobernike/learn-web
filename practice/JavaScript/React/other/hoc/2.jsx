import { Component } from "react";

const SomeNewComponent = withRouter(
  RequireAuth(LoaderDemo(GenericContainer(CustomForm(Form))))
);

class BestPracticesDemo extends Component {
  render() {
    return (
      <div className="contactApp">
        <ExtendedContactList
          authenticated={true}
          {...this.props}
          contacts="this"
        />
      </div>
    );
  }
}

const ContactList = ({ contacts }) => {
  return (
    <div>
      <ul>
        {contacts.map(contact => (
          <li key={contact.email}>
            <img
              src={contact.photo}
              width="100px"
              height="100px"
              alt="presentation"
            />
            <div className="contactData">
              <h4>{contact.name}</h4>
              <small>{contact.email}</small> <br />
              <small> {contact.phone}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const reqAPI = {
  reqUrl: "https://demo1443058.mockable.io/users/",
  reqMethod: "GET",
  resName: "contacts"
};

const ExtendedContactList = withRouter(
  withAuth(withGenericContainer(reqAPI)(withLoader("contacts")(ContactList)))
);

export default BestPracticesDemo;
