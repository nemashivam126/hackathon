import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

function ActiveChallenge() {
  const [teams, setTeams] = useState([]);
  const [cookies] = useCookies(['id', 'team_name']);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await axios.get(`http://localhost:5000/hackathon/teams/${cookies.id}`);
        setTeams(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching upcoming teams:", error);
      }
    }
    fetchTeams();
  }, [cookies.id]);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
//   };

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
    setContextMenuVisible(true);
  };

  const hideContextMenu = () => {
    setContextMenuVisible(false);
  };

  const handleContextMenuAction = (action) => {
    switch (action) {
      case "pushToMenu":
        // Logic for pushing to menu
        break;
      case "goToHome":
        // Redirect to home page
        window.location.href = "/";
        break;
      default:
        break;
    }
    hideContextMenu();
  };

  return (
    <>
        <h4 className="text-2xl font-bold dark:text-white mb-10"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Registered Challenges</span></h4>
        {teams.activeChallenges?.length !== 0 ? <div className="overflow-x-auto shadow-md sm:rounded-lg min-h-20 max-h-96 overflow-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Sr. No.
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Active Challenge
                        </th>
                        {/* <th scope="col" className="px-6 py-3">
                            Action
                        </th> */}
                    </tr>
                </thead>
                <tbody>
                    {teams.activeChallenges && teams.activeChallenges.map((team, index) => (
                        <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" onContextMenu={(e) => handleContextMenu(e, index)}>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {index+1}
                            </th>
                            <td className="px-6 py-4">
                                {team}
                            </td>
                            {/* <td className="px-6 py-4">
                                <button className="font-medium text-blue-600 bg-inherit border-0 dark:text-blue-500 focus:outline-none hover:underline p-0" 
                                    // onClick={() => handleRegister(challenge._id)}
                                >Edit</button>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div> :
        <p className="dark:text-yellow-300 font-900 text-gray-900">Looks like no challenge has registered! <Link to={'/upcoming-challenges'}>Register here</Link></p>}
        
        {contextMenuVisible && (
        <div
          className="absolute bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg"
          style={{ left: contextMenuPosition.x, top: contextMenuPosition.y }}
          onBlur={hideContextMenu}
          tabIndex={0}
        >
          <div
            className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => handleContextMenuAction("pushToMenu")}
          >
            Push to Menu
          </div>
          <div
            className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => handleContextMenuAction("goToHome")}
          >
            Go to Home
          </div>
        </div>
      )}
    </>
  );
}

export default ActiveChallenge;
