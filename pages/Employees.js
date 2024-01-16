import React, { useState } from 'react';

const Employees = ({ Employeesdetails }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const teammember = Employeesdetails.filter(
    (e) =>
      e.type === 'teammember' &&
      e.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const teamlead = Employeesdetails.filter(
    (e) =>
      e.type === 'teamlead' &&
      e.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='mt-10 mx-10'>
      <form className='flex items-center absolute right-5'>
        <label htmlFor='simple-search' className='sr-only'>
          Search
        </label>
        <div className='relative w-60 '>
          <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
            <svg
              className='w-4 h-4 text-gray-500 dark:text-gray-400'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 18 20'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2'
              />
            </svg>
          </div>
          <input
            type='text'
            id='simple-search'
            value={searchQuery}
            onChange={handleSearchChange}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Search branch name...'
            required
          />
        </div>
        <button
          type='submit'
          className='p-2.5 ms-2 text-sm font-medium text-white bg-black rounded-lg border border-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-black dark:bg-black dark:hover:bg-black dark:focus:ring-black'
        >
          <svg
            className='w-4 h-4'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
            />
          </svg>
          <span className='sr-only'>Search</span>
        </button>
      </form>

      <div className='mb-8 mt-10'>
        <h2 className='text-2xl font-bold mb-4'>Team Members</h2>
        <div className='grid grid-cols-5 gap-4'>
          {teammember.length === 0 ? (
            <p>No team members found.</p>
          ) : (
            teammember.map((member) => (
              <div
                key={member.id}
                className='flex items-center '
              >
                <button
                  className='bg-white mt-5 text-black rounded px-4 py-2 hover:bg-gray-50 shadow-lg focus:outline-none focus:ring focus:border-gray-300'
                >
                  {member.name}
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <h2 className='text-2xl font-bold mb-4 mt-10'>Team Leads</h2>
        <div className='grid grid-cols-5 gap-4'>
          {teamlead.length === 0 ? (
            <p>No team leads found.</p>
          ) : (
            teamlead.map((lead) => (
              <div key={lead.id} className='flex items-center '>
                <button
                  className='bg-white mt-5 text-black rounded px-4 py-2 hover:bg-gray-50 shadow-lg focus:outline-none focus:ring focus:border-gray-300'
                >
                  {lead.name}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Employees;
