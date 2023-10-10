import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import Startpage from "./Startpage";
import Home from "./Home";
import Talents from "./Talents";
import TalentsAdd from "./TalentsAdd";
import TalentsEdit from "./TalentsEdit";
import Videos from "./Videos";
import VideosAdd from "./VideosAdd";
import VideosEdit from "./VideosEdit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/startpage" element={<Startpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/talents" element={<Talents />} />
        <Route path="/add_talents" element={<TalentsAdd />} />
        <Route path="/edit_talents/:id" element={<TalentsEdit />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/add_videos" element={<VideosAdd />} />
        <Route path="/edit_videos/:id" element={<VideosEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
