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
        <div className="relative inline-block w-full mt-20 text-left">
            <div className="mb-2 text-lg font-md text-white">Select Job Title</div>
            <div>
                <button
                    type="button"
                    className="w-full px-4 py-3 text-left text-gray-200 rounded-xl cursor-pointer focus:outline-none glass-2"
                    onClick={handleToggle}
                >
                    <span className={`${isOpen ? 'italic text-gray-400' : ''}`}>
                        {isOpen ? 'Select Job Title' : selectedJob || 'All'}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className={`w-5 h-5 text-gray-400 ${isOpen ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.23 7.72a.75.75 0 011.06-.02L10 11.176l3.71-3.456a.75.75 0 111.04 1.084l-4.25 4a.75.75 0 01-1.04 0l-4.25-4a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
                        </svg>
                    </span>
                </button>
            </div>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-xl glass-2">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <div
                        onClick={() => handleSelect('')}
                        className="relative px-4 py-3 mx-2 my-1 text-gray-200 rounded-xl cursor-pointer select-none hover-highlight"
                        role="menuitem"
                        >
                            <span className="block font-normal truncate">All</span>
                        </div>
                        {jobtitles.map((job, index) => (
                            <div
                                key={index}
                                onClick={() => handleSelect(job)}
                                className="relative px-4 py-3 mx-2 my-1 text-gray-200 rounded-xl cursor-pointer select-none hover-highlight"
                                role="menuitem"
                            >
                                <span className={`block font-normal truncate ${job === selectedJob ? 'font-bold' : ''}`}>
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
