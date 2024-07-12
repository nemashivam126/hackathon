import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function FullTeamGrid() {
  const [teams, setTeams] = useState([]);
  const [cookies] = useCookies(['id', 'team_name'])
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await axios.get(`http://localhost:5000/hackathon/teams`);
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    }
    fetchTeams();
  }, [cookies.id]);

  useEffect(() => {
    if (cookies['id', 'team_name'] === undefined) {
        navigate('/sign-in')
      }
  },[cookies, navigate])

  return (
    <div className="flex flex-col mt-16">
      <h4 className="text-2xl font-bold dark:text-white mb-10">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">All Teams Details</span>
      </h4>
      <div className="overflow-x-auto shadow-md sm:rounded-lg min-h-20 max-h-[65vh] overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Members</th>
              <th scope="col" className="px-6 py-3">Technologies</th>
              <th scope="col" className="px-6 py-3">Active Challenges</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{team.name}</th>
                <td className="px-6 py-4">{team.members.join(', ')}</td>
                <td className="px-6 py-4">{team.technologyStack.join(', ')}</td>
                <td className="px-6 py-4">{team.activeChallenges.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FullTeamGrid;
