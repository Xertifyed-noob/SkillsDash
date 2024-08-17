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
                industry: item.industry === 'Information Technology' ? 'IT' : item.industry,
                proportion: (item.count / totalCount) * 100
            }));
            // Update the state with processed drilldown data and the drilldown chart title
            setDrilldownData(drilldownDataProportions);
            setDrilldownTitle(`${String(tool).charAt(0).toUpperCase() + String(tool).slice(1)} distribution`);
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
        // Check if the clicked tool contains any spaces (tool array has more than one element), if yes, join the elements with spaces
        const toolWithSpaces = Array.isArray(tool) && tool.length > 1 ? [tool.join(' ')] : tool;
        setCurrentTool(toolWithSpaces);
        fetchAndSetDrilldownData(toolWithSpaces, jobTitle);
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
    const labels = sortedData.map(item => item.tool.split(' '));
    const proportions = sortedData.map(item => (item.count / totalCount) * 100);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Tools',
                data: proportions,
                backgroundColor: 'rgba(186, 245, 244, 1)',
                borderColor: 'rgba(186, 245, 244, 1)',
                hoverBackgroundColor: 'rgba(66, 247, 244, 1)', 
                hoverBorderColor: 'rgba(66, 247, 244, 1)',  
                borderRadius: 5
            }
        ]
    };

    const options = {
        layout: {
            padding: {
              top: 25,
            },
        },
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
                    bottom: 25 
                }   
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1,
                position: 'nearest',
                yAlign: 'bottom', 
                callbacks: {
                    title: function(tooltipItems) {
                        let title = tooltipItems[0].label.replace(/,/g, ' ');
                        return title;
                    },
                    label: function(context) {
                        return ` ${parseFloat(context.raw).toFixed(1)}%`;
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
                    display: false
                },
                ticks: {
                    maxRotation: 0, 
                    minRotation: 0,
                    font: {
                        size: 12
                    },
                    autoSkip: false,
                    callback: function(value) {
                        const screenWidth = window.innerWidth;
                        const rotation = (screenWidth >= 900 && screenWidth <= 1300) || screenWidth < 600 ? 35 : 0;
    
                        this.options.ticks.maxRotation = rotation;
                        this.options.ticks.minRotation = rotation;
    
                        return this.getLabelForValue(value);
                    },
                },
                grid: {
                    display: false 
                },
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

    const drilldownChartData = drilldownData 
        ? {
            labels: drilldownData.map((item) => {
                if (item.industry.includes('&')) {
                    const [before, after] = item.industry.split(' & ');
                    return [`${before} &`, after];
                }
                return item.industry.split(' ');
            }),
            datasets: [
                {
                    label: 'Industries',
                    data: drilldownData.map(item => item.proportion),
                    backgroundColor: 'rgba(10, 228, 252, 1)',
                    borderColor: 'rgba(10, 228, 252, 1)',
                    hoverBackgroundColor: 'rgba(10, 190, 252, 1)',
                    hoverBorderColor: 'rgba(10, 190, 252, 1)',  
                    borderRadius: 7
                },
            ],
        } 
    : null;

    const drilldownOptions = {
        ...options,
        plugins: {
            ...options.plugins,
            title: {
                ...options.plugins.title,
                text: drilldownTitle,
            }
        },
        onClick: null,
        onHover: (event) => {
            event.native.target.style.cursor = 'default';
        },
        scales: {
            ...options.scales,
            x: {
                ...options.scales.x,
                ticks: {
                    ...options.scales.x.ticks,
                    callback: function(value) {
                        const screenWidth = window.innerWidth;
                        const rotation = (screenWidth >= 900 && screenWidth <= 1900) || screenWidth < 800 ? 35 : 0;
                        this.options.ticks.maxRotation = rotation;
                        this.options.ticks.minRotation = rotation;

                        return this.getLabelForValue(value); 
                    }, 
                },
            },
            y: {
                ...options.scales.y,
            }
        }
    };

    return (
        <div className="relative h-full w-full max-w-full max-h-full">
            {!drilldownData ? (
                <Bar data={chartData} options={options} />
            ) : (
                <>
                    <Bar data={drilldownChartData} options={drilldownOptions} />
                    <button
                        onClick={handleRevert}
                        className="absolute top-4 right-2 px-4 py-1 text-white tracking-wide focus:outline-none hover-highlight glass-1"
                        style={{ borderRadius: '12px', boxShadow: '10px 10px 3px rgba(0, 0, 0, 0.2)' }}
                    >
                        Revert
                    </button>
                </>
            )}
        </div>
    );
});

export default ToolsBarChart;

