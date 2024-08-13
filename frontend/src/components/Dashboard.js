import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchData } from '../redux/actions'
import SkillsBarChart from './SkillsBarChart';
import ToolsBarChart from './ToolsBarChart';
import DoughnutChart from './DoughnutChart';
import HorizontalBarChart from './HorizontalBarChart';
import SummaryStats from './SummaryStats';
import JobFilter from './JobFilter';

const Dashboard = () => {
    // Retrieves the dispatch function to send actions to the redux store
    const dispatch = useDispatch();
    // Retrieves and selects the data state from the redux store (Initial state)
    const data = useSelector(state => state.data, shallowEqual);  

    // For handling interactivity between PieChart.js and HorizontalBarChart.js
    const [selectedEducationLevel, setSelectedEducationLevel] = useState('Bachelors');
    const [selectedColor, setSelectedColor] = useState('rgba(251, 183, 244, 1)');
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
        /* Dashboard container */
        <div className="glass-1 flex flex-col w-[95%] min-h-[90vh] lg:min-h-[90vh] mx-auto my-[5vh] pr-8 pl-8 lg:pl-0 py-8">
            {/* Dashboard content */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 h-full">
                {/* Left partition */}
                <div className="lg:col-span-1 flex flex-col relative">
                    <div className="logo mt-2 flex items-center justify-center ">
                        <img src="/logo.png" alt="Logo" className="h-20 w-auto pl-2 py-2" />
                    </div>
                    <div className='pl-6 pr-4 -mt-12 lg:-mt-5'>
                        <JobFilter jobtitles={jobTitles} selectedJob={selectedJobTitle} onChange={handleJobTitleChange} />
                    </div>
                    <div className="absolute -top-8 -bottom-8 inset-y-0 -right-2 lg:border-r-2 border-r-[rgba(255,255,255,0.15)]"></div>
                </div>
                {/* Right partition */}
                <div className="lg:col-span-4 grid grid-rows-[auto,1fr,1fr]">
                    <div className="">
                        <SummaryStats stats={data.summaryStats} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="p-4 flex items-center justify-center w-full h-96 md:h-[47.5vh] max-w-full max-h-full order-1 max-md:order-1">
                            <SkillsBarChart data={data.skills} jobTitle={selectedJobTitle} />
                        </div>
                        <div className="p-4 flex items-center justify-center h-96 md:h-[47.5vh] max-w-full max-h-full order-2 max-md:order-3">
                            <DoughnutChart data={data.education_levels} onSliceClick={handleSliceClick} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="p-4 flex items-center justify-center w-full h-96 md:h-[47.5vh] max-w-full max-h-full order-3 max-md:order-2">
                            <ToolsBarChart data={data.tools} jobTitle={selectedJobTitle} />
                        </div>
                        <div className="p-4 flex items-center justify-center w-full h-96 md:h-[47.5vh] max-w-full max-h-full order-4 max-md:order-4">
                            <HorizontalBarChart data={data.fields_of_study} selectedEducationLevel={selectedEducationLevel} selectedColor={selectedColor} />
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    );
};

export default React.memo(Dashboard);