import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchData } from '../redux/actions'
import SkillsBarChart from './SkillsBarChart';
import ToolsBarChart from './ToolsBarChart';
import PieChart from './PieChart';
import HorizontalBarChart from './HorizontalBarChart';
import SummaryStats from './SummaryStats';
import JobFilter from './JobFilter';
import ThreeDModel from './ThreeDModel';

const Dashboard = () => {
    // Retrieves the dispatch function to send actions to the redux store
    const dispatch = useDispatch();
    // Retrieves and selects the data state from the redux store (Initial state)
    const data = useSelector(state => state.data, shallowEqual);  

    // Access job listing counts from data object and pass it as props to the visualisations for chart titles
    const jobListingCount = data.summaryStats.total_job_listings;

    // For handling interactivity between PieChart.js and HorizontalBarChart.js
    const [selectedEducationLevel, setSelectedEducationLevel] = useState('Bachelors');
    const [selectedColor, setSelectedColor] = useState('#FF6384');
    const handleSliceClick = (educationLevel, color) => {
        setSelectedEducationLevel(educationLevel);
        setSelectedColor(color);
    };

    // For job title filtering by JobFilter.js
    const [selectedJobTitle, setSelectedJobTitle] = useState('');
    const jobTitles = ['Data Analyst', 'Data Scientist', 'Data Engineer'];
    const handleJobTitleChange = (jobTitle) => {
        console.log('Selected job title:', jobTitle);
        setSelectedJobTitle(jobTitle);
    };

    // Fetches data, Dispatches action, and updates state in redux store upon component mount (Updated state)
    useEffect(() => {
        // Ensures data fetching, action dispatch and state action effect happens again only if job title changes
        dispatch(fetchData(selectedJobTitle));
    }, [dispatch, selectedJobTitle]);

    console.log('Dashboard Data:', data);

    // Renders and passes data as props to sub-components
    return (
        <div className="min-h-screen bg-background text-white p-6">
            <div className="container mx-auto h-full">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 h-full">
                    <div className="lg:col-span-6 flex flex-col">
                        <SummaryStats stats={data.summaryStats} />
                    </div>
                    <div className="lg:col-span-3 flex-col">
                        <div className="h-full">
                            <SkillsBarChart data={data.skills} jobListingCount={jobListingCount} jobTitle={selectedJobTitle} />
                        </div>
                    </div>
                    <div className="lg:col-span-3 flex-col">
                        <div className="h-full">
                            <ToolsBarChart data={data.tools} jobListingCount={jobListingCount} jobTitle={selectedJobTitle} />
                        </div>
                    </div>
                    <div className="lg:col-span-3 flex-col">
                        <div className="h-full">
                            <PieChart data={data.education_levels} jobListingCount={jobListingCount} onSliceClick={handleSliceClick} />
                        </div>
                    </div>
                    <div className="lg:col-span-3 flex-col">
                        <div className="h-full">
                            <HorizontalBarChart data={data.fields_of_study} selectedEducationLevel={selectedEducationLevel} selectedColor={selectedColor} />
                        </div>
                    </div>
                    <div className="lg:col-span-6 flex">
                        <ThreeDModel />
                    </div>
                </div>
                <div className="mt-6">
                    <JobFilter jobtitles={jobTitles} selectedJob={selectedJobTitle} onChange={handleJobTitleChange} />
                </div>
            </div>
        </div>
    );
};

export default React.memo(Dashboard);