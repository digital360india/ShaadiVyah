"use client"
import React from 'react';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const Portfolio = () => {
  const { data: session } = useSession();



  return (
    <div className='pt-44'>
      <p className='pt-40'>Welcome, {session?.user?.name}!</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}

export default Portfolio;
