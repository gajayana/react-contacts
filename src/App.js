import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';



function handleImage(str) {
  return (str.indexOf('http://') === 0 || str.indexOf('https://') === 0) 
            ? 
            str.replace('http://', 'https://') 
            : 
            'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';
}

const Contact = ({item}) => {
  let profileImageStyle = {
    backgroundImage : 'url("' + handleImage(item.photo) + '")'
  };

  return(
    <div className="App--profile-box">
      <div className="App--profile-image" style={profileImageStyle}></div>
      <div className="text-center">{item.firstName} {item.lastName}</div>
      <div>
        <button>Update</button>
        <button>Remove</button>
      </div>
    </div>
  );
};

const ContactsList = ({items}) => {
  const persons = items.map((item) => {
    return (<Contact item={item} key={item.id} />);
  });
  return (<div className="App--profiles">{ persons }</div>);
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    }
    // No 'Access-Control-Allow-Origin' header is present.
    this.url = 'https://cors-anywhere.herokuapp.com/https://simple-contact-crud.herokuapp.com';
    // this.url = 'https://simple-contact-crud.herokuapp.com';

    this.handleCreate = this.handleCreate.bind(this);
  }

  render() {
    return (
      <div className="App">
        <ContactsList items={ this.state.contacts } />
        <div><button onClick={this.handleCreate}>Create</button></div>
      </div>
    );
  }

  componentDidMount() {
    
    fetch(this.url + '/contact')
      .then(res => res.json())
      .then((result) => {
        this.setState({contacts : result.data})
      })
      .catch(error => console.log(error))
  }

  handleCreate() {
    // this.setState({
    //   arrayvar: [...this.state.arrayvar, newelement]
    // })
    this.setState({
      contacts: [...this.state.contacts, {
        "id": "93ad6070-c92b-11e8-b02f-cbfa15db428c",
        "firstName": "Bilbo",
        "lastName": "Baggins",
        "age": 111,
        "photo": "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550"
      }]
    })
  }
}

export default App;
