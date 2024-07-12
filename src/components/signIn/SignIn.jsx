import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies(['id', 'team_name', 'challenge'])
    const [signInData, setSignInData] = useState({
        name: "",
        password: ""
    })

    useEffect(() => {
      if(cookies['id', 'team_name']) {
        navigate('/dashboard');
      }
    },[navigate, cookies])

    const resetForm = () => {
        setSignInData({
            name: "",
            password: ""
        })
        setError({
            name: false,
            password: false
        });
    }
    
    const [error, setError] = useState({
        name: false,
        password: false
    })
    
    const handleChange = (field) => ({ target: { value } }) => {
        setSignInData({
          ...signInData,
          [field]: value,
        })
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};
    
        // Validate name
        if (signInData.name.trim() === "") {
          newErrors.name = true;
          valid = false;
        } else {
          newErrors.name = false;
        }
    
        // Validate password
        if (signInData.password.trim() === "") {
          newErrors.password = true;
          valid = false;
        } else {
          newErrors.password = false;
        }
    
        setError(newErrors);
        return valid;
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(validateForm()) {
            const handlePost = async() => {
                try {
                    setLoader(true)
                    const response = await axios.post('https://hackathon-backend-mu.vercel.app/hackathon/login', signInData);
                    // console.log('success', response.data);
                    // window.alert("Signed in successfully")
                    toast.success(`Signed in successfully`)
                    navigate('/dashboard')
                    setCookies("id", response.data._id)
                    setCookies("team_name", response.data.name)
                    setCookies("challenge", response.data.activeChallenges)
                    return response
                } catch (error) {
                    console.error(error.response.data.message);
                    toast.error(error.response.data.message)
                    // window.alert(error.response.data.message)
                } finally {
                    setLoader(false)
                }
            }
            handlePost();
            resetForm();
        }
    }

  return (
    <div className="flex flex-col justify-center items-center h-[auto] p-[70px] place-items-center shadow-2xl absolute top-[22%] left-[40%] ">
        {/* <h3 className="text-3xl font-bold dark:text-white mb-2"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Hackathon</span></h3> */}
        <h3 className="text-3xl font-bold dark:text-white mb-8"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Sign In</span></h3>
        {/* <h4 className="text-2xl font-bold dark:text-white mb-6">Sign In</h4> */}
        <form onSubmit={handleSubmit}>
            <div className="mb-6 text-left -mx-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Team Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={signInData.name} 
                  onChange={handleChange("name")} 
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 ${error.name ?'dark:border-red-600' : 'dark:border-gray-600'} dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} 
                  placeholder="Enter team name here" 
                />
                {error.name && <p className="text-red-500 text-xs italic">Team name is required!</p>}
            </div>
            <div className="mb-6 text-left -mx-3">
                <div className="text-left ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input 
                      type="password" 
                      id="password" 
                      value={signInData.password} 
                      onChange={handleChange("password")} 
                      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 ${error.password ?'dark:border-red-600' : 'dark:border-gray-600'} dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} 
                      placeholder="password" 
                    />
                    {error.password && <p className="text-red-500 text-xs italic">password is required</p>}
                </div> 
            </div>
            <div className="mb-6 -mx-3 flex">
                <button type="submit" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full mt-4 px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{loader ? 'Signing in..' : "Sign In"}</button>
            </div>
            <p className="text-blue-500 text-xs"><Link to={'/sign-up'}>Not registered sign up here!</Link></p>
        </form>
        <Toaster
          position="top-right"
          reverseOrder={true}
        />
    </div>
  )
}

export default SignIn