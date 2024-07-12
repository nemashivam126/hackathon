import { useContext } from 'react';
import { useCookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';
import { DarkModeContext } from '../../context/DarkModeContext/DarkModeContext';

export default function NavBar() {
    const { isDark, toggleDarkMode } = useContext(DarkModeContext);
    const [cookies] = useCookies();

    return (
        <nav className="dark:bg-[#333333] bg-[#e31658] fixed top-0 left-0 w-full">
            <div className="w-full px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-end">
                    <div>
                        <button 
                            className='text-sm p-2 dark:bg-gray-900 bg-[#AE1438] focus:outline-none hover:border-0' 
                            title={isDark ? "Enable light mode" : "Enable dark mode"} 
                            onClick={toggleDarkMode}
                        >
                            <span>
                                {isDark 
                                    ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                      </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                      </svg>
                                }
                            </span>
                        </button>
                    </div>

                    {cookies.team_name && 
                        <div title={`Team ${cookies.team_name}`} className="ms-5 flex items-center justify-center">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-700 sm:mx-0 sm:h-10 sm:w-10">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                                    <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                                </svg>
                            </div>
                            <NavLink to={'/dashboard'} className={({ isActive }) => isActive ? 'text-green-700 hover:text-white' : 'text-gray-300 hover:text-white'}>
                                <div className="ms-2">
                                    <span className="font-bold">{cookies.team_name?.toUpperCase()}</span>
                                </div>
                            </NavLink>
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}
