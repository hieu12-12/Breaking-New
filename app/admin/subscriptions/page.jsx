'use client'; // Enables client-side rendering for this component

// Importing necessary modules and components
import SubsTableItem from '@/Components/AdminComponents/SubsTableItem'; // Custom component to display individual email subscription items in a table
import axios from 'axios'; // For making HTTP requests
import React, { useEffect, useState } from 'react'; // React hooks for state management and lifecycle methods
import { toast } from 'react-toastify'; // For displaying notifications

const Page = () => {
  // State to store the list of email subscriptions fetched from the server
  const [emails, setEmails] = useState([]);

  // Function to fetch email subscriptions from the API
  const fetchEmails = async () => {
    try {
      const response = await axios.get('/api/email'); // Send a GET request to fetch email data
      setEmails(response.data.emails); // Update state with the fetched email subscriptions
    } catch (error) {
      console.error('Error fetching emails:', error); // Log error to the console
      toast.error('Failed to fetch email subscriptions'); // Display error notification
    }
  };

  // Function to delete an email subscription by its ID
  const deleteEmail = async (mongoId) => {
    try {
      const response = await axios.delete('/api/email', {
        params: {
          id: mongoId, // Pass the email subscription ID as a query parameter
        },
      });
      if (response.data.success) {
        toast.success(response.data.msg); // Display success notification
        fetchEmails(); // Refresh the email list after deletion
      } else {
        toast.error('Error deleting subscription'); // Display error notification if the request fails
      }
    } catch (error) {
      console.error('Error deleting email subscription:', error); // Log error to the console
      toast.error('Failed to delete subscription'); // Display error notification
    }
  };

  // useEffect to fetch email subscriptions when the component is mounted
  useEffect(() => {
    fetchEmails(); // Fetch email subscriptions on component mount
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      {/* Page title */}
      <h1 className="text-3xl font-bold text-gray-800">All Subscriptions</h1>
      
      {/* Subscription table container */}
      <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 rounded-lg shadow-lg">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
            <tr>
              {/* Table headers */}
              <th scope="col" className="px-6 py-3">Email Subscription</th>
              <th scope="col" className="hidden sm:block px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Render each email subscription as a table row using the SubsTableItem component */}
            {emails.map((item, index) => (
              <SubsTableItem
                key={index} // Unique key for each subscription
                mongoId={item._id} // Subscription ID
                deleteEmail={deleteEmail} // Function to delete the subscription
                email={item.email} // Email address
                date={item.date} // Subscription date
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
