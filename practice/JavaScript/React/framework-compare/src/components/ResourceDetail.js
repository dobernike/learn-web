const ResourceDetail = () => {
  return (
    <>
      <h4 className="mb-3">Update Resource</h4>
      <div className="card">
        <div className="card-header">Resource Name</div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>Resource description...</p>
            <footer className="text-muted mb-2">Type</footer>
          </blockquote>
          <a href="#" className="btn btn-primary">
            Edit
          </a>
        </div>
      </div>
    </>
  );
};

export default ResourceDetail;
