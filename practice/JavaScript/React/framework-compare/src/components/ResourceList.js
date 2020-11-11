const ResourceList = ({ resources }) => {
  return (
    <ul className="list-group mb-3 resource-list">
      {resources.map((resources) => (
        <li
          key={resources._id}
          className="list-group-item d-flex justify-content-between lh-condensed"
        >
          <div>
            <h6 className="my-0">{resources.title}</h6>
            <small className="text-muted">{resources.description}</small>
          </div>
          <span className="text-muted">{resources.type}</span>
        </li>
      ))}
    </ul>
  );
};

export default ResourceList;
