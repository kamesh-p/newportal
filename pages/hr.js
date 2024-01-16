// Hr.js
import Link from 'next/link';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Hierachy from './Hierachy';
import Employees from './Employees';
import Surveylist from "./Surveylist"
import clientPromise from '../lib/mongodb';


const Hr = ({Employeesdetails}) => {
  const userLoggedIn = useSelector((state) => state.user);
  const name = userLoggedIn?.user?.user?.name;
  const type = userLoggedIn?.user?.user?.type;
  const email = userLoggedIn?.user?.user?.email;
  console.log("empllll",Employeesdetails);
  const [activeTab, setActiveTab] = useState('Employees');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Employees':
        return <Employees Employeesdetails={Employeesdetails}  />;
      case 'Hierachy':
        return <Hierachy Employeesdetails={Employeesdetails} />;
      case 'Surveylist':
        return <Surveylist />;
  
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col h-screen bg-gray-800 text-white p-4 w-1/6">
        <p className="text-lg font-bold mb-4">Personal info</p>
        <p className="mb-4">{name}</p>
        <p className="mb-4">{email}</p>
        <p className="mb-4">{type}</p>
        <p className="text-lg font-bold mt-4 text-white">Survey</p>
        <Link href="/generalQuestions">
          <p className="mb-4">Fresher survey </p>
        </Link>
        <p className="text-lg font-bold mt-4 text-white">Project </p>
        <Link href="/companyprojects">
        <p className="mb-4">Project Details</p>
        </Link>
        <p className="text-lg font-bold mt-4 text-white">Leave </p>
        <p className="mb-4">Teammember</p>
        <p className="mb-4">Teamlead</p>
      </div>

      <div className="w-5/6">
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li className="me-2">
              <a
                onClick={() => handleTabClick('Employees')}
                className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${
                  activeTab === 'Employees'
                    ? 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                    : ''
                }`}
              >
                Employees
              </a>
            </li>
            <li className="me-2">
              <a
                onClick={() => handleTabClick('Hierachy')}
                className={`inline-block p-4 border-b-2 ${
                  activeTab === 'Hierachy'
                    ? 'text-blue-600 border-blue-600 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                    : ''
                }`}
                aria-current={activeTab === 'Hierachy' ? 'page' : undefined}
              >
                Hierachy
              </a>
            </li>
            <li className="me-2">
              <a
                onClick={() => handleTabClick('Surveylist')}
                className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${
                  activeTab === 'Surveylist'
                    ? 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                    : ''
                }`}
              >
                Surveylist
              </a>
            </li>
           
        
          </ul>
        </div>
        {renderTabContent()}
      </div>
    </div>
  );
};
export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db('test');

    const product = await db.collection('users').find({}).toArray();

    return {
      props: { Employeesdetails: JSON.parse(JSON.stringify(product)) },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { Employeesdetails: [] },
    };
  }
}
export default Hr;
