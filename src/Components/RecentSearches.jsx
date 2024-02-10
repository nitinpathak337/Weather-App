import "./RecentSearches.css";

const RecentSearches = ({ recentSearches }) => {
  return (
    <div className="d-flex flex-column w-100 align-items-center p-3 py-5">
      <div className="view-container">
        <h1>Your Recent Searches:</h1>
        {recentSearches.length > 0 ? (
          <ul className="list-container">
            {recentSearches.map((each) => (
              <li key={each}>
                <h4>{each}</h4>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
              alt="notfound"
              className="w-75"
            />
            <h4>No Searches Found</h4>
          </>
        )}
      </div>
    </div>
  );
};

export default RecentSearches;
