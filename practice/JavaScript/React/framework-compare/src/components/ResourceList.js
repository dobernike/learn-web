import { useState } from 'react';

const initialResources = [
  {
    _id: '1',
    title: 'resource 1',
    description: 'Description 1',
    link: 'https://google.com',
    type: 'blog',
  },
  {
    _id: '2',
    title: 'resource 2',
    description: 'Description 2',
    link: 'https://google.com',
    type: 'video',
  },
  {
    _id: '3',
    title: 'resource 3',
    description: 'Description 3',
    link: 'https://google.com',
    type: 'book',
  },
];

const ResourceList = () => {
  const [resources, setResources] = useState(initialResources);

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
