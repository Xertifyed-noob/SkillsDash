import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchData } from '../redux/actions'
import BarChart from './BarChart';
import HeatMap from './HeatMap';
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

    // Fetches data, Dispatches action, and updates state in redux store upon component mount (Updated state)
    useEffect(() => {
        console.log('Fetching data for default job title');
        // Ensures data fetching, action dispatch and state action effect happens only once via dependency array
        dispatch(fetchData('Data Analyst'));
    }, [dispatch]);

    console.log('Dashboard Data:', data);

    // Renders and passes data as props to sub-components
    return (
        <Container>
            <JobFilter jobtitles={[]} selectedJob={'Data Analyst'} onChange={() => {}} />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <SummaryStats stats={data.summaryStats} />
                </Grid>
                <Grid item xs={6}>
                    <BarChart data={data.skills} />
                </Grid>
                <Grid item xs={6}>
                    <PieChart data={data.education_levels} />
                </Grid>
                <Grid item xs={6}>
                    <HorizontalBarChart data={data.fields_of_study} /> 
                </Grid>
                <Grid item xs={6}>
                    <HeatMap data={data.tools} />
                </Grid>
                <Grid item xs={6}>
                    <ThreeDModel />
                </Grid>
            </Grid>
        </Container>
    );
};

export default React.memo(Dashboard);