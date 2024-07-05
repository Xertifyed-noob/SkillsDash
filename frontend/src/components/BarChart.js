import React from 'react';
import { Bar } from 'react-chartjs-2'

const BarChart = ({ data }) => {
    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                label: 'Skills',
                data: Object.values(data),
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(75, 192, 192, 1)',
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#fff'  
                }
            },
            title: {
                display: true,
                text: 'Skills Distribution',
                color: '#fff' 
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#fff'  
                },
                grid: {
                    display: false 
                }
            },
            y: {
                ticks: {
                    color: '#fff'  
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)' 
                }
            }
        }
    };

    return <Bar data={chartData} options={options}/>;
};

export default BarChart;