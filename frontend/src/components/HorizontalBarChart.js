import React, { memo } from 'react';
import { Bar } from 'react-chartjs-2';

const HorizontalBarChart = memo(({ data }) => {
    console.log('HorizontalBarChart Data:', data);

    // Filter data (to be updated later)
    const bachelorsData = data.filter(item => item.education_level === 'Bachelors');

    // Sort the data by count and take the top 4 fields of study
    const sortedData = bachelorsData.slice().sort((a, b) => b.count - a.count).slice(0, 4);

    // Calculate total count to compute proportions
    const total = sortedData.reduce((sum, item) => sum + item.count, 0);
    // Extract labels (fields of study) and data (proportions)
    const labels = sortedData.map(item => item.field_of_study);
    const proportions = sortedData.map(item => (item.count / total) * 100);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Fields of Study',
                data: proportions,
                backgroundColor: '#FF6384',
                borderColor: '#FF6384',
            }
        ]
    };

    const options = {
        indexAxis: 'y', // This makes the chart horizontal
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Fields of Study Distribution for Degree',
                color: '#000',
                font: {
                    size: 16
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += parseFloat(context.raw).toFixed(1) + '%';
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
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
            },
            y: {
                title: {
                    display: true,
                    text: 'Fields of Study',
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
            }
        }
    };

    return <Bar data={chartData} options={options} />;
});

export default HorizontalBarChart;