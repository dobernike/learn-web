const ResourceDetail = ({ resource }) => {
  return (
    <div className="card">
      <div className="card-header">{resource.title}</div>
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <p>{resource.description}</p>
          <footer className="text-muted mb-2">{resource.type}</footer>
        </blockquote>
      </div>
    </div>
  );
};

export default ResourceDetail;
