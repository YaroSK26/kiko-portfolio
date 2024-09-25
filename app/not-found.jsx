import React from 'react'
import HeaderId from '../components/HeaderId';

const notFound = () => {
  return (
    <div className=" text-black dark:text-white bg-white dark:bg-gray-900 h-screen">
      <HeaderId></HeaderId>
        <div className="flex justify-center mt-40 items-center flex-col mx-auto p-4">
            <h1 className="text-4xl font-bold">404 Not Found</h1>
            <p className="text-lg mt-4">The page you are looking for does not exist.</p><br />
            <a href="/" className='underline'>Go home.</a>
            </div>
    </div>
  );
}

export default notFound
