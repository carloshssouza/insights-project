import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';


const Kpi = () => {
  const [objectServer1, setObjectServer1] = useState([]);
  const [objectServer2, setObjectServer2] = useState([]);

  function getKpi() {
    fetch('/analytics/frequency', {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Headers': '*'
      }
    })
      .then((response) => response.json())
      .then((json) => setObjectServer1(json));

    fetch('/analytics/top10', {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Headers': '*'
      }
    })
      .then((response) => response.json())
      .then((json) => setObjectServer2(json));
  }

  useEffect(() => {
    getKpi(); // descomentar para conectar
  }, []);

  const labelsPieChart = objectServer1?.map((x) => x?.category);
  const seriesPieChart = objectServer1?.map((x) => x?.count);
  const labelsBarChart = objectServer2?.map((x) => x?.name);
  const seriesBarChart = objectServer2?.map((x) => x?.count);

  const dataBarChart = {
    labels: {
      categories: labelsBarChart,
    },
    series: [
      {
        name: 'Qtd',
        data: seriesBarChart,
      },
    ],
  };

  return (
    <div className="div-kpi">
      <Chart
        options={{ labels: labelsPieChart }}
        series={seriesPieChart}
        type="donut"
        height="440"
        width="450"
      />
      <Chart
        options={{ xaxis: dataBarChart?.labels }}
        series={dataBarChart?.series}
        type="bar"
        height="400"
        width="600"
      />
    </div>
  );
};

export default Kpi;
