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
                borderRadius: 5,
                barThickness: 40,
            }
        ]
    };

    const options = {
        indexAxis: 'y', 
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: `Top Fields of Study (${selectedEducationLevel})`,
                color: '#ffffff',
                font: {
                    size: 18,
                    weight: 'bold',
                },
                padding: {
                    top: 25,
                    bottom: 15
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.10)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1,
                callbacks: {
                    label: function(context) {
                        return ` ${parseFloat(context.raw).toFixed(1)}%`;
                    },
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: false
                },
                ticks: {
                    callback: function(value) {
                        return value.toFixed(0) + "%";
                    },
                    stepSize: 5
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                border: {
                    color: 'transparent'
                }
            },
            y: {
                title: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 12 
                    },
                },
                grid: {
                    display: false
                }
            }
        }
    };

    return (
        <div className="w-full h-full max-w-full max-h-full">
          <Bar data={chartData} options={options} />
        </div>
      );    
});

export default HorizontalBarChart;