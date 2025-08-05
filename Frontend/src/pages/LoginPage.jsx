import Particles from  "../blocks/Backgrounds/Particles/Particles"
import {Button} from "../components/ui/button"
import {Input} from "../components/ui/input"
import { Link } from "react-router-dom";
import Navbar2 from "../tools/Nav_logsign";
import API from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode} from 'jwt-decode';





export default function LoginPage() {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    const googleLoginUrl = `${import.meta.env.VITE_API_BASE_URL}/api/auth/oauth/google`
  window.location.href = googleLoginUrl;
};



const handleLogin = async () => {
  try {
    const res = await API.post("/api/auth/login", { email, password });
    const token = res.data.token;

    localStorage.setItem("token", token); // Store JWT

   const decoded = jwtDecode(token); 
if (!decoded.profileCompleted) {
  navigate("/complete-profile");
} else {
  navigate("/dashboard");
}

   
  } catch (err) {
    console.error("Login failed:", err.response?.data?.message || err.message);
    alert("Invalid credentials. Please try again.");
  }
};




  return (
    <div className="w-screen h-screen relative overflow-hidden bg-black">

    <Particles className="absolute inset-0" particleCount={900} particleSpread={20} speed={0.14} moveParticlesOnHover particleHoverFactor={1.2} cameraDistance={50} particleBaseSize={200}/>
    <div className="hidden sm:block  w-2xl items-center justify-center h-full px-4 z-10 absolute mt-10  flex-col text-center space-y-6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Navbar2 /></div>
    

     <div className="flex items-center justify-center h-full  px-4 z-10 absolute mt-10  flex-col text-center space-y-6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/40 shadow-4xl rounded-2xl p-8 text-white z-10">
        <h1 className="text-3xl font-bold text-center mb-6"><span className="text-white/70">Dev</span><span className="text-blue-500/70">Collab</span></h1>
          <h3 className="text-2xl font-semibold text-center mb-6">Login

          </h3>

          <div className="space-y-4 ">
            {/* <Input className="text-white transition-transform duration-200 hover:scale-105 hover:font-semibold" placeholder="Username" /> */}
            <Input className="text-white transition-transform duration-200 hover:scale-105 hover:font-semibold" type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
            <Input className="text-white transition-transform duration-200 hover:scale-105 hover:font-semibold" type="password" placeholder="Password" value={password}
            onChange={(e)=> setPassword(e.target.value)} />
          </div>

<Button className="mt-6 w-full bg-white/20 hover:bg-white/70 hover:text-black border border-white text-white transition-transform duration-200 hover:scale-105"
onClick={handleLogin}>
  Sign In
</Button>

<Button className="mt-6 w-full bg-white/20 hover:bg-white/70 hover:text-black border border-white text-white transition-transform duration-200 hover:scale-105"
onClick={handleGoogleLogin}
>
  <img
  src="https://www.svgrepo.com/show/475656/google-color.svg"
  alt="Google"
  className="relative w-5 h-5 mr-2 z-50 bg-white/60  "
/>
  <span className="font-semibold font-roboto">Sign In with Google</span>
</Button>

{/* Add Google image for Oauth Button */}

          <p className="mt-4 text-center text-sm text-white/70">
            Don't have an account?
            <br/>  </p>
            <div className=" pt-2 transition-transform duration-200 hover:scale-110 hover:text-white/30">
            <Link to='/signup'>SignUp</Link></div>
          {/* </p> */}
        </div>
      </div>
    </div>


  );
}
