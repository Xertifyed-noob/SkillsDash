import React, { memo } from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = memo(({ data, onSliceClick }) => {

    // Data should be an array of education level data (data.education_levels in Dashboard.js)
    console.log('PieChart Data:', data);

    // Calculate total count of all the education level items 
    const total = data.reduce((sum, item) => sum + item.count, 0);
    // Extract the education level lables from data
    const labels = data.map(item => item.education_level);
    // Calculares the percentage of each education
    const percentages = data.map(item => (item.count / total) * 100);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Education Levels',
                data: percentages,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
            title: {
                display: true,
                text: 'Education Level Distribution across roles',
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