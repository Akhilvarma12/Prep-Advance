import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import JobOpenings from "./components/JobOpenings";
import Challenges from "./components/Challenges";
import MentorList from "./components/Mentors/Mentors";
import MentorProfile from "./components/Mentors/MentorProfile";
import RoadmapInput from "./components/roadmaps/RoadmapInput";
import Roadmap from "./components/roadmaps/Roadmap";
import AddNewInterview from "./components/MockInterview/MockInterview";
import Interview from "./components/MockInterview/pages/Ready";;
import StartInterview from "./components/MockInterview/pages/Questions";
import Feedback from "./components/MockInterview/pages/Feedback";
import ResumeApp from "./components/Resume/ResumeApp";
import ResumeForm from "./components/Resume/ResumeForm";
import EditorPage from "./components/Collab/EditorPage";
import CollabHome from "./components/Collab/CollabHome";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/jobs" element={<JobOpenings />} />
          <Route path="/dashboard/challenges" element={<Challenges />} />
          <Route path="/dashboard/mentors" element={<MentorList />} />
          <Route path="/dashboard/mentors/:id" element={<MentorProfile />} />
          <Route path="/dashboard/collab" element={<CollabHome/>} />
          <Route path="/dashboard/collab/:roomId" element={<EditorPage/>} />
          <Route path="/dashboard/roadmap" element={<RoadmapInput />} />
          <Route path="/dashboard/roadmap/:role" element={<Roadmap />} />
          <Route path="/dashboard/interview" element={<AddNewInterview/>} />  
          <Route path="/dashboard/interview/start" element={<Interview />} />
          <Route path="/dashboard/interview/start/:uuid" element={<StartInterview/>} />
          <Route path="/dashboard/interview/feedback" element={<Feedback/>} />
          <Route path="/dashboard/resume" element={<ResumeApp />} />  
          <Route path="/dashboard/resume/form" element={<ResumeForm />} />  
        </Routes>
      </Router>
    </>
  );
}

export default App;
