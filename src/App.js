import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { db } from "./firebase";
import { collection,getDocs } from "firebase/firestore";
import Login from "./components/Login";
// import Dashboard1 from "./components/DashBoard1";
import Main from "./components/MainComponent";
import { Dashboard, AddChild, AssignCases, ChildProfile, ChildrenList,TaskStatus,TaskComments } from "./components/caseManager/caseManager.js";
import {AdminDashboard, AddUser ,ManagersList,WorkersList, ChildrenProfile} from "./components/admin/admin";
import { Report, GroundWorkerDashboard,Profiles, ViewProfile, CaseDetails } from "./components/groundWorker/groundWorker";
import AssignedList from "./components/groundWorker/AssignedList";
import './i18n';

function App() {
  const [user, setUser] = useState(null);
  const [id, setId] = useState(null);
  const [name,setName]=useState(null);
  useEffect(() => {
    setUser(localStorage.getItem('user'))
  }, [user,id]);
  return (
    <>
      <div
        className={`${user !== "GroundWorker" && "max-h-screen"} ${
          user === "GroundWorker" && "overflow-hidden max-h-full"
        } bg-color2`}
      >
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<Login setUser={(value) => setUser(value)} id={id} setId={(value) => setId(value)} setName={(value)=>setName(value)}/>}/>
              <Route exact path="/*" element={ <Main user={user} id={id} name={name} setUser={(value) => setUser(value)} setId={(value) => setId(value)}/>}>
                <Route exact path="caseManager" element={<Dashboard user={user} id={id} />}/>
                <Route path="caseManager/addChild" element={<AddChild user={user} id={id} />}/>
                <Route path="caseManager/reports" element={<AssignCases user={user} id={id} />}/>
                <Route path="caseManager/profiles" element={<ChildrenList user={user} id={id} />}/>
                <Route path="caseManager/taskStatus" element={<TaskStatus user={user} id={id} />}/>
                <Route path="caseManager/taskComments" element={<TaskComments user={user} id={id} />}/>
                <Route path="caseManager/profiles/:id" element={<ChildProfile user={user} id={id} />}/>
                <Route exact path="admin" element={<AdminDashboard user={user} id={id} />}/>
                <Route exact path="admin/addUser" element={<AddUser user={user} id={id} />}/>
                <Route exact path="admin/managersList" element={<ManagersList user={user} id={id} />}/>
                <Route exact path="admin/workersList" element={<WorkersList user={user} id={id} />}/>
                <Route exact path="admin/childrenProfiles" element={<ChildrenProfile user={user} id={id} />}/>
                <Route  path="groundWorker"element={<GroundWorkerDashboard  user={user} id={id} setuser={(value) => setUser(value)} setId={(value) => setId(value)}/>  }/>
                <Route path="groundWorker/profiles" element={<Profiles user={user} id={id} />} />
                <Route path="groundWorker/profiles/:id" element={<ViewProfile user={user} id={id} />} />
                <Route path="groundWorker/caseDetails" element={<AssignedList user={user} id={id} />} />
                <Route path="groundWorker/caseDetails/:id" element={<CaseDetails user={user} id={id}/>}>
                  <Route path="step1/*" element={<Report stepType={1}/>}></Route>
                  <Route path="step2/*" element={<Report stepType={2}/>}></Route>
                  <Route path="step3/*" element={<Report stepType={3}/>}></Route>
                  <Route path="step4/*" element={<Report stepType={4}/>}></Route>
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </>
  );
}

export default App;

