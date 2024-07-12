import { useEffect } from "react";
import TeamGrid from "../Grids/TeamGrid";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ActiveChallenge from "../Grids/ActiveChallenge";

function Dashboard() {
  const [cookies] = useCookies([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies['id', 'team_name'] === undefined) {
      navigate('/sign-in')
    } else {
      navigate('/dashboard')
    }
  },[navigate, cookies])
  return (
    <div className="dashBoard">
        <div className="mt-20">
          <div className="mb-16"><TeamGrid /></div>
          <div className=""><ActiveChallenge /></div>
        </div>
    </div>
  )
}

export default Dashboard;