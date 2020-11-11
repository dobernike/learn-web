const ResourceList = ({ resources, onItemClick }) => {
  return (
    <ul className="list-group mb-3 resource-list">
      {resources.map((resource) => (
        <li
          key={resource._id}
          onClick={() => onItemClick(resource)}
          className="resource-list-item list-group-item d-flex justify-content-between lh-condensed"
        >
          <div>
            <h6 className="my-0">{resource.title}</h6>
            <small className="text-muted">{resource.description}</small>
          </div>
          <span className="text-muted">{resource.type}</span>
        </li>
      ))}
    </ul>
  );
};

export default ResourceList;
