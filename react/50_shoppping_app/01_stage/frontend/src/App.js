import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {

  const [state, setState] = useState({
    list: []
  })

  const [urlRequest, setUrlRequest] = useState({
    url: "",
    request: {},
    action: ""
  })

  //get list whenever page is loaded
  useEffect(() => {
    getList();
  }, [])  //<-- remember this empty array to avoid infinite loop!!


  //useEffect
  useEffect(() => {

    const fetchData = async () => {
      //if no url
      if (!urlRequest.url) {
        return;
      }
      const response = await fetch(urlRequest.url, urlRequest.request);
      if (!response) {
        console.log("No response.");
        return;
      }
      //if there is a request
      if (response.ok) {
        switch (urlRequest.action) {
          case "getlist":
            const data = await response.json();
            if (!data) {
              return;
            }
            setState({
              list: data
            })
            return;
          case "additem":
          case "removeitem":
          case "edititem":
            getList();
            return;
          default:
            return;
        }

      } else {
        //status error
        console.log("Server responded with a status " + response.status + " " + response.statusText);
      }
    }
    //call the function
    fetchData();
  }, [urlRequest]);

  //rest API

  //get request
  const getList = () => {
    setUrlRequest({
      url: "/api/shopping",
      request: {
        "method": "GET"
      },
      action: "getlist"
    })
  }

  //post request
  const addItem = (item) => {
    setUrlRequest({
      url: "/api/shopping",
      request: {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify(item)
      },
      action: "additem"
    })
  }

  //delete request
  const removeItem = (id) => {
    setUrlRequest({
      url: "/api/shopping/" + id,
      request: {
        "method": "DELETE"
      },
      action: "removeitem"
    })
  }

  //put request
  const editItem = (item) => {
    setUrlRequest({
      url: "/api/shopping/" + item._id,
      request: {
        "method": "PUT",
        "headers": {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify(item)
      },
      action: "edititem"
    })
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<ShoppingList list={state.list} removeItem={removeItem} editItem={editItem} />} />
        <Route path='/form' element={<ShoppingForm addItem={addItem} />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>

    </div>
  );
}

export default App;
