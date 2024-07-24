import React, { memo, useState, useEffect, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';
import { useDispatch } from 'react-redux';
import { fetchToolIndustryData } from '../redux/actions';
import { Button } from '@mui/material';

const ToolsBarChart = memo(({ data, jobListingCount, jobTitle }) => {

    // Data should be an array of tools data (data.tools in Dashboard.js)
    console.log('ToolsBarChart Data:', data); 

    const dispatch = useDispatch();
    const [drilldownData, setDrilldownData] = useState(null);
    const [currentJobTitle, setCurrentJobTitle] = useState(jobTitle);
    const [currentTool, setCurrentTool] = useState(null);
    const [drilldownTitle, setDrilldownTitle] = useState('');

    const fetchAndSetDrilldownData = useCallback((tool, jobTitle) => {
        dispatch(fetchToolIndustryData(tool, jobTitle)).then((response) => {
            const sortedDrilldownData = [...response.toolIndustries].sort((a, b) => b.count - a.count).slice(0, 7);
            const totalCount = [...response.toolIndustries].reduce((sum, item) => sum + item.count, 0);
            const drilldownDataProportions = sortedDrilldownData.map(item => ({
                ...item,
                proportion: (item.count / totalCount) * 100
            }));
            setDrilldownData(drilldownDataProportions);
            setDrilldownTitle(`Distribution of Tool (${tool}) across Industries`);
        });
    }, [dispatch]);

    useEffect(() => {
        if (currentJobTitle !== jobTitle) {
            setCurrentJobTitle(jobTitle);
            if (currentTool) {
                fetchAndSetDrilldownData(currentTool, jobTitle);
            } else {
                setDrilldownData(null);
            }
        }
    }, [jobTitle, currentJobTitle, currentTool, fetchAndSetDrilldownData]);

    const handleClick = (tool) => {
        setCurrentTool(tool);
        fetchAndSetDrilldownData(tool, jobTitle);
    };

    const handleRevert = () => {
        setDrilldownData(null);
        setCurrentTool(null);
    };

    // Sort the data by count and take the top 10 tools
    const sortedData = data.slice().sort((a, b) => b.count - a.count).slice(0, 9);
    // Calculate total count to compute proportions
    const totalCount = data.reduce((sum, item) => sum + item.count, 0);
    // Extract labels (tools) and data (proportions) for the top 10 tools
    const labels = sortedData.map(item => item.tool);
    const proportions = sortedData.map(item => (item.count / totalCount) * 100);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Tools',
                data: proportions,
                backgroundColor: 'rgba(9, 195, 114, 1)',
                borderColor: 'rgba(9, 195, 114, 1)',
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
                text: `Tools distribution across ${jobListingCount} Jobs`,
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
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const tool = labels[elements[0].index];
                handleClick(tool);
            }
        },
        onHover: (event, chartElement) => {
            event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Tools',
                    color: '#000',
                    font: {
                        size: 16,
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

    const drilldownChartData = drilldownData ? {
        labels: drilldownData.map(item => item.industry),
        datasets: [
            {
                label: 'Industries',
                data: drilldownData.map(item => item.proportion),
                backgroundColor: 'rgba(153, 102, 255, 1)',
                borderColor: 'rgba(153, 102, 255, 1)',
            }
        ]
    } : null;

    const drilldownOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: drilldownTitle,
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
                    text: 'Industries',
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
                        return value.toFixed(0) + '%';
                    },
                    stepSize: 5
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)'
                }
            }
        }
    };

    return (
        <div>
            {!drilldownData ? (
                <Bar data={chartData} options={options} />
            ) : (
                <>
                    <Bar data={drilldownChartData} options={drilldownOptions} />
                    <Button variant="contained" color="primary" onClick={handleRevert} style={{ marginTop: '5px' }}>
                        Revert
                    </Button>
                </>
            )}
        </div>
    );
});

export default ToolsBarChart;

