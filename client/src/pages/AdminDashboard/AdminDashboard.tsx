import React from 'react'
import "./AdminDashboard.css"

const AdminDashboard = () => {
  return (
    <main>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Card 1</h5>
                <p className="card-text">This is a sample card content.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Card 2</h5>
                <p className="card-text">Another sample card content.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Card 3</h5>
                <p className="card-text">More card content goes here.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Card 4</h5>
                <p className="card-text">Additional card content.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main >
  )
}

export default AdminDashboard