import React, { useState } from 'react';

const JobFilter = ({ jobtitles, selectedJob, onChange }) => {
    // State variable which determines whether the dropdown menu is open or closed
    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle the dropdown menu's open or closed state
    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    // Function to hanfdle job title selection from dropdown menu
    const handleSelect = (job) => {
        onChange(job);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left w-full mt-20">
            <div className="mb-2 text-lg font-medium text-white">Select Job Title</div>
            <div>
                <button
                    type="button"
                    className="glass-2 w-full text-gray-200 text-left py-3 px-4 rounded-md focus:outline-none cursor-pointer"
                    onClick={handleToggle}
                >
                    <span className={`${isOpen ? 'italic text-gray-400' : ''}`}>
                        {isOpen ? 'Select Job Title' : selectedJob || 'All'}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className={`w-5 h-5 ${isOpen ? 'transform rotate-180' : ''} text-gray-400`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.23 7.72a.75.75 0 011.06-.02L10 11.176l3.71-3.456a.75.75 0 111.04 1.084l-4.25 4a.75.75 0 01-1.04 0l-4.25-4a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
                        </svg>
                    </span>
                </button>
            </div>

            {isOpen && (
                <div className="glass-2 origin-top-right absolute right-0 mt-2 w-full rounded-md z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <div
                        onClick={() => handleSelect('')}
                        className="cursor-pointer select-none relative py-3 px-4 text-gray-200 hover-highlight rounded-md"
                        role="menuitem"
                        >
                            <span className="font-normal block truncate">All</span>
                        </div>
                        {jobtitles.map((job, index) => (
                            <div
                                key={index}
                                onClick={() => handleSelect(job)}
                                className="cursor-pointer select-none relative py-3 px-4 text-gray-200 hover-highlight rounded-md"
                                role="menuitem"
                            >
                                <span className={`font-normal block truncate ${job === selectedJob ? 'font-bold' : ''}`}>
                                    {job}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default React.memo(JobFilter);
