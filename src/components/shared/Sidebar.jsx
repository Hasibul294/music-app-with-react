import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineMenu,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { SiMusicbrainz } from "react-icons/si";
import { RiCloseLine } from "react-icons/ri";
import { IoMdTrendingUp } from "react-icons/io";
import { FaHandPointRight } from "react-icons/fa";
import logo from "../../assets/logo.svg";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import initializeAuthentication from "../../firebase/firebase.init";

initializeAuthentication();
const provider = new GoogleAuthProvider();

const links = [
  { name: "Home", to: "/", icon: HiOutlineHome },
  { name: "Trending Now", to: "/trending-now", icon: IoMdTrendingUp },
  { name: "Recommendation", to: "/recommendation", icon: FaHandPointRight },
  { name: "Top Artist", to: "/top-artists", icon: HiOutlineUserGroup },
];

const NavLinks = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [user, setUser] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const auth = getAuth();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(loggedInUser);
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleLogOut = () => {
    signOut(auth).then(() => {
      setUser({});
    });
  };

  return (
    // bg-[#191624]
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-gradient-color-service">
        <div className="w-full flex justify-center items-center">
          <SiMusicbrainz className="w-16 h-16 text-cyan-400" />
        </div>
        <span className="text-center text-white font-bold">Mymusic</span>
        <NavLinks />

        {user.email ? (
          <div className="text-white text-center">
            <div className="flex flex-col space-y-3 justify-center items-center">
              <img
                src={user?.photo}
                alt="user image"
                width={50}
                height={50}
                className="border-2 border-cyan-300 rounded-full"
              />
              <p className="text-white">{user.name}</p>
            </div>
            <button
              onClick={handleLogOut}
              type="button"
              className="w-full mt-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile sidebar */}
      <div className="absolute md:hidden block top-6 right-3">
        {!mobileMenuOpen ? (
          <HiOutlineMenu
            className="w-6 h-6 mr-2 text-white"
            onClick={() => setMobileMenuOpen(true)}
          />
        ) : (
          <RiCloseLine
            className="w-6 h-6 mr-2 text-white"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
