import React from 'react';
import { NavLink } from "react-router-dom";


const Configuration: React.FC = () => {

  return (
    <main>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-2">
            <NavLink className="card nav-link" to="./agents">
              <div className="card-body">
                <h5 className="card-title fw-bold">Agents</h5>
                <p className="card-text">Another sample card content.</p>
              </div>
            </NavLink>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <NavLink className="card nav-link" to="./entites">
              <div className="card-body">
                <h5 className="card-title fw-bold">Entites</h5>
                <p className="card-text">Another sample card content.</p>
              </div>
            </NavLink>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <NavLink className="card nav-link" to="./departements">
              <div className="card-body">
                <h5 className="card-title fw-bold">Departements</h5>
                <p className="card-text">Another sample card content.</p>
              </div>
            </NavLink>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <NavLink className="card nav-link" to="./fonctions">
              <div className="card-body">
                <h5 className="card-title fw-bold">Fonctions</h5>
                <p className="card-text">Another sample card content.</p>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </main >
  )
}

export default Configuration;



