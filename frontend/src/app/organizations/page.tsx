"use client";

import OrganizationCard from '@/components/OrganizationCard';
import { useEffect, useState } from 'react';

const page = () => {
  const [organizations, setOrganizations] = useState([]);

  
  useEffect(() => {
    fetch('http://localhost:3000/organizations')
      .then(response => response.json())
      .then(data => setOrganizations(data));
  }, []);

  return (
    <div className='flex justify-center items-center m-7'>
      {
        organizations.map(organization => (
          <OrganizationCard key={organization._id} organization={organization} />
        ))
      }
    </div>
  )
}

export default page
