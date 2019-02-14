import React from 'react';
import {
  AuthButton, LoggedIn, LoggedOut,
  Value, Image
} from '@solid/react';
import Button from "react-bootstrap/Button";
import VerticallyCenteredModal from './VerticallyCenteredModal';

const $rdf = require("rdflib");
const FOAF = new $rdf.Namespace('http://xmlns.com/foaf/0.1/');

class App extends React.Component {

  constructor (props){
    super(props);

    this.state = {
      modal: false,
      friends: []
    }
  }

  componentWillMount(){
    const store = $rdf.graph();
    const fetcher = new $rdf.Fetcher(store);

    const person = "https://ludwigschubert.solid.community/profile/card#me";
    var friends = [];
    fetcher.load(person).then((response) => {
      friends = store.each($rdf.sym(person), FOAF("knows"));
      console.log(friends)
      friends = friends.map(async (friend) => {
        var friendName = "";
        await fetcher.load(friend.value).then((response) => {
          friendName = store.any($rdf.sym(friend.value), FOAF("name"));
        })
        friends = this.state.friends
        friends.push(friendName.value);
        this.setState({friends: friends}); 
        return
      });
    });
  }

  toggleModal (){
    this.setState({ modal: !this.state.modal });
  }

  render () { 
    return (
    <div>
      <header>
        <h1>Solid App</h1>
        <AuthButton popup="popup.html" login="Login here!" logout="Logout here!"/>
      </header>
      <main>
        <LoggedIn>
          <Image src="user.image" defaultSrc="profile.svg" className="profile"/>
          <p>Welcome back, <Value src="user.name"/>.</p>
          <h2>Friends</h2>
          <Button onClick={this.toggleModal.bind(this)}>Show </Button>
          <VerticallyCenteredModal friends={this.state.friends} show={this.state.modal} onHide={this.toggleModal.bind(this)}></VerticallyCenteredModal>
        </LoggedIn>
        <LoggedOut>
          <p>You are logged out.</p>
        </LoggedOut>
      </main>
    </div>
  )};
}

export default App;