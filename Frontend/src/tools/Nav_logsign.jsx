import { Link } from 'react-router-dom';
import DevCollabLogo from '../assets/DevCollab_Logo.png';
const Navbar2 = () => {
  return (
    
      <nav className=" w-[100%] max-w-8xl relative group mx-auto  max-w-6xl transition-all duration-300
        bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg
        flex justify-between items-center px-6 py-3
        hover:scale-x-[1.02] origin-left
        
        
        sm:relative sm:top-0 sm:left-1/2 sm:-translate-x-1/2  ">
        
        <div className="flex items-center gap-3">
         <img src={DevCollabLogo}  className="h-13 w-13" />
          <span className="text-white/70 text-xl font-semibold">
            Dev<span className='text-blue-300/70'>Collab</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/" className="text-white hover:text-purple-300 transition">Home</Link>
        </div>
      </nav>
    
  );
};

export default Navbar2;

