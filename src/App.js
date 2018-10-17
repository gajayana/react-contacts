import React, { Component } from 'react';
import './App.css';

class Contact extends Component {

  handleImage(str) {
    return (str.indexOf('http://') === 0 || str.indexOf('https://') === 0) 
              ? 
              str.replace('http://', 'https://') 
              : 
              'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';
  }

  render() {
    const profileImageStyle = {
      backgroundImage : 'url("' + this.handleImage(this.props.item.photo) + '")'
    };
  
    return(
      <div className="pa-1">
        <div className="App--profile-image" style={profileImageStyle}></div>
        <div className="text-center">
          <div>{this.props.item.firstName} {this.props.item.lastName}</div>
          <div><small>{this.props.item.age} years of age</small></div>
        </div>
        <div>
          <button type="button">Update</button>
          <button onClick={this.props.remove.bind(this, this.props.item)} type="button">Remove</button>
        </div>
      </div>
    );
  }
}

class CreateForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      is_saving: false,
      last_name: '',
      age: 1,
      photo: '',
    }
    
    this.disableButton = this.disableButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  disableButton() {
    let res = false;
    if (!this.state.first_name || this.state.first_name.length < 3) res = true;
    if (!this.state.last_name || this.state.last_name.length < 3) res = true;
    if (this.state.photo.indexOf('https://') !== 0) res = true;
    // console.log(this.state.photo.indexOf('https://') !== 0);
    return res;
  }

  handleChange(event) {
    const name = event.target.name;
    let value = event.target.value.trim();

    // make sure age value is a number
    if (name === 'age') value = parseInt(value, 10);

    // make sure photo value starts https://
    if (name === 'photo') value = value.replace('http://', 'https://');

    this.setState({
      [name] : value
    });
  }

  handleSave() {
    let data = {
      firstName: this.state.first_name,
      lastName: this.state.last_name,
      age: this.state.age,
      photo: this.state.photo
    };
    
    this.setState({is_saving: true});

    fetch(this.props.url + '/contact', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        this.reset();
        this.props.updateContacts();
      })
      .catch(error => console.log(error));
  }

  reset() {
    this.setState({
      first_name: '',
      is_saving: false,
      last_name: '',
      age: 1,
      photo: '',
    });
  }

  render() {
    const ages = [...Array(200)].map((v, i) => i + 1);

    return (
      <form className="App--form">
        <div className="mb-1">
          <label className="App--form-label">First Name</label>
          <input className="App--form-input" disabled={this.state.is_saving} maxLength="25" name="first_name" type="text" value={ this.state.first_name } onChange={ this.handleChange }></input>
        </div>
        <div className="mb-1">
          <label className="App--form-label">Last Name</label>
          <input className="App--form-input" disabled={this.state.is_saving} maxLength="25" name="last_name" type="text" value={ this.state.last_name } onChange={ this.handleChange }></input>
        </div>
        <div className="mb-1">
          <label className="App--form-label">Photo URL</label>
          <input className="App--form-input" disabled={this.state.is_saving} name="photo" type="text" value={ this.state.photo } onChange={ this.handleChange }></input>
        </div>
        <div className="mb-1">
          <label className="App--form-label">Your Age</label>
          {/* <input className="App--form-input" min="0" max="150" name="age" type="number" value={ this.state.age } onChange={ this.handleChange }></input> */}
          <select className="App--form-input" disabled={this.state.is_saving} name="age" value={ this.state.age } onChange={ this.handleChange }>
            { 
              ages.map((num) => {
                return (<option value={num} key={'age-' + num}>{num}</option>)
              })
            }
          </select>
        </div>
        <div>
          <button disabled={this.disableButton()} onClick={this.handleSave} type="button">Save</button>
          <button disabled={this.state.is_saving} onClick={this.props.toggle} type="button">Cancel</button>
        </div>
      </form>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      is_loading: true,
      show_create_form: false,
      // 2018-10-16
      // No 'Access-Control-Allow-Origin' header is present in ay request, hence the use of cors-available.herokuapp.com.
      url: 'https://cors-available.herokuapp.com/https://simple-contact-crud.herokuapp.com',
    }

    this.handleRemove = this.handleRemove.bind(this);
    this.toggleCreateForm = this.toggleCreateForm.bind(this);
    this.updateContacts = this.updateContacts.bind(this);
  }

  handleRemove(item) {
    const items = this.state.contacts.filter((ob) => {
      return ob !== item;
    });
    this.setState({contacts: items});

    // 2018-10-17 19:59:00+07:00
    // this will return error 400
    // {message: "contact unavailable"}
    // same result when testing at https://simple-contact-crud.herokuapp.com/documentation#!/contact/deleteContactId
    fetch(this.state.url + '/contact/' + item.id, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })
      .then(res => res.json())
      .then(result => console.log(result))
      .catch(error => console.log(error));
  }

  render() {
    let items;

    if (this.state.is_loading ) {
      items = (<p>Loading contacts...</p>)
    } else {
      items = this.state.contacts.map((item) => {
        return (<Contact item={item} key={item.id} remove={this.handleRemove} />);
      });
    }

    return (
      <div className="App">
        <div className="App--profiles">{ items }</div>
        <div className="bt-1 pa-1">
          { this.state.show_create_form ? <CreateForm toggle={this.toggleCreateForm} url={this.state.url} /> : null }
          { !this.state.show_create_form ? <button onClick={this.toggleCreateForm} type="button">Create</button> : null }
        </div>
      </div>
    );
  }

  componentDidMount() {
    fetch(this.state.url + '/contact')
      .then(res => res.json())
      .then((result) => {
        this.setState({
          contacts : result.data, 
          is_loading: false
        })
      })
      .catch(error => console.log(error))
  }

  toggleCreateForm() {
    this.setState({
      show_create_form: !this.state.show_create_form
    })
  }

  updateContacts() {

  }
}

export default App;
