import React, { memo, useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = memo(({ data }) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        console.log('PieChart Data:', data);

        // Calculate total count of all the education level items 
        const total = data.reduce((sum, item) => sum + item.count, 0);

        // Extract the education level lables from data
        const labels = data.map(item => item.education_level);

        // Calculares the percentage of each education
        const percentages = data.map(item => (item.count / total) * 100);

        setChartData({
            labels: labels,
            datasets: [
                {
                    label: 'Education Levels',
                    data: percentages,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                }
            ]
        });
    }, [data]);

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
        }
    };

    return (
        <div>
            {chartData.labels && chartData.labels.length > 0 ? (
                <Pie data={chartData} options={options} />
            ) : (
                <p>No data available for the pie chart</p>
            )}
        </div>
    );
});

export default PieChart;