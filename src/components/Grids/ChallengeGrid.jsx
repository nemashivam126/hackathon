import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ChallengeGrid() {
  const [showModal, setShowModal] = useState(false);
  const [selectedChallengeId, setSelectedChallengeId] = useState("");
  const [activeValue, setActiveValue] = useState("")
  const [challenges, setChallenges] = useState([]);
  const [cookies, setCookies] = useCookies();
  const navigate = useNavigate();
  const inputRef = useRef(null)

  useEffect(() => {
    const inputValue = inputRef?.current?.innerText
    setActiveValue(inputValue)
  },[showModal])

  useEffect(() => {
    async function fetchUpcomingChallenges() {
      try {
        const response = await axios.get("https://hackathon-backend-mu.vercel.app/hackathon/upcoming-challenge");
        setChallenges(response.data.reverse());
      } catch (error) {
        console.error("Error fetching upcoming challenges:", error);
      }
    }
    fetchUpcomingChallenges();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  const handleRegister = (challengeId) => {
    if (cookies.id && cookies.team_name) {
      setShowModal(true);
      setSelectedChallengeId(challengeId);
    } else {
      toast.error('Please login to register!')
      navigate('/sign-in');
    }
  };

  const handleRegisterConfirm = async() => {
    if (!cookies.challenge.includes(activeValue)) {
      try {
        const response = await axios.put(`https://hackathon-backend-mu.vercel.app/hackathon/teams/${cookies.id}`, {
          activeChallenges: [activeValue]
        })
        // console.log("success", response.data);
        toast.success(`Successfully registered for ${activeValue}`)
        // window.alert(`${cookies.team_name} Registered successfully for ${activeValue}`);
        setShowModal(false);
        setCookies("challenge", [...cookies.challenge, activeValue])
        return response
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error(`already registered for ${activeValue}`)
      // window.alert("You have already registered for this challenge");
      setShowModal(false);
    }
  }

  return (
    <div className="mt-20">
        <h4 className="text-2xl font-bold dark:text-white mb-10"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Hackathon Upcoming Challenges</span></h4>
        <div className="overflow-x-auto shadow-md sm:rounded-lg min-h-20 max-h-96 overflow-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Start Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            End Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Register
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {challenges.map((challenge) => (
                        <tr key={challenge._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {challenge.name}
                            </th>
                            <td className="px-6 py-4">
                                {formatDate(challenge.start_date)}
                            </td>
                            <td className="px-6 py-4">
                                {formatDate(challenge.end_date)}
                            </td>
                            <td className="px-6 py-4">
                                <button className="font-medium text-blue-600 bg-inherit border-0 dark:text-blue-500 focus:outline-none hover:underline p-0" onClick={() => handleRegister(challenge._id)}>Register</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {/* Modal */}
        {showModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
                <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm: sm:items-start">
                    <div className="sm:flex sm:justify-center sm:items-center">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-700 sm:mx-0 sm:h-10 sm:w-10">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                          <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                          <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                        </svg>
                      </div>
                      <h3 className="text-lg ms-2 leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                        Register for Challenge
                      </h3>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <div className="mt-2">
                        {/* Additional details or confirmation message */}
                        <div className="p-4 md:p-5">
                          <form className="space-y-4">
                              {challenges.filter(match => match._id === selectedChallengeId).map((challenge) => (
                                <div key={challenge._id}>
                                    <label ref={inputRef} className="block mb-2 text-center text-lg font-medium text-gray-900 dark:text-white">{challenge.name}</label>
                                    <input type="text" name="challenge" id="activeChallenges" className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 hidden w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" value={challenge.name} onChange={(e)=> (e.target.value)}/>
                                </div>
                              ))}
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={() => {
                      handleRegisterConfirm()
                    }}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Register
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <Toaster
          position="top-right"
          reverseOrder={true}
        />
    </div>
  );
}

export default ChallengeGrid;
