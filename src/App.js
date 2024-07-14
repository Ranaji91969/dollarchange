import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Todo from './Todo';
import Navbar from './Component/Navbar';
import Sidebar from './Component/Sidebar';
import SearchResults from './SearchResults'; // Create a new component for search results

function App() {
    return (
        <div className="App">
            <div className="nav">
                <Navbar />
            </div>
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="App1">
                <header className="App-header">
                    <Routes>
                        <Route path="/" element={<Todo />} />
                        <Route path="/search-results" element={<SearchResults />} />
                    </Routes>
                </header>
            </div>
        </div>
    );
}

export default App;
