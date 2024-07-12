import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
// import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { registerLicense } from '@syncfusion/ej2-base';
import { KEY } from '../../../config';
import { Autocomplete, Checkbox, Chip, TextField } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { DarkModeContext } from '../../context/DarkModeContext/DarkModeContext';

function SignUp() {
  registerLicense(KEY)
  const [stack, setStack] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies();
  const { isDark } = useContext(DarkModeContext);
  const [signUpData, setSignUpData] = useState({
    name: "",
    members: [],
    technologyStack: [],
    password: "",
    confirmPassword: ""
  })

  const resetForm = () => {
    setSignUpData({
      name: "",
      members: [],
      technologyStack: [],
      password: "",
      confirmPassword: ""
    })
    setError({
      name: false,
      members: false,
      technologyStack: false,
      password: false,
      confirmPassword: false
    });
  }

  const [error, setError] = useState({
    name: false,
    members: false,
    technologyStack: false,
    password: false,
    confirmPassword: false
  })

  useEffect(() => {
    if(cookies['id', 'team_name']) {
      navigate('/dashboard');
    }else{
      navigate('/sign-up');
    }
  },[navigate, cookies])

  useEffect(() => {
    const getStacksList = async() => {
        try {
            const response = await axios.get('http://localhost:5000/hackathon/stacks')
            setStack(response.data)
            return response
        } catch (error) {
            console.log(error)
        }
    }
    getStacksList()
  }, [])

  const handleMemberChange = (event) => {
    const membersArray = event.target.value.split(/[,;]/).map(member => member.trim());
    setSignUpData({
        ...signUpData,
        members: membersArray
    })
  };

  // const handleCheckboxChange = (event) => {
  //   const { value, checked } = event.target;
  //   if (checked) {
  //     setSignUpData(prevState => ({
  //       ...prevState,
  //       technologyStack: [...prevState.technologyStack, value] // Add technology to the array
  //     }));
  //   } else {
  //     setSignUpData(prevState => ({
  //       ...prevState,
  //       technologyStack: prevState.technologyStack.filter(tech => tech !== value) // Remove technology from the array
  //     }));
  //   }
  // };

  const handleTechnologyStackChange = (_, value) => {
    setSignUpData({
      ...signUpData,
      technologyStack: value.map(name => name.name)
    });
  };

  const handleChange = (field) => ({ target: { value } }) => {
    setSignUpData({
      ...signUpData,
      [field]: value,
    })
  };

  const handleConfirmPasswordCheck = () => {
    if (signUpData.confirmPassword !== signUpData.password) {
      setError({
        ...error,
        confirmPassword: true
      })
    } else if (signUpData.confirmPassword === signUpData.password) {
      setError({
        ...error,
        confirmPassword: false
      })
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate name
    if (signUpData.name.trim() === "") {
      newErrors.name = true;
      valid = false;
    } else {
      newErrors.name = false;
    }

    // Validate members
    if (signUpData.members.length === 0 || signUpData.members.some(member => member.trim() === "")) {
      newErrors.members = true;
      valid = false;
    } else {
      newErrors.members = false;
    }

    // Validate technologyStack
    if (signUpData.technologyStack.length === 0) {
      newErrors.technologyStack = true;
      valid = false;
    } else {
      newErrors.technologyStack = false;
    }

    // Validate password
    if (signUpData.password.trim() === "" || signUpData.password.length <= 5) {
      newErrors.password = true;
      valid = false;
    } else {
      newErrors.password = false;
    }

    // Validate confirm password
    if (signUpData.confirmPassword.trim() === "" || signUpData.confirmPassword !== signUpData.password) {
      newErrors.confirmPassword = true;
      valid = false;
    } else {
      newErrors.confirmPassword = false;
    }

    setError(newErrors);
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(validateForm()) {
      const handlePostData = async() => {
        try {
            setLoader(true)
            const response = await axios.post('http://localhost:5000/hackathon/teams', signUpData);
            // window.alert("Team registered successfully")
            toast.success(`Team ${signUpData.name} registered successfully`)
            setCookies("id", response.data._id)
            setCookies("team_name", response.data.name)
            setCookies("challenge", response.data.activeChallenges)
            navigate('/dashboard')
            return response
        } catch (error) {
            console.error(error);
        } finally {
          setLoader(false)
        }
      }
      handlePostData();
      resetForm()
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    resetForm();
  }

  // const fields = { text: 'name', value: '_id' };

  // console.log("payload", signUpData);

  return (
    <>
        <h4 className="text-2xl font-bold dark:text-white mb-10"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Hackathon</span> Registration Form</h4>
        <form onSubmit={handleSubmit}>
            <div className="mb-6 text-left -mx-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Team Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={signUpData.name} 
                  onChange={handleChange("name")} 
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 ${error.name ?'dark:border-red-600' : 'dark:border-gray-600'} dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} 
                  placeholder="Enter team name here" 
                />
                {error.name && <p className="text-red-500 text-xs italic">Team name is required!</p>}
            </div>
            <div className="mb-6 text-left -mx-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Members</label>
                <input 
                  type="text" 
                  id="members" 
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 ${error.members ?'dark:border-red-600' : 'dark:border-gray-600'} dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} 
                  onChange={handleMemberChange} 
                  value={signUpData.members} 
                  placeholder="Enter member name like John, Mike" 
                />
                {error.members && <p className="text-red-500 text-xs italic">Enter atleast one member name!</p>}
            </div> 
            {/* <div className="mb-6 flex flex-col items-start -mx-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Technology</label>
                <ul className={`w-80 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 ${error.technologyStack ?'dark:border-red-600' : 'dark:border-gray-600'} dark:text-white max-h-48 min-h-11 overflow-auto`}>
                    {stack.map(tech => (
                        <li key={tech._id} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input
                                    id={tech._id} 
                                    type="checkbox" 
                                    onChange={handleCheckboxChange} 
                                    value={tech.name} 
                                    checked={signUpData.technologyStack.includes(tech.name)}
                                    className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500`} 
                                />
                                <label className="w-full py-3 me-2 text-sm font-medium text-gray-900 dark:text-gray-300">{tech.name}</label>
                            </div>
                        </li>
                    ))}
                </ul>
                {error.technologyStack && <p className="text-red-500 text-xs italic">Select atleast one technology stack!</p>}
            </div> */}
            <div className="mb-6 text-left -mx-3">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Technology
              </label>
              <Autocomplete
                size='small'
                multiple
                id="technologyStack"
                options={stack}
                onChange={handleTechnologyStackChange}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option, { selected }) => (
                  <li style={{backgroundColor: isDark ? '#374151' : 'white', color: !isDark ? '#374151' : 'white'}} {...props}>
                    <Checkbox
                      icon={<CheckBoxOutlineBlank fontSize="small" />}
                      checkedIcon={<CheckBox fontSize="small" />}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name}
                  </li>
                )}
                renderTags={(tagValue, getTagProps) =>
                  tagValue.map((option, index) => (
                    <Chip
                      key={index}
                      label={option.name}
                      {...getTagProps({ index })}
                      style={{ backgroundColor: !isDark ? '#e31658' : 'white', color: isDark ? '#374151' : 'white' }}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    sx={{bgcolor: isDark ? '#374151' : 'white', borderRadius: '10px'}}
                    {...params}
                    variant="outlined"
                    placeholder="Select technology stack"
                  />
                )}
              />
              {error.technologyStack && <p className="text-red-500 text-xs italic">Select atleast one technology stack!</p>}
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2 -mx-3">
                <div className="text-left ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input 
                      type="password" 
                      id="password" 
                      value={signUpData.password} 
                      onChange={handleChange("password")} 
                      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 ${error.password ?'dark:border-red-600' : 'dark:border-gray-600'} dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} 
                      placeholder="password" 
                    />
                    {error.password && <p className="text-red-500 text-xs italic">password is required with min 6 characters</p>}
                </div> 
                <div className="text-left">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                    <input 
                      type="password" 
                      id="confirm_password" 
                      value={signUpData.confirmPassword} 
                      onChange={handleChange('confirmPassword')} 
                      onKeyUp={handleConfirmPasswordCheck} 
                      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 ${error.confirmPassword ?'dark:border-red-600' : 'dark:border-gray-600'} dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} 
                      placeholder="confirm password"
                    />
                    {error.confirmPassword && <p className="text-red-500 text-xs italic">password does not match!</p>}
                </div> 
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2 -mx-3 mt-10">
                <button type="submit" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={handleReset}>Reset</button>
                <button type="submit" className="text-white ms-2 bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{loader ? 'Signing Up..' : "Sign Up"}</button>
            </div>
            <p className="text-blue-500 text-xs"><Link to={'/sign-in'}>Already registered sign in here!</Link></p>
        </form>
        <Toaster
          position="top-right"
          reverseOrder={true}
        />
    </>
  );
}

export default SignUp;
