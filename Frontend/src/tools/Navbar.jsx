// import React from 'react';

// const Navbar = () => {
//   return (
//     // <nav className="relative top-5 left-1/2 transform  -translate-x-1/2 w-[100%] max-w-8xl px-5 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg flex justify-between items-center z-50">

//     <nav className="group relative top-5 left-1/2 transform -translate-x-1/2 transition-all duration-300 
//   w-[95%] max-w-10xl px-5 py-3 mx-4 bg-white/10 backdrop-blur-md rounded-full 
//   border border-white/20 shadow-lg flex justify-between items-center z-50
//   hover:w-[98%] hover:-translate-x-[50%]">
//       <div className="flex items-center gap-4">
//         <img src="/logo.png" alt="Logo" className="h-8 w-8" />
//         <span className="text-white/70 text-xl font-semibold">Dev<span className='text-blue-300/70'>Collab</span></span>
//       </div>
//       <div className="flex items-centergap-6">
//         <a href="#" className="text-white hover:text-purple-300 transition"></a>
//         <a href="#" className="relative text-white hover:text-purple-300 transition">Login</a>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    // <div className="relative top-5 left-0 w-ful z-50 px-4">
      <nav className=" w-[100%] max-w-8xl relative group mx-auto  max-w-6xl transition-all duration-300
        bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg
        flex justify-between items-center px-6 py-3
        hover:scale-x-[1.02] origin-left
        
        
        sm:relative sm:top-0 sm:left-1/2 sm:-translate-x-1/2  ">
        
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
          <span className="text-white/70 text-xl font-semibold">
            Dev<span className='text-blue-300/70'>Collab</span>
          </span>
        </div>
        

        <div className="flex items-center gap-4">
           <a  className="text-white hover:text-purple-300 transition"><Link to="/signup">Signup</Link></a>
          <a  className="text-white hover:text-purple-300 transition"><Link to="/login">Login</Link></a>
        </div>
      </nav>
    
  );
};

export default Navbar;

