import React from "react";
import { Paper, List, Container } from "@material-ui/core";
import Todo from './Todo';

import './App.css';
import AddTodo from "./AddTodo";
import { call } from "./service/ApiService";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  add = (item) => {
    // const thisItem = this.state.items;
    // item.id = "ID-" + thisItem.length;
    // item.done = false;
    // thisItem.push(item);
    // this.setState({items: thisItem});
    // console.log("items: ", this.state.items);
    call("/todo", "POST", item).then(response => {
      this.setState({items: response.data})
    })
  }

  update = (item) => {
    call("/todo", "PUT", item).then(response => {
      this.setState({items: response.data})
    })
  }

  delete = (item) => {
    // const thisItems = this.state.items;
    // console.log("Before Update Items : ", this.state.items)
    // const newItems = thisItems.filter(e => e.id !== item.id);
    // this.setState({items: newItems}, () => {
    //   // 콜백
    //   console.log("Update Items : ", this.state.items);
    // });
    call("/todo", "DELETE", item).then(response => {
      this.setState({items: response.data})
    })
  }

  render() {
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{margin: 16}}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo 
              item={item} 
              key={item.id} 
              delete={this.delete} 
              update={this.update}
            />
          ))}
        </List>
      </Paper>
    )
 
    return (
      <div className="App">
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    );
  }

  componentDidMount() {
    call("/todo", "GET", null).then(response => {
      // console.log(response)
      this.setState({items: response.data})
    })
  }
}

export default App;
