import React, { memo } from 'react';

const StatBox = ({ title, value }) => (
    <div className="flex flex-col items-center justify-center h-full p-4 text-white rounded-lg shadow-md glass-1">
        <h3 className="mb-2 text-xl font-bold text-center">{title}</h3>
        <p className="text-2xl text-center font-bold">{value}</p>
    </div>
);

const SummaryStats = memo(({ stats }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBox title="Total Jobs" value={stats.total_job_listings} />
        <StatBox title="Total Industries" value={stats.total_industries} />
        <StatBox title="Average Rating" value={stats.average_rating} />
        <StatBox title="Average Salary" value={stats.average_salary} />
    </div>
));

export default SummaryStats;

