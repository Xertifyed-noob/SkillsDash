import React, { memo } from 'react';

const StatBox = ({ title, value }) => (
    <div className="bg-surface text-white p-4 rounded-lg shadow-md text-center">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
    </div>
);

const SummaryStats = memo(({ stats }) => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatBox title="Total Jobs" value={stats.total_job_listings} />
        <StatBox title="Total Industries" value={stats.total_industries} />
        <StatBox title="Average Rating" value={stats.average_rating} />
        <StatBox title="Average Salary" value={stats.average_salary} />
    </div>
));

export default SummaryStats;