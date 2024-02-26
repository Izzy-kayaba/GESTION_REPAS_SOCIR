import React from 'react'
import LineChart from '../../components/LineChart/LineChart';
import Card from "../../components/Card/Card";

const AdminDashboard = () => {

  const data = [
    { year: 2016, userGain: 100 },
    { year: 2017, userGain: 150 },
    { year: 2018, userGain: 200 },
    { year: 2019, userGain: 180 },
    { year: 2020, userGain: 250 },
  ];

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
            <Card
              title="Card 3"
              text="More information goes here"
            />
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

      <div className="container" >
        <div className="p-3" style={{ position: "relative", height: "40vh" }}>
          <LineChart data={data} />
        </div>
      </div>
    </main >
  )
}

export default AdminDashboard