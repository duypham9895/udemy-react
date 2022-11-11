import React, { Component } from "react";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isShowBlock: false
    };
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    const { isModalOpen } = this.state;
    return (
      <div className="App">
        <h1>React Animations</h1>
        <button>Toggle</button>
        
        {isModalOpen && (
          <Modal isShow={isModalOpen} closed={this.closeModal.bind(this)} />
        )}
        {isModalOpen && (
          <Backdrop isShow={isModalOpen} closed={this.closeModal.bind(this)} />
        )}
        <button className="Button" onClick={this.openModal.bind(this)}>
          Open Modal
        </button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
