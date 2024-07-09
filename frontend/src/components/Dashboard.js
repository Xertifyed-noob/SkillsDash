import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchData } from '../redux/actions'
import BarChart from './BarChart';
import HeatMap from './HeatMap';
import PieChart from './PieChart';
import SummaryStats from './SummaryStats';
import JobFilter from './JobFilter';
import ThreeDModel from './ThreeDModel';
import { Grid, Container } from '@mui/material';

const Dashboard = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.data, shallowEqual);  

    // Directly fetch data for default job title on component mount
    useEffect(() => {
        console.log('Fetching data for default job title');
        dispatch(fetchData('Data Analyst'));
    }, [dispatch]);

    console.log('Dashboard Data:', data);

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
                    <PieChart data={data.education} />
                </Grid>
                <Grid item xs={12}>
                    <HeatMap data={data.tools} />
                </Grid>
                <Grid item xs={12}>
                    <ThreeDModel />
                </Grid>
            </Grid>
        </Container>
    );
};

export default React.memo(Dashboard);