import React, { memo } from 'react';
import { Doughnut } from 'react-chartjs-2';


const DoughnutChart = memo(({ data, onSliceClick }) => {

    // Data should be an array of education level data (data.education_levels in Dashboard.js)
    console.log('DoughnutChart Data:', data);

    // Define a consistent color mapping for the education levels
    const colorMapping = {
        'Bachelors': 'rgba(251, 183, 244, 1)', 
        'Masters': 'rgba(160, 129, 228, 1)',
        'PhD': 'rgba(63, 140, 255, 1)' 
    };

    // Ensure the data is always ordered as Bachelors, Masters, PhD
    const orderedData = ['Bachelors', 'Masters', 'PhD'].map(level => {
        const found = data.find(item => item.education_level === level);
        return found || { education_level: level, count: 0 };
    });
    
    // Calculate total count of all the education level items 
    const total = orderedData.reduce((sum, item) => sum + item.count, 0);
    // Extract the education level lables from data
    const labels = orderedData.map(item => item.education_level);
    // Calculares the percentage of each education
    const percentages = orderedData.map(item => (item.count / total) * 100);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Education Levels',
                data: percentages,
                backgroundColor: orderedData.map(item => colorMapping[item.education_level]),
                hoverBackgroundColor: orderedData.map(item => colorMapping[item.education_level]),
                borderWidth: 0
            }
        ]
    };

    const options = {
        cutout: '60%',
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    padding: 30,
                    generateLabels: (chart) => {
                        return ['Bachelors', 'Masters', 'PhD'].map((label) => ({
                            text: label,
                            fontColor: '#D1D5DB',
                            fillStyle: colorMapping[label],
                            hidden: false,
                            index: labels.indexOf(label),
                            borderWidth: 0,
                            borderRadius: 5
                        }));
                    }
                }
            },
            title: {
                display: true,
                text: `Education Level distribution`,
                color: '#ffffff',
                font: {
                    size: 18,
                    weight: 'bold',
                },
                padding: {
                    top: 35,
                    bottom: 20
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.10)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1,
                padding: {
                    top: 10,
                    bottom: 10,
                    left: 20,
                    right: 20
                },
                callbacks: {
                    label: function(context) {
                        return ` ${parseFloat(context.raw).toFixed(1)}%`;
                    },
                    labelColor: function(context) {
                        return {
                            backgroundColor: colorMapping[context.label]
                        };
                    }
                }
            }
        },
        onClick: (evt, activeElements) => {
            if (activeElements.length > 0) {
                const datasetIndex = activeElements[0].datasetIndex;
                const index = activeElements[0].index;
                const educationLevel = chartData.labels[index];
                const color = chartData.datasets[datasetIndex].backgroundColor[index];
                onSliceClick(educationLevel, color);
            }
        },
        onHover: (event, chartElement) => {
            event.native.target.style.cursor = chartElement.length ? 'pointer' : 'default';
        }
    };

    return (
        <div className="w-full h-full max-w-full max-h-full">
            <Doughnut data={chartData} options={options} />
        </div>
    )
});

export default DoughnutChart;
