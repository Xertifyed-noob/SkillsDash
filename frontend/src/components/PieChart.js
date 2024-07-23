import React, { memo } from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = memo(({ data, onSliceClick, jobListingCount }) => {

    // Data should be an array of education level data (data.education_levels in Dashboard.js)
    console.log('PieChart Data:', data);

    // Define a consistent color mapping for the education levels
    const colorMapping = {
        'Bachelors': '#FF6384', 
        'Masters': '#FFCE56',
        'PhD': '#36A2EB' 
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
                hoverBackgroundColor: orderedData.map(item => colorMapping[item.education_level])
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
                    generateLabels: (chart) => {
                        return ['Bachelors', 'Masters', 'PhD'].map((label, index) => ({
                            text: label,
                            fillStyle: colorMapping[label],
                            hidden: false,
                            index: labels.indexOf(label)
                        }));
                    }
                }
            },
            title: {
                display: true,
                text: `Education Level distribution across ${jobListingCount} Jobs`,
                color: '#000',
                font: {
                    size: 16
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += parseFloat(context.raw).toFixed(1) + '%';
                        return label;
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

    return <Pie data={chartData} options={options} />;
});

export default PieChart;