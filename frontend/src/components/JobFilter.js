import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

const JobFilter = ({ jobtitles, selectedJob, onChange }) => {
    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <div>
            <Typography variant="subtitle1" gutterBottom>Select Job Title</Typography>
            <FormControl fullWidth>
                <Select
                    value={selectedJob}
                    onChange={handleChange}
                    displayEmpty
                >
                    <MenuItem value="">All</MenuItem>
                    {jobtitles.map((job, index) => (
                        <MenuItem key={index} value={job}>{job}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default React.memo(JobFilter);
