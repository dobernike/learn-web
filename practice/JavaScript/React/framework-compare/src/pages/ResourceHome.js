import ResourceSearch from '../components/ResourceSearch';
import ResourceList from '../components/ResourceList';
import ResourceDetail from '../components/ResourceDetail';
import ResourceUpdate from '../components/ResourceUpdate';
import Header from '../components/Header';

const ResourceHome = () => {
  return (
    <div className="container">
      <Header />
      <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your Resources</span>
            <span className="badge badge-secondary badge-pill">6</span>
          </h4>
          <ResourceSearch />
          <ResourceList />
        </div>
        {/* <div className="col-md-8 order-md-1">
          <ResourceUpdate />
        </div> */}
        <div className="col-md-8 order-md-1">
          <ResourceDetail />
        </div>
      </div>
    </div>
  );
};

export default ResourceHome;
