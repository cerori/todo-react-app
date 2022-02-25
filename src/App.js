import React from "react";
import { 
  Paper, 
  List, 
  Container, 
  Grid, 
  Button, 
  AppBar, 
  Toolbar, 
  Typography 
} from "@material-ui/core";
import Todo from './Todo';

import './App.css';
import AddTodo from "./AddTodo";
import { call, logout} from "./service/ApiService";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true
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

    var navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justifyContent="space-between" container>
            <Grid item>
              <Typography variant="h6">오늘의 할일</Typography>
            </Grid>
            <Grid>
              <Button color="inherit" onClick={logout}>
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )

    var todoListPage = (
      <div>
        {navigationBar}
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    )

    var loadingPage = <h1>로딩중...</h1>;

    var content = loadingPage;

    if (!this.state.loading) {
      content = todoListPage;
    }
 
    return (
      <div className="App">
        {content}
      </div>
    );
  }

  componentDidMount() {
    call("/todo", "GET", null).then(response => {
      // console.log(response)
      this.setState({items: response.data, loading: false})
    })
  }
}

export default App;
