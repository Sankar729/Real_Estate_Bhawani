import React from 'react';

export default function About() {
  return (
    <div className='py-20 px-4 max-w-6xl mx-auto text-center bg-gray-50'>
      {/* Title */}
      <h1 className='text-4xl font-extrabold mb-6 text-slate-900'>
        About <span className='text-green-600'>Sankar Estate</span>
      </h1>
      
      {/* Description */}
      <p className='mb-8 text-lg leading-relaxed text-slate-600'>
      SankaR Estate is a leading real estate agency that specializes in helping clients buy, sell, 
        and rent properties in the most desirable neighborhoods. Our team of experienced agents is 
        dedicated to providing exceptional service and making the buying and selling process as 
        smooth as possible.
      </p>

      {/* Mission Section */}
      <div className='mb-10'>
        <h2 className='text-2xl font-bold text-slate-800 mb-4'>
          Our Mission
        </h2>
        <p className='text-md text-slate-600 leading-relaxed'>
          Our mission is to help our clients achieve their real estate goals by providing expert advice, 
          personalized service, and a deep understanding of the local market. Whether you are looking 
          to buy, sell, or rent a property, we are here to help you every step of the way.
        </p>
      </div>

      {/* Team Section */}
      <div className='mb-10'>
        <h2 className='text-2xl font-bold text-slate-800 mb-4'>
          Our Team
        </h2>
        <p className='text-md text-slate-600 leading-relaxed'>
          Our team of agents has a wealth of experience and knowledge in the real estate industry, 
          and we are committed to providing the highest level of service to our clients. We believe 
          that buying or selling a property should be an exciting and rewarding experience, and we 
          are dedicated to making that a reality for each and every one of our clients.
        </p>
      </div>
    </div>
  );
}
