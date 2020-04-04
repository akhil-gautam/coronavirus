import React, { useEffect, useState } from "react";
// import { MdTrendingUp } from "react-icons/md";

function App() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://api.covid19india.org/data.json");
      let data = await response.json();
      let total = data.statewise.shift();
      setData(data.statewise);
      setTotal(total);
    }
    fetchData();
  }, []);
  return (
    <div className="mainContainer">
      <div>
        <div className="header">
          <div className="header-message">Heard a Rumor? Get it confirmed <a href = "https://docs.google.com/forms/d/1JK4A2QRSA7Jz829_krw7V1Je43eSRjb8TCqw7CweABU/viewform?edit_requested=true" target="blank">here</a>.</div>
          CoronaVIRUS</div>
        <div className="totalRecord">
          {Object.keys(total).length > 0 && <Total total={total} />}
        </div>
      </div>
      <div className="content">
        <StateWise data={data} />
      </div>
      <div className="footer">Date courtsey: https://www.covid19india.org/</div>
    </div>
  );
}

const Total = ({
  total: { confirmed, active, deaths, recovered, lastupdatedtime, delta }
}) => {
  return (
    <>
      <div className="country">India</div>
      <div>
        <div className="listData">
          <span>Confirmed Cases: {confirmed}</span>
          {/* <span className="riseData">
            <MdTrendingUp />
            {delta.confirmed}
          </span> */}
        </div>
        <div className="listData">
          <span>Active Cases: {active}</span>
          {/* <span className="riseData">
            <MdTrendingUp />
            {delta.active}
          </span> */}
        </div>
        <div className="listData">
          <span>Deaths: {deaths}</span>
          {/* <span className="riseData">
            <MdTrendingUp />
            {delta.deaths}
          </span> */}
        </div>
        <div className="listData">
          <span>Recovered: {recovered}</span>
          {/* <span className="riseData">
            <MdTrendingUp />
            {delta.recovered}
          </span> */}
        </div>
      </div>
      <div className="updatedAt">Last updated at: {lastupdatedtime}</div>
    </>
  );
};
class StateWise extends React.Component {
  render() {
    if (this.props.data.length === 0) {
      return <div>Loading, please wait...</div>;
    }
    return (
      <>
        <div className="listHeader">Statewise Data</div>
        <div className="horizontalLayout">
          {this.props.data.map((s, id) => (
            <div className="card" key={id}>
              <span className="state">{s.state}</span>
              <span>Confirmed: {s.confirmed}</span>

              <span>Active: {s.active}</span>

              <span>Recovered: {s.recovered}</span>

              <span>Death: {s.deaths}</span>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default App;
