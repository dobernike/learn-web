const ResourceDetail = ({ onButtonClick }) => {
  return (
    <div className="card">
      <div className="card-header">Resource Name</div>
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <p>Resource description...</p>
          <footer className="text-muted mb-2">Type</footer>
        </blockquote>
      </div>
    </div>
  );
};

export default ResourceDetail;
