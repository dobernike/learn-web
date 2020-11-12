import ResourceForm from './ResourceForm';

const ResourceUpdate = ({ resource }) => {
  const updateResource = (formData) => {
    alert(JSON.stringify(formData));
  };

  return <ResourceForm onSumbit={updateResource} resource={resource} />;
};

export default ResourceUpdate;
