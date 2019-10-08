import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(name, number, address) {
    let body = JSON.stringify({ name: name, number: number, address: address });

    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    })
      .then(response => {
        return response.json();
      })
      .then(json => this.addNewUser(json));
  }

  handleDelete(id) {
    fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      this.deleteUser(id);
    });
  }

  deleteUser(id) {
    let newUsers = this.state.users.filter(user => user.id !== id);
    this.setState({
      users: newUsers
    });
  }

  componentDidMount() {
    fetch("http://localhost:3001/users")
      .then(response => {
        return response.json();
      })
      .then(json => this.setState({ users: json }));
  }

  addNewUser(user) {
    this.setState({
      users: this.state.users.concat(user)
    });
  }

  renderContats() {
    return this.state.users.map(user => (
      <tr>
        <td>{user.name}</td>
        <td>{user.address}</td>
        <td>{user.number}</td>
        <td>
          <button onClick={() => this.handleDelete(user.id)}>Delete</button>
        </td>
      </tr>
    ));
  }

  renderForm() {
    let formFields = {};

    return (
      <div>
        <h3>Create New User</h3>
        <input
          ref={input => (formFields.name = input)}
          placeholder="Enter the name of user"
        />
        <input
          ref={input => (formFields.number = input)}
          placeholder="Enter the number of the user"
        />
        <input
          ref={input => (formFields.address = input)}
          placeholder="Enter the address of the user"
        />
        <button
          onClick={() =>
            this.handleFormSubmit(
              formFields.name.value,
              formFields.number.value,
              formFields.address.value
            )
          }
        >
          Submit
        </button>
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.renderForm()}
        <h3>User List</h3>
        <table>
          <thead>
            <th>Name</th>
            <th>Number</th>
            <th>Address</th>
          </thead>
          <tbody>{this.renderContats()}</tbody>
        </table>
      </div>
    );
  }
}
export default App;
