import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignUp from './components/signUp/SignUp'
import SignIn from './components/signIn/SignIn'
import Dashboard from './components/dashboard/Dashboard';
import SideNav from './components/sideNav/SideNav';
import ChallengeGrid from './components/Grids/ChallengeGrid';
import NavBar from './components/navbar/Navbar';
import FullTeamGrid from './components/Grids/FullTeamGrid';
// import SyncfusionGrid from './components/Grids/syncFusionGrid';

function App() {

  return (
    <>
      <BrowserRouter>
        <header>
          <SideNav /><NavBar />
        </header>
        <section>
          <Routes>
            <Route path='/sign-up' element = { <SignUp /> } />
            <Route path='/sign-in' element = { <SignIn /> } />
            <Route path='/dashboard' element = { <Dashboard /> } />
            <Route path='/upcoming-challenges' element = { <ChallengeGrid /> } />
            <Route path='/teams' element = { <FullTeamGrid /> } />
            {/* <Route path='/syncfusion-grid' element = { <SyncfusionGrid /> } /> */}
          </Routes>
        </section>
      </BrowserRouter>
    </>
  )
}

export default App