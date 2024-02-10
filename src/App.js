import Header from "./Components/Header";
import Home from "./Components/Home";
import RecentSearches from "./Components/RecentSearches";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";

function App() {
  const [recentSearches, setRecentSearches] = useState([]);

  const addRecentSearch = (item) => {
    setRecentSearches(
      Array.from(new Set([item, ...recentSearches])).slice(0, 5)
    );
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home addRecentSearch={addRecentSearch} />}
        />
        <Route
          exact
          path="/recent"
          element={<RecentSearches recentSearches={recentSearches} />}
        />
      </Routes>
    </div>
  );
}

export default App;
