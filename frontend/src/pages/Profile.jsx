import React, { useState, useEffect } from 'react';
import useAxiosAuth from '../api/api';

export default function Profile() {
  const [user, setUser] = useState(null);
  const axios = useAxiosAuth();

  useEffect(() => {
    axios.get('user').then((response) => {
      setUser(response.data);
      console.log(response.data)
    });
  }, []);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 items-center">
    <div className="bg-white overflow-hidden shadow rounded-lg border max-w-screen-sm center w-1/2 p-4">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          User Profile
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          This is some information about the user.
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user ? user.name : ''}</dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user ? user.email : ''}</dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Phone number</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user ? user.phone : ''}</dd>
          </div>
        </dl>
      </div>
    </div>
    </div>
    );
  }
  
  // <div className="h-screen dark:bg-gray-700 bg-gray-200 pt-12">
  //   {/* Card start */}
  //   <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
  //     <div className="border-b px-4 pb-6">
  //       <div className="text-center my-4">
  //         <img
  //           className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
  //           src={user ? user.profilePicture : 'https://randomuser.me/api/portraits/women/21.jpg'}
  //           alt=""
  //         />
  //         <div className="py-2">
  //           <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
  //             {user ? user.name : ''}
  //           </h3>
  //           <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
  //             <svg
  //               className="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1"
  //               fill="currentColor"
  //               xmlns="http://www.w3.org/2000/svg"
  //               viewBox="0 0 24 24"
  //               width="24"
  //               height="24"
  //             >
  //               {/* Your SVG path here */}
  //             </svg>
  //             {user ? user.location : 'New York, NY'}
  //           </div>
  //         </div>
  //       </div>
  //       <div className="flex gap-2 px-2">
  //         <button className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
  //           Follow
  //         </button>
  //         <button className="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2">
  //           Message
  //         </button>
  //       </div>
  //     </div>
  //     <div className="px-4 py-4">
  //       <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
  //         <svg
  //           className="h-6 w-6 text-gray-600 dark:text-gray-400"
  //           fill="currentColor"
  //           xmlns="http://www.w3.org/2000/svg"
  //           viewBox="0 0 24 24"
  //           width="24"
  //           height="24"
  //         >
  //           {/* Your SVG path here */}
  //         </svg>
  //         <span>
  //           <strong className="text-black dark:text-white">{user ? user.followers : '0'}</strong>{' '}
  //           Followers you know
  //         </span>
  //       </div>
  //     </div>
  //   </div>
  //   {/* Card end */}
  // </div>