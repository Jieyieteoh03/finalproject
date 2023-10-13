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
import Posts from "./Posts";
import Posts_2 from "./Posts_2";
import PostsAdd from "./PostsAdd";
import PostsEdit from "./PostsEdit";
import User from "./User";
import TalentDetails from "./TalentDetails";

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
        <Route path="/details/:id" element={<TalentDetails />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/add_videos" element={<VideosAdd />} />
        <Route path="/edit_videos/:id" element={<VideosEdit />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/add_posts" element={<PostsAdd />} />
        <Route path="/edit_posts/:id" element={<PostsEdit />} />
        <Route path="/posts_2/:id" element={<Posts_2 />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
