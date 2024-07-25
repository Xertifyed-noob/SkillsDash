import React, { memo } from 'react';
import { Bar } from 'react-chartjs-2';

const HorizontalBarChart = memo(({ data, selectedEducationLevel, selectedColor }) => {
    console.log('HorizontalBarChart Data:', data);

    // Filter data to only include the selected education level
    const filteredData = data.filter(item => item.education_level === selectedEducationLevel);

    // Calculate total count of all fields of study
    const total = filteredData.reduce((sum, item) => sum + item.count, 0);
    // Sort the data by count and take the top 4 fields of study
    const sortedData = filteredData.slice().sort((a, b) => b.count - a.count).slice(0, 4);
    // Extract labels (fields of study) and data (proportions)
    const labels = sortedData.map(item => item.field_of_study);
    const proportions = sortedData.map(item => (item.count / total) * 100);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Fields of Study',
                data: proportions,
                backgroundColor: selectedColor,
                borderColor: selectedColor,
            }
        ]
    };

    const options = {
        // Makes the chart horizontal
        indexAxis: 'y', 
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: `Top fields of Study for ${selectedEducationLevel} Degree`,
                color: '#D1D5DB',
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
                    color: '#D1D5DB',
                    font: {
                        size: 16
                    }
                },
                ticks: {
                    color: '#D1D5DB',
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
                    color: '#D1D5DB',
                    font: {
                        size: 16
                    }
                },
                ticks: {
                    color: '#D1D5DB'
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