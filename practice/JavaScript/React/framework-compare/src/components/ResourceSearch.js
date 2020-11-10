const ResourceSearch = () => {
  return (
    <form className="card p-2">
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Some title" />
        <div className="input-group-append">
          <button type="submit" className="btn btn-secondary">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default ResourceSearch;
