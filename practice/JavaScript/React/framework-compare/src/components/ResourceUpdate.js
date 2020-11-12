import { useState } from 'react';

const ResourceUpdate = ({ resource }) => {
  const [uResource, setUResource] = useState(resource);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUResource({ ...uResource, [name]: value });
  };

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="title">Title</label>
        <input
          onChange={handleChange}
          value={uResource.title}
          name="title"
          type="text"
          className="form-control"
          id="title"
          placeholder="How to survice in mountains"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description">Description</label>
        <textarea
          onChange={handleChange}
          value={uResource.description}
          name="description"
          className="form-control"
          id="description"
          placeholder="Just some description"
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="link">Resource Link</label>
        <div className="input-group">
          <input
            onChange={handleChange}
            value={uResource.link}
            name="link"
            type="text"
            className="form-control"
            id="link"
            placeholder="Username"
          />
        </div>
      </div>
      {/* <div className="mb-3">
        <label htmlFor="type">Type</label>
        <input
          type="text"
          className="form-control"
          id="type"
          placeholder="Very interesting book"
        />
      </div> */}
      <hr className="mb-4" />
      <button className="btn btn-primary btn-lg btn-block" type="submit">
        Submit
      </button>
    </form>
  );
};

export default ResourceUpdate;
