"use client";
import { useState } from "react";
import Link from 'next/link';
import { useAuth } from "@context/AuthContext";
import { useRouter } from "next/router";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [dropdownTimeout, setDropdownTimeout] = useState(null);

  const dropdownCloseDelay = 1000; 
  const openDropdown = () => {
    clearTimeout(dropdownTimeout);
    setIsDropdownOpen(true);
  };

  const closeDropdown = () => {
    const timeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, dropdownCloseDelay);

    setDropdownTimeout(timeout);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
          <div>
            <div className="sm:flex hidden">
            <div className="navbar bg-base-100 fixed w-full z-20 top-0 p-4">
              <div className="navbar-start ">
                <Link href="/map">
                  <button className="btn btn-ghost btn-circle">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                  </button>
                </Link>
                <Link href="/chat">
                  <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                      <svg viewBox="0 0 512 512" fill="currentColor" className="h-4 w-4">
                          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="52" d="M87.49 380c1.19-4.38-1.44-10.47-3.95-14.86a44.86 44.86 0 00-2.54-3.8 199.81 199.81 0 01-33-110C47.65 139.09 140.73 48 255.83 48 356.21 48 440 117.54 459.58 209.85a199 199 0 014.42 41.64c0 112.41-89.49 204.93-204.59 204.93-18.3 0-43-4.6-56.47-8.37s-26.92-8.77-30.39-10.11a31.09 31.09 0 00-11.12-2.07 30.71 30.71 0 00-12.09 2.43l-67.83 24.48a16 16 0 01-4.67 1.22 9.6 9.6 0 01-9.57-9.74 15.85 15.85 0 01.6-3.29z"/>
                      </svg>
                      <span className="badge badge-sm indicator-item">8</span>
                    </div>
                  </button>
                </Link>
                <div className="dropdown">
                  <label tabIndex={0} className="btn btn-ghost btn-circle">
                    <div className="indicator">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      <span className="badge badge-sm indicator-item">8</span>
                    </div>
                  </label>
                  <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                    <div className="card-body">
                      <span className="font-bold text-lg">Notifications</span>
                      <span className="text-info">Subtotal: $999</span>
                      <div className="card-actions">
                        <button className="btn btn-primary btn-block">View cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="navbar-center">
                <a href="/" className="btn btn-ghost normal-case text-4xl font-tsukimi_rounded">DJOBY</a>
              </div>
              <div className="navbar-end">
                {
                  isAuthenticated ? (
                    <>
                      <Link href="/annonce/add">
                        <button className="btn btn-outline btn-primary">
                          Ajouter une annonce
                        </button>
                      </Link>
                      <div className="dropdown dropdown-end ml-5">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                          <div className="w-10 rounded-full">
                            <img src={"http://localhost:3500/" + user.avatar}/>
                          </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                          <li><span className="text-info justify-center">{user.fullName}</span></li>
                          <li><span className="text-info justify-center">{'+216' + user.phoneNumber}</span></li>
                          <li>
                            <a href="/profile" className="justify-between">
                              Profile
                              <span className="badge">New</span>
                            </a>
                          </li>
                          <li>
                            <a href="/settings">Settings</a>
                          </li>
                          <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link href="/auth/login">
                        <button className="btn btn-outline btn-primary">
                          Ajouter une annonce
                        </button>
                      </Link>
                      <Link href="/auth/login">
                        <button className="btn btn-ghost btn-circle">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                          </svg>
                        </button>
                      </Link>
                    </>
                  )
                }
              </div>
            </div>
            </div>
            <div className="sm:hidden">
              <div className="navbar bg-base-100 fixed w-full z-20 top-0 p-4">
                <div className="navbar-start">
                  <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                      <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="badge badge-sm indicator-item">8</span>
                      </div>
                    </label>
                    <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                      <div className="card-body">
                        <span className="font-bold text-lg">Notifications</span>
                        <span className="text-info">Subtotal: $999</span>
                        <div className="card-actions">
                          <button className="btn btn-primary btn-block">View cart</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="navbar-center">
                  <a href="/" className="btn btn-ghost normal-case text-4xl font-tsukimi_rounded">DJOBY</a>
                </div>
                <div className="navbar-end">
                  {
                    isAuthenticated ? (
                      <>
                        <div className="dropdown dropdown-end ml-5">
                          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                              <img src={"http://localhost:3500/" + user.avatar}/>
                            </div>
                          </label>
                          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><span className="text-info justify-center">{user.fullName}</span></li>
                            <li><span className="text-info justify-center">{'+216' + user.phoneNumber}</span></li>
                            <li>
                              <a href="/profile" className="justify-between">
                                Profile
                                <span className="badge">New</span>
                              </a>
                            </li>
                            <li>
                              <a href="/settings">Settings</a>
                            </li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                          </ul>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link href="/auth/login">
                          <button className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                          </button>
                        </Link>
                      </>
                    )
                  }
                </div>
              </div>
            </div>
          </div> 
        <br/><br/><br/><br/>
    </>

  );
}

export default Navbar;
