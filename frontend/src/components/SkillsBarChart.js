import React, { memo, useState, useEffect, useCallback} from 'react';
import { Bar } from 'react-chartjs-2'
import { useDispatch } from 'react-redux';
import { fetchSkillIndustryData } from '../redux/actions';
import { Button } from '@mui/material';

const SkillsBarChart = memo(({ data, jobListingCount, jobTitle }) => {

    // Data should be an array of skills data (data.skills in Dashboard.js)
    console.log('SkillsBarChart Data:', data); 

    const dispatch = useDispatch();
    const [drilldownData, setDrilldownData] = useState(null);
    const [currentJobTitle, setCurrentJobTitle] = useState(jobTitle);
    const [currentSkill, setCurrentSkill] = useState(null);
    const [drilldownTitle, setDrilldownTitle] = useState('');

    const fetchAndSetDrilldownData = useCallback((skill, jobTitle) => {
        dispatch(fetchSkillIndustryData(skill, jobTitle)).then((response) => {
            const sortedDrilldownData = [...response.skillIndustries].sort((a, b) => b.count - a.count).slice(0, 7);
            const totalCount = [...response.skillIndustries].reduce((sum, item) => sum + item.count, 0);
            const drilldownDataProportions = sortedDrilldownData.map(item => ({
                ...item,
                proportion: (item.count / totalCount) * 100
            }));
            setDrilldownData(drilldownDataProportions);
            setDrilldownTitle(`Distribution of Skill (${skill}) across Industries`);
        });
    }, [dispatch]);

    useEffect(() => {
        if (currentJobTitle !== jobTitle) {
            setCurrentJobTitle(jobTitle);
            if (currentSkill) {
                fetchAndSetDrilldownData(currentSkill, jobTitle);
            } else {
                setDrilldownData(null);
            }
        }
    }, [jobTitle, currentJobTitle, currentSkill, fetchAndSetDrilldownData]);

    const handleClick = (skill) => {
        setCurrentSkill(skill);
        fetchAndSetDrilldownData(skill, jobTitle);
    };

    const handleRevert = () => {
        setDrilldownData(null);
        setCurrentSkill(null);
    };

    // Sort the data by count and take the top 10 skills
    const sortedData = data.slice().sort((a, b) => b.count - a.count).slice(0, 10);
    // Calculate total count to compute proportions
    const totalCount = data.reduce((sum, item) => sum + item.count, 0);
    // Extract labels (skills) and data (proportions) for the top 10 skills
    const labels = sortedData.map(item => item.skill);
    const proportions = sortedData.map(item => (item.count / totalCount) * 100);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Skills',
                data: proportions,
                backgroundColor: 'rgba(75, 192, 192,1)',
                borderColor: 'rgba(75, 192, 192, 1)',
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
                text: `Skills distribution across ${jobListingCount} Jobs`,
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
                const skill = labels[elements[0].index];
                handleClick(skill);
            }
        },
        onHover: (event, chartElement) => {
            event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Skills',
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

export default SkillsBarChart;
