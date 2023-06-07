import './App.css';
//import { useState, useEffect } from 'react';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {

	const appState = useSelector(state => state);

	// RENDERING

	let message = <p></p>
	if (appState.login.loading) {
		message = <p>Loading ...</p>
	}
	if (appState.shopping.error) {
		message = <p>{appState.shopping.error}</p>
	}
	if (appState.login.error) {
		message = <p>{appState.login.error}</p>
	}
	if (appState.login.isLogged) {
		return (
			<div className="App">
				<Navbar />
				<div style={{ height: 25, textAlign: "center", padding: '5px' }}>
					{message}
				</div>
				<Routes>
					<Route path="/" element={<ShoppingList />} />
					<Route path="/form" element={<ShoppingForm />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</div>
		);
	} else {
		return (
			<div className="App">
				<Navbar />
				<div style={{ height: 25, textAlign: "center", padding: '5px' }}>
					{message}
				</div>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</div>
		)
	}
}

export default App;
