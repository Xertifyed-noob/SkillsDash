import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const JobFilter = ({ jobtitles, selectedJob, onChange }) => {
    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="job-title-select-label">Job Title</InputLabel>
            <Select
                labelId="job-title-select-label"
                value={selectedJob}
                onChange={handleChange}
            >
                <MenuItem value=""><em>All</em></MenuItem>
                {jobtitles.map((job, index) => (
                    <MenuItem key={index} value={job}>{job}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default React.memo(JobFilter);
