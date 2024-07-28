/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './css/EmployeeDashboard.css'; // Assuming you're using CSS modules or a separate CSS file

function DoctorDashboard() {
  const [clients, setClients] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [insurances, setInsurances] = useState([]);
  const [genderData, setGenderData] = useState({
    labels: [],
    datasets: []
  });
  const [trendData, setTrendData] = useState({
    labels: [],
    datasets: []
  });
  const [predictionTrendData, setPredictionTrendData] = useState({
    labels: [],
    datasets: []
  });
  const [statusData, setStatusData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    // Fetch clients data
    axios.get('http://127.0.0.1:8000/client/clients/')
      .then(response => {
        setClients(response.data.clients);
        processClientData(response.data.clients);
      })
      .catch(error => {
        console.error('Error fetching client data:', error);
      });

    // Fetch predictions data
    axios.get('http://127.0.0.1:8000/prediction/predictions/')
      .then(response => {
        setPredictions(response.data.predictions);
        processPredictionData(response.data.predictions);
      })
      .catch(error => {
        console.error('Error fetching prediction data:', error);
      });

    // Fetch insurances data
    axios.get('http://127.0.0.1:8000/insurance/insurances/')
      .then(response => {
        setInsurances(response.data.insurances);
      })
      .catch(error => {
        console.error('Error fetching insurance data:', error);
      });
  }, []);

  const processClientData = (clients) => {
    const genderCounts = { male: 0, female: 0, other: 0 };
    const dateCounts = {};

    clients.forEach(client => {
      const gender = client.gender.toLowerCase();
      if (genderCounts[gender] !== undefined) {
        genderCounts[gender]++;
      } else {
        genderCounts.other++;
      }

      const createdDate = new Date(client.created_date).toLocaleDateString('en-CA');
      if (dateCounts[createdDate]) {
        dateCounts[createdDate]++;
      } else {
        dateCounts[createdDate] = 1;
      }
    });

    setGenderData({
      labels: ['Male', 'Female', 'Other'],
      datasets: [{
        data: [genderCounts.male, genderCounts.female, genderCounts.other],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      }]
    });

    const sortedDates = Object.keys(dateCounts).sort();
    const dateLabels = sortedDates.map(date => new Date(date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' }));
    const dateValues = sortedDates.map(date => dateCounts[date]);

    setTrendData({
      labels: dateLabels,
      datasets: [{
        label: 'Client Registrations',
        data: dateValues,
        fill: false,
        borderColor: '#36A2EB',
        tension: 0.1 // Smooth the line
      }]
    });
  };

  const processPredictionData = (predictions) => {
    const dateCounts = {};
    const statusCounts = { available: 0, not_available: 0 };

    predictions.forEach(prediction => {
      const createdDate = new Date(prediction.created_date).toLocaleDateString('en-CA');
      if (dateCounts[createdDate]) {
        dateCounts[createdDate]++;
      } else {
        dateCounts[createdDate] = 1;
      }

      const status = prediction.available ? 'available' : 'not_available';
      statusCounts[status]++;
    });

    const sortedDates = Object.keys(dateCounts).sort();
    const dateLabels = sortedDates.map(date => new Date(date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' }));
    const dateValues = sortedDates.map(date => dateCounts[date]);

    setPredictionTrendData({
      labels: dateLabels,
      datasets: [{
        label: 'Predictions Over Time',
        data: dateValues,
        backgroundColor: '#FFCE56',
        borderColor: '#FFCE56',
        borderWidth: 1,
        hoverBackgroundColor: '#FFCE56'
      }]
    });

    setStatusData({
      labels: ['Available', 'Frauds'],
      datasets: [{
        data: [statusCounts.available, statusCounts.not_available],
        backgroundColor: ['#36A2EB', '#FF6384'],
      }]
    });
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          }
        }
      }
    }
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        },
        ticks: {
          maxRotation: 90,
          minRotation: 45
        }
      },
      y: {
        title: {
          display: true,
          text: 'Number of Registrations'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          }
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        },
        ticks: {
          maxRotation: 90,
          minRotation: 45
        }
      },
      y: {
        title: {
          display: true,
          text: 'Number of Predictions'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          }
        }
      }
    }
  };

  return (
    <div className='mt-20'>
      <div className='summary-container'>
        <div className='summary-item'>
          <h3 className='text-gray-500'>Total Insurances</h3>
          <span className='text-fuchsia-950'>{insurances.length}</span>
        </div>
        <div className='summary-item'>
          <h3 className='text-gray-500'>Total Insurance Members</h3>
          <span className='text-blue-600'>{clients.length}</span>
        </div>
        <div className='summary-item'>
          <h3 className='text-gray-500'>Total Predictions</h3>
          <span className='text-red-700'>{predictions.length}</span>
        </div>
      </div>

      <div className='dashboard-container'>
        <div className='chart-container'>
          <h2 className='chart-title'>Clients by Gender</h2>
          {genderData.labels.length > 0 && genderData.datasets.length > 0 ? (
            <div className='chart-wrapper'>
              <Pie data={genderData} options={pieOptions} />
            </div>
          ) : (
            <p>Loading gender data...</p>
          )}
        </div>

        <div className='chart-container'>
          <h2 className='chart-title'>Predictions by Status</h2>
          {statusData.labels.length > 0 && statusData.datasets.length > 0 ? (
            <div className='chart-wrapper'>
              <Pie data={statusData} options={pieOptions} />
            </div>
          ) : (
            <p>Loading status data...</p>
          )}
        </div>

        <div className='chart-container'>
          <h2 className='chart-title'>Predictions Over Time</h2>
          {predictionTrendData.labels.length > 0 && predictionTrendData.datasets.length > 0 ? (
            <div className='chart-wrapper'>
              <Bar data={predictionTrendData} options={barOptions} />
            </div>
          ) : (
            <p>Loading prediction trend data...</p>
          )}
        </div>

        <div className='chart-container'>
          <h2 className='chart-title'>Client Registration Trends</h2>
          {trendData.labels.length > 0 && trendData.datasets.length > 0 ? (
            <div className='chart-wrapper'>
              <Line data={trendData} options={lineOptions} />
            </div>
          ) : (
            <p>Loading trend data...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
