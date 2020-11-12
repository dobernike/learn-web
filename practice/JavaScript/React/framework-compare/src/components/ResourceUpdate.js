import ResourceForm from './ResourceForm';
import { updateResourceApi } from '../actions';

const ResourceUpdate = ({ resource, onResourceUpdate }) => {
  const updateResource = async (resourceData) => {
    const updatedResource = await updateResourceApi(resource._id, resourceData);
    onResourceUpdate(updatedResource);
  };

  return <ResourceForm onSumbit={updateResource} resource={resource} />;
};

export default ResourceUpdate;
