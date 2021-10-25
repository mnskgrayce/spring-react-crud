export function SearchBar({ query, onQueryChange }) {
  return (
    <div className="field">
      <p className="control has-icons-left">
        <input
          className="input"
          type="text"
          name="query"
          id="query"
          value={query}
          placeholder="Search"
          onChange={(event) => {
            onQueryChange(event.target.value);
          }}
        />
        <span className="icon is-small is-left">
          <i className="fas fa-search"></i>
        </span>
      </p>
    </div>
  );
}
