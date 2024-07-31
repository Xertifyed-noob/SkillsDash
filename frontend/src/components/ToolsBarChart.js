import React, { memo, useState, useEffect, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';
import { useDispatch } from 'react-redux';
import { fetchToolIndustryData } from '../redux/actions';

const ToolsBarChart = memo(({ data, jobTitle }) => {

    // Data should be an array of tools data (data.tools in Dashboard.js)
    console.log('ToolsBarChart Data:', data); 

    // Define state variables with useState hook
    const dispatch = useDispatch();
    const [drilldownData, setDrilldownData] = useState(null);
    const [drilldownTitle, setDrilldownTitle] = useState('');
    const [currentJobTitle, setCurrentJobTitle] = useState(jobTitle);
    const [currentTool, setCurrentTool] = useState(null);
 
    // Function to fetch and set drilldown data for a selected tool
    const fetchAndSetDrilldownData = useCallback((tool, jobTitle) => {
        // Dispatches action creator to fetch industry data for a selected tool
        dispatch(fetchToolIndustryData(tool, jobTitle)).then((response) => {
            // Sort the data by count and take the top 7 industries, and compute proportions
            const sortedDrilldownData = [...response.toolIndustries].sort((a, b) => b.count - a.count).slice(0, 7);
            const totalCount = [...response.toolIndustries].reduce((sum, item) => sum + item.count, 0);
            const drilldownDataProportions = sortedDrilldownData.map(item => ({
                ...item,
                proportion: (item.count / totalCount) * 100
            }));
            // Update the state with processed drilldown data and the drilldown chart title
            setDrilldownData(drilldownDataProportions);
            setDrilldownTitle(`Distribution of Tool (${tool}) across Industries`);
        });
    }, [dispatch]);

    // Hook to perform side effects when job title, current selected tool, or other dependencies change
    useEffect(() => {
        // If a different job title is selected, update job title state
        if (currentJobTitle !== jobTitle) {
            setCurrentJobTitle(jobTitle);
            // If a tool is selected, fetch and set drilldown data for that tool, else reset drilldown data
            if (currentTool) {
                fetchAndSetDrilldownData(currentTool, jobTitle);
            } else {
                setDrilldownData(null);
            }
        }
    }, [jobTitle, currentJobTitle, currentTool, fetchAndSetDrilldownData]);

    // When a bar in the bar chart is clicked, update skill state, and fetch drilldown data for clicked skill
    const handleClick = (tool) => {
        setCurrentTool(tool);
        fetchAndSetDrilldownData(tool, jobTitle);
    };

    // When revert button is clicked, reset the drilldown data
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
                backgroundColor: 'rgba(186, 245, 244, 1)',
                borderColor: 'rgba(186, 245, 244, 1)',
                borderRadius: 5
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
                text: `Tools distribution`,  
                color: '#ffffff',
                font: {
                    size: 18,
                    weight: 'bold',
                },
                align: 'start',
                padding: {
                    bottom: 40 
                }   
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.10)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1,
                position: 'nearest',
                yAlign: 'bottom', 
                callbacks: {
                    label: function(context) {
                        return ` ${parseFloat(context.raw).toFixed(1)}%`;
                    },
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
                    display: false
                },
                ticks: {
                    maxRotation: 0, 
                    minRotation: 0,
                    font: {
                        size: 12 
                    },
                    autoSkip: false,
                },
                grid: {
                    display: false 
                }
            },
            y: {
                title: {
                    display: false,
                },
                ticks: {
                    callback: function(value) {
                        return value.toFixed(0) + "%";  
                    },
                    stepSize: 5
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)' 
                },
                border: {
                    color: 'transparent'
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
        onClick: null,
        onHover: (event) => {
            event.native.target.style.cursor = 'default';
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Industries',
                    font: {
                        size: 16
                    }
                },
                grid: {
                    display: false
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Percentage',
                    font: {
                        size: 16
                    }
                },
                ticks: {
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
                    <button
                        onClick={handleRevert}
                        className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark focus:outline-none"
                    >
                        Revert
                    </button>
                </>
            )}
        </div>
    );
});

export default ToolsBarChart;

