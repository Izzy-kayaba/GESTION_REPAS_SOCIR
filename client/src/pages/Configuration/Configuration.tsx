import React from 'react'


const Configuration: React.FC = () => {

  return (
    <main>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Agents</h5>
                <p className="card-text">This is a sample card content.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Entites</h5>
                <p className="card-text">Another sample card content.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Departements</h5>
                <p className="card-text">More card content goes here.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Fontions</h5>
                <p className="card-text">Additional card content.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main >
  )
}

export default Configuration;



