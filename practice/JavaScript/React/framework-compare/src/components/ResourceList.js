const ResourceList = () => {
  return (
    <ul className="list-group mb-3 resource-list">
      <li className="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 className="my-0">Resource 1</h6>
          <small className="text-muted">Brief description</small>
        </div>
        <span className="text-muted">type</span>
      </li>
      <li className="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 className="my-0">Resource 2</h6>
          <small className="text-muted">Brief description</small>
        </div>
        <span className="text-muted">type</span>
      </li>
      <li className="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 className="my-0">Resource 3</h6>
          <small className="text-muted">Brief description</small>
        </div>
        <span className="text-muted">type</span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <div>
          <h6 className="my-0">Resource 4</h6>
          <small className="text-muted">Brief description</small>
        </div>
        <span className="text-muted">type</span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <div>
          <h6 className="my-0">Resource 5</h6>
          <small className="text-muted">Brief description</small>
        </div>
        <span className="text-muted">type</span>
      </li>
      <li className="list-group-item d-flex justify-content-between bg-light">
        <div className="text-success">
          <h6 className="my-0">Resource 6</h6>
          <small className="text-muted">Brief description</small>
        </div>
        <span className="text-muted">type</span>
      </li>
    </ul>
  );
};

export default ResourceList;
