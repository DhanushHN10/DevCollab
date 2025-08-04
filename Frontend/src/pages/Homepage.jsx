import { Link } from "react-router-dom";
import DarkVeil from "../blocks/Backgrounds/DarkVeil/DarkVeil";
import { Button } from "@/components/ui/button"; 
import Navbar from "../tools/Navbar";
import Counter from "../blocks/Components/Counter/Counter";

export default function Homepage() {
  return (
    <div className="w-screen min-h-screen relative overflow-y-hidden">
     
      <DarkVeil className="absolute inset-0 -z-10" />
      <div className="flex flex-col">
     
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10 w-150 max-w-5xl px-4">
        
        
        <div className="hidden sm:block">
        <Navbar /></div>
       
       
        <div className=" relative mt-10 flex flex-col items-center text-center space-y-6 ">
          <h1 className="font-roboto font-black text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-br from-white/50 to-slate-600 mix-blend-lighten drop-shadow-lg">
            DevCollab
          </h1>
          <p className="text-white/90 italic font-medium text-base sm:text-lg md:text-xl mb-">
            Collaborate. Build. Succeed.<br/>
            AI-powered skill based matching cum developer hub
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Button asChild variant="outline" className="text-white border-white bg-black/40 hover:bg-white/40 hover:border-black drop-shadow-lg">
              <Link to="/signup">
              SignUp</Link>
            </Button>
            <Button asChild variant="outline" className="text-white border-white bg-black/40 hover:bg-white/30 hover:border-black drop-shadow-lg">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>



        
      </div>

      {/* Description */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 mt-15 mb-15 text-center z-10 w-full max-w-3xl">
        <p className="text-white/90 text-base sm:text-lg md:text-xl drop-shadow-md">
          DevCollab is a platform where developers discover like-minded collaborators, join exciting projects, 
          and build meaningful software together<br/> 
          <span>Whether you’re starting a project or joining one, DevCollab makes 
          collaboration seamless</span>
        </p><br/>
        <p className="text-purple-400/80 text-base sm:text-lg md:text-xl drop-shadow-md font-black font-serif ">Join Now!</p>
      </div>

      {/* Counter Section */}
      <div className="relative left-1/2 bottom-45 transform -translate-x-1/2 text-center z-10 px-4 mt-7 py-5">
        <span className="text-white/60 text-lg px-7 relative bottom-3 sm:text-xl">Registered Users:</span>
        <Counter value={1978} />
      </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-4 w-full text-center text-white/80 text-sm z-10" >
        © 2025 DevCollab — Built by Dhanush H N 🖥️
      </footer>
    </div>
  );
}



