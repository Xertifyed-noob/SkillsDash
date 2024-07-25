import React from 'react';

const JobFilter = ({ jobtitles, selectedJob, onChange }) => {
    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Select Job Title</label>
            <div className="relative">
                <select
                    value={selectedJob}
                    onChange={handleChange}
                    className="block appearance-none w-full bg-gray-800 border border-gray-700 text-gray-300 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500"
                >
                    <option value="">All</option>
                    {jobtitles.map((job, index) => (
                        <option key={index} value={job}>{job}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10l5 5 5-5H7z"/></svg>
                </div>
            </div>
        </div>
    );
};

export default React.memo(JobFilter);
