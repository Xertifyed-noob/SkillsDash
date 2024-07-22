import React, { memo } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StatBox = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
    // backgroundColor: '#1e1e2f', 
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}));

const StatTitle = styled(Typography)({
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#000000', 
});

const StatValue = styled(Typography)({
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#000000', 
});

const SummaryStats = memo(({ stats }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <StatBox>
                    <StatTitle>Total Jobs</StatTitle>
                    <StatValue>{stats.total_job_listings}</StatValue>
                </StatBox>
            </Grid>
            <Grid item xs={3}>
                <StatBox>
                    <StatTitle>Total Industries</StatTitle>
                    <StatValue>{stats.total_industries}</StatValue>
                </StatBox>
            </Grid>
            <Grid item xs={3}>
                <StatBox>
                    <StatTitle>Average Rating</StatTitle>
                    <StatValue>{stats.average_rating}</StatValue>
                </StatBox>
            </Grid>
            <Grid item xs={3}>
                <StatBox>
                    <StatTitle>Average Salary</StatTitle>
                    <StatValue>{stats.average_salary}</StatValue>
                </StatBox>
            </Grid>
        </Grid>
    );
});

export default SummaryStats;