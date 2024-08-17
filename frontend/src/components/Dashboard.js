import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchData } from '../redux/actions'
import SkillsBarChart from './SkillsBarChart';
import ToolsBarChart from './ToolsBarChart';
import DoughnutChart from './DoughnutChart';
import HorizontalBarChart from './HorizontalBarChart';
import SummaryStats from './SummaryStats';
import JobFilter from './JobFilter';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

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

    // For job title filter dropdown animation
    const isMediumScreen = useMediaQuery({ query: '(max-width: 1180px)' });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Fetches data, Dispatches action, and updates state in redux store upon component mount (Updated state)
    useEffect(() => {
        // Ensures data fetching, action dispatch and state action effect happens again only if job title changes
        dispatch(fetchData(selectedJobTitle));
    }, [dispatch, selectedJobTitle]);

    console.log('Dashboard Data:', data);

    // Renders and passes data as props to sub-components
    return (
        /* Dashboard container */
        <motion.div
            initial={{ paddingBottom: 0 }}  
            animate={{ paddingBottom: isMediumScreen && isDropdownOpen ? 220 : 0 }}  
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative mx-auto my-[5vh] flex flex-col w-[95%] lg:min-h-[90vh] pt-8 pr-8 pl-8 lg:pl-0 glass-1"
        >
            {/* Dashboard content */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 h-full">
                {/* Left partition */}
                <div className="relative flex flex-col lg:col-span-1">
                    <div className="flex items-center justify-center p-4 mt-2 logo">
                        <img src="/logo.png" alt="Logo" className="h-20 w-auto py-2 pl-2" />
                    </div>
                    <div className='-mt-12 lg:-mt-5 pr-4 pl-6'>
                        <JobFilter jobtitles={jobTitles} selectedJob={selectedJobTitle} onChange={handleJobTitleChange} onToggle={setIsDropdownOpen}/>
                    </div>
                    <div className="absolute inset-y-0 -top-8 -right-2 border-r-[rgba(255,255,255,0.15)] lg:border-r-2"></div>
                </div>
                {/* Right partition */}
                <motion.div
                    initial={{ y: 0 }}
                    animate={isMediumScreen && isDropdownOpen ? { y: 220 } : { y: 0 }}  
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}  
                    className="grid grid-rows-[auto,1fr,1fr] lg:col-span-4"
                >
                    <div className="">
                        <SummaryStats stats={data.summaryStats} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 row-span-2 gap-3">
                        <div className="order-1 md:order-1 flex items-center justify-center p-4 w-full h-96 h-md:h-[55vh] h-lg:h-[39vh]">
                            <SkillsBarChart data={data.skills} jobTitle={selectedJobTitle} />
                        </div>
                        <div className="order-3 md:order-2 flex items-center justify-center p-4 h-96 h-md:h-[55vh] h-lg:h-[39vh]">
                            <DoughnutChart data={data.education_levels} onSliceClick={handleSliceClick} />
                        </div>
                        <div className="order-2 md:order-3 flex items-center justify-center p-4 w-full h-96 h-md:h-[55vh] h-lg:h-[39vh]">
                            <ToolsBarChart data={data.tools} jobTitle={selectedJobTitle} />
                        </div>
                        <div className="order-4 md:order-4 flex items-center justify-center p-4 w-full h-96 h-md:h-[55vh] h-lg:h-[39vh]">
                            <HorizontalBarChart data={data.fields_of_study} selectedEducationLevel={selectedEducationLevel} selectedColor={selectedColor} />
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default React.memo(Dashboard);