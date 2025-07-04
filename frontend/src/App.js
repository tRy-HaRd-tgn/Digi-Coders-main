import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/main/Home';
import Login from './components/main/Login';
import Signup from './components/main/Signup';
import Main from './components/main';
import TrainerLogin from './components/main/TrainerLogin';
import TrainerSignup from './components/main/TrainerSignup';
import Course from './components/main/Course';
import About from './components/main/About';
import Contact from './components/main/Contact';
import Chapter from './components/main/Chapter';
import Builder from './components/trainer/Builder';
import DesignChapter from './components/trainer/DesignChapter';
import Trainer from './components/trainer';
import ManageChapter from './components/trainer/ManageChapter';
import StudentSignup from './components/main/StudentSignup';
import StudentLogin from './components/main/StudentLogin';
import BlockProvider from './context/BlockContext';
import User from './components/user';
import ViewChapters from './components/user/ViewChapters';
import ChapterDetails from './components/user/ChapterDetails';
import TrainerAuth from './auth/TrainerAuth';
import UserProvider from './context/UserContext';
import TrainerProvider from './context/TrainerContext';
import TrainerProfile from './components/trainer/TrainerProfile';
import UserProfile from './components/user/UserProfile';
import NewBuilder from './components/trainer/NewBuilder';
import ResetPassword from './components/main/ResetPassword';
import UserAuth from './auth/UserAuth';

function App() {
  return (
    <BrowserRouter>
      <BlockProvider>
        <UserProvider>
          <TrainerProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/main/home" />} />
              <Route path="main" element={<Main />}>
                <Route path="home" element={<Home />} />
                <Route path="course" element={<Course />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="chapter" element={<Chapter />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="reset" element={<ResetPassword />} />
                <Route path="studentlogin" element={<StudentLogin />} />
                <Route path="studentsignup" element={<StudentSignup />} />
                <Route path="trainerlogin" element={<TrainerLogin />} />
                <Route path="trainersignup" element={<TrainerSignup />} />
                <Route path="resetpassword" element={<ResetPassword />} />
              </Route>
              <Route
                path="trainer"
                element={
                  <TrainerAuth>
                    <Trainer />
                  </TrainerAuth>
                }
              >
                <Route path="builder" element={<Builder />} />
                <Route path="newbuilder" element={<NewBuilder />} />
                <Route path="trainerprofile" element={<TrainerProfile />} />
                <Route path="designchapter/:id" element={<DesignChapter />} />
                <Route path="managechapter" element={<ManageChapter />} />
                <Route path="home" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
              </Route>

              <Route
                path="user"
                element={
                  <UserAuth>
                    <User />
                  </UserAuth>
                }
              >
                <Route path="userprofile" element={<UserProfile />} />
                <Route path="viewchapters" element={<ViewChapters />} />
                <Route path="viewchapters/:chaptername" element={<ViewChapters />} />
                <Route path="chapterdetails/:id" element={<ChapterDetails />} />
              </Route>
            </Routes>
          </TrainerProvider>
        </UserProvider>
      </BlockProvider>
    </BrowserRouter>
  );
}

export default App;
