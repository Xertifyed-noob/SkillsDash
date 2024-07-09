import React, { memo } from 'react';
import { Bar } from 'react-chartjs-2'

const BarChart = memo(({ data }) => {

    console.log('BarChart Data:', data); 

    // Sort the data by count and take the top 10 skills
    const sortedData = data.slice().sort((a, b) => b.count - a.count).slice(0, 10);

    // Calculate total count to compute proportions
    const totalCount = data.reduce((sum, item) => sum + item.count, 0);

    // Extract labels (skills) and data (proportions) for the top 10 skills
    const labels = sortedData.map(item => item.skill);
    const proportions = sortedData.map(item => (item.count / totalCount) * 100);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Skills',
                data: proportions,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(75, 192, 192, 1)',
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Skills Distribution across roles',
                color: '#000' 
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += parseFloat(context.parsed.y).toFixed(1) + '%';
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Skills',
                    color: '#000',
                    font: {
                        size: 16
                    }
                },
                ticks: {
                    color: '#000'  
                },
                grid: {
                    display: false 
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Percentage',
                    color: '#000',
                    font: {
                        size: 16
                    }
                },
                ticks: {
                    color: '#000',
                    callback: function(value) {
                        return value.toFixed(0) + "%";  
                    },
                    stepSize: 5
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)' 
                }
            }
        }
    };

    return <Bar data={chartData} options={options}/>;
});

export default BarChart;