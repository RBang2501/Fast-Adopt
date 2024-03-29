import { React, useRef, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

import { collection, getDocs, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth, db, database } from "../firebase";
// import addProcess from "./addCase";
import { addProcessOrphaned } from "./addCase";
import exportToExcel from "../excel";
const Login = ({setUser, id, setId,setName}) => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userID, setuserID] = useState(null)
  // const [userHash, userHash] = useState(null);
  const [userType, setuserType] = useState(null);
  const navigate = useNavigate();

  const [caseData, setCaseData] = useState([]);
  const fetchData = async () => {
    await getDocs(collection(db, "cases"))
    .then((querySnapshot) => {
      const newData = querySnapshot.docs
        .map((doc) => ({...doc.data(), id:doc.id}));
      setCaseData(newData)
      console.log(newData);
      console.log(querySnapshot.metadata.fromCache)
    })
  }


  useEffect(()=>{
    let temp=localStorage.getItem('user')
    setUser(temp)
    setuserType(localStorage.getItem('userID'))
    if (temp=== "GroundWorker" ) {
      navigate("groundWorker");
     } else if(temp === "CaseManager"){
       navigate("caseManager");
     }
     else if(temp=== "Admin") {
       navigate("admin");
    }
    // fetchData()
  },[])    
  async function handleForgetPassword(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      console.log(emailRef.current.value);

      // Send password reset email
      await auth.sendPasswordResetEmail(emailRef.current.value);

      alert("Email Sent for Password Reset");

      return true;
    } catch (error) {
      console.log("Error Resetting password:", error);
      alert("Error in Login! Try Forget Password");
      return false;
    }
  }
  async function handleSubmitLogin(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      console.log(emailRef.current.value, passwordRef.current.value);
      const userHash = await login(emailRef.current.value, passwordRef.current.value);
      console.log(userHash)
      if(userHash===false) alert("Error signing In!")
      database.ref(`Users/${userHash[0]}/userID/`).once('value')
      .then((snapshot) => {
        setId(snapshot.val());
        console.log(snapshot.val(), "id");
      })
      // .then(()=>{
        // db.collection("Users").doc(id).get().then((doc)=>{
        //   console.log(doc.data()["Name"]);
        //   setName(doc.data()["Name"])
        // })
      // })
      .catch((error) => {
        console.log('Error fetching data:', error);
        alert("Error signing In!")
      });

      setUser(userHash[1]);
      
      if (userHash[1] === "GroundWorker" ) {
         console.log("ground worker route");
         localStorage.setItem('user',userHash[1]);
         setUser("groundWorker");
         navigate("groundWorker");
        } else if(userHash[1] === "CaseManager"){
          localStorage.setItem('user',userHash[1]);
          console.log("case manager route")
          setUser("CaseManager")
          navigate("caseManager");
        }
        else if(userHash[1] === "Admin") {
          localStorage.setItem('user',userHash[1]);
          console.log("admin route")
         setUser("Admin")
          navigate("admin");
       }

    } catch {
      setError("Incorrect Username or Password");
    }

    setLoading(false);
  }
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640); // Adjust the threshold value as needed
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex w-screen h-screen">
      <div className="hidden sm:block md:block sm:w-1/2 lg:w-3/5 bg-cover bg-center loginpage" />
      <div
        className={`w-full sm:w-1/2 lg:w-2/5 bg-loginbg flex flex-col justify-center p-8 ${
          isSmallScreen ? `loginpage` : ""
        }`}
      >
        <div
          className="mx-auto rounded-2xl"
          style={{
            backgroundColor: isSmallScreen ? "rgba(232, 216, 216, 0.6)" : null,
          }}
        >
          <div className="mx-4 my-4">
            <img src="logo_scroll.png" alt="Logo" className="w-64 h-24 mb-6" />
            <form onSubmit={handleSubmitLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-themecolor mb-1">
                  <b>Email Address</b>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  ref={emailRef}
                  required
                  className="w-full bg-t2 px-4 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-themecolor mb-1"
                >
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  ref={passwordRef}
                  required
                  className="w-full bg-t2 px-4 py-2 rounded"
                />
              </div>
              {/* <div className="mb-4">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-themecolor">
              Remember me
              </label>
            </div> */}
              <button
                type="submit"
                className="w-full bg-themecolor mt-3 mb-2 px-4 py-2 rounded text-white"
              >
                <b>Sign In</b>
              </button>
            </form>
            <button
              type="submit"
              className="w-full bg-themecolor mt-3 mb-2 px-4 py-2 rounded text-white"
              onClick={handleForgetPassword}
            >
              <b>Forget Password</b>
            </button>
            <button
              type="submit"
              className="w-full bg-themecolor mt-3 mb-2 px-4 py-2 rounded text-white"
              onClick={()=>exportToExcel()}
            >
              <b>Download Excel Template</b>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
