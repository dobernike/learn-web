const ResourceUpdate = () => {
  return (
    <>
      <h4 className="mb-3">Update Resource</h4>
      <form>
        <div className="mb-3">
          <label htmlFor="firstName">Title</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder="How to survice in mountains"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email">
            Description <span className="text-muted">(Optional)</span>
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Very interesting book"
          />
        </div>
        <div className="mb-3">
          <label for="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            placeholder="Just some description"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="username">Resource Link</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Username"
            />
          </div>
        </div>
        <hr className="mb-4" />
        <button className="btn btn-primary btn-lg btn-block" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default ResourceUpdate;
