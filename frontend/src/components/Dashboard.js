import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    const { data, jobTitles } = useSelector(state => state);

    const [selectedJob, setSelectedJob] = useState('');

    useEffect(() => {
        dispatch(fetchData(selectedJob));
    }, [dispatch, selectedJob]);

    return (
        <Container>
            <JobFilter jobtitles={jobTitles} selectedJob={selectedJob} onChange={setSelectedJob} />
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

export default Dashboard;