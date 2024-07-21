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
import { Grid, Container } from '@mui/material';

const Dashboard = () => {
    // Retrieves the dispatch function to send actions to the redux store
    const dispatch = useDispatch();
    // Retrieves and selects the data state from the redux store (Initial state)
    const data = useSelector(state => state.data, shallowEqual);  
    const [selectedEducationLevel, setSelectedEducationLevel] = useState('Bachelors');
    const [selectedColor, setSelectedColor] = useState('#FF6384');
    // For job title filtering
    const [selectedJobTitle, setSelectedJobTitle] = useState('');

    // Fetches data, Dispatches action, and updates state in redux store upon component mount (Updated state)
    useEffect(() => {
        console.log('Fetching data');
        // Ensures data fetching, action dispatch and state action effect happens only once via dependency array
        dispatch(fetchData(selectedJobTitle));
    }, [dispatch, selectedJobTitle]);

    // For handling interactivity between pie chart and horizontal bar chart
    const handleSliceClick = (educationLevel, color) => {
        setSelectedEducationLevel(educationLevel);
        setSelectedColor(color);
    };

    // For job title filtering
    const handleJobTitleChange = (jobTitle) => {
        setSelectedJobTitle(jobTitle);
    };

    console.log('Dashboard Data:', data);

    // Renders and passes data as props to sub-components
    return (
        <Container>
            <Grid container spacing={3}> 
                <Grid item xs={12}>
                    <SummaryStats stats={data.summaryStats} />
                </Grid>
                <Grid item xs={6}>
                    <SkillsBarChart data={data.skills} />
                </Grid>
                <Grid item xs={6}>
                    <ToolsBarChart data={data.tools}/>
                </Grid>
                <Grid item xs={6}>
                    <PieChart data={data.education_levels} onSliceClick={handleSliceClick}/>
                </Grid>
                <Grid item xs={6}>
                    <HorizontalBarChart data={data.fields_of_study} selectedEducationLevel={selectedEducationLevel} selectedColor={selectedColor} /> 
                </Grid>
                <Grid item xs={6}>
                    <ThreeDModel />
                </Grid>
            </Grid>
            <JobFilter jobtitles={['Data Analyst', 'Data Scientist', 'Data Engineer']} selectedJob={selectedJobTitle} onChange={handleJobTitleChange} />
        </Container>
    );
};

export default React.memo(Dashboard);