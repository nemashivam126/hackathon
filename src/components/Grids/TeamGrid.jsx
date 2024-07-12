import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function TeamGrid() {
  const [teams, setTeams] = useState([]);
  const [cookies] = useCookies(['id', 'team_name'])

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await axios.get(`https://hackathon-backend-mu.vercel.app/hackathon/teams/${cookies.id}`);
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

//   const handleRegister = async (challengeId) => {
//     try {
//       // Send request to backend to register team for the challenge
//       await axios.post(`/api/register-for-challenge/${challengeId}`);
//       // Optionally, update state or display a success message
//       console.log(challengeId);
//     } catch (error) {
//       console.error("Error registering for challenge:", error);
//     }
//   };

  return (
    <>
        <h4 className="text-2xl font-bold dark:text-white mb-10"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Team Details</span></h4>
        <div className="overflow-x-auto shadow-md sm:rounded-lg min-h-20 max-h-96 overflow-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Members
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Technologies
                        </th>
                        {/* <th scope="col" className="px-6 py-3">
                            Action
                        </th> */}
                    </tr>
                </thead>
                <tbody>
                    {/* {teams.map((team) => ( */}
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {teams.name}
                            </th>
                            <td className="px-6 py-4">
                                {teams?.members?.join(', ')}
                            </td>
                            <td className="px-6 py-4">
                                {teams?.technologyStack?.join(', ')}
                            </td>
                            {/* <td className="px-6 py-4">
                                <button className="font-medium text-blue-600 bg-inherit border-0 dark:text-blue-500 focus:outline-none hover:underline p-0" 
                                    // onClick={() => handleRegister(challenge._id)}
                                >Edit</button>
                            </td> */}
                        </tr>
                    {/* ))} */}
                </tbody>
            </table>
        </div>
    </>
  );
}

export default TeamGrid;
