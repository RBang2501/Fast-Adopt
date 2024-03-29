import {React,useEffect,useState} from "react";
import { FaBars, FaRegUserCircle, FaTasks, FaArrowAltCircleRight, FaChild, FaHome, FaUserPlus,FaRegListAlt, FaClipboardList,FaComments  } from 'react-icons/fa';
import {BsPeopleFill}from 'react-icons/bs'
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import GroundWorkerSidebar from "./groundWorker/groundWorkerSidebar";
import { useTranslation } from "react-i18next";
import {Dropdown,DropdownToggle,DropdownMenu,DropdownItem} from 'reactstrap';
import i18next from "i18next";

const SideBar=({user,id,setuser,open,handdleToggle,openSide})=>{

  const { t } = useTranslation();

  const navigate=useNavigate();
  const {pathname}=useLocation();
  const isCaseDetailsView=matchPath("/groundWorker/caseDetails/*",pathname)
  const sideBarIconProperty = "text-lg text-textcolor bg-color3 rounded-1 p-2 flex items-center gap-x-4 mt-2 hover:bg-hoverColor cursor-pointer";
  const logoutIconProperty = `${openSide ? "w-64" : "w-16"} absolute bottom-0 text-xl font-bold text-logoutContent duration-300 bg-sideBarColor1 rounded-0 p-3 ps-0 items-center cursor-pointer justify-items-center align-self-center`;
  const sideIconProperty = `${openSide ? "w-64" : "w-16"} h-16 text-xl text-color2 duration-300 bg-sideBarColor2 rounded-0 py-2 items-center bg-sideBarColor2 cursor-pointer justify-items-center`;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [language,setLanguage]=useState("English");
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const handleLogout= ()=>{
    localStorage.setItem('user',null);
    setuser(null);
    navigate("/");
  }
	return (
    <>
	<div className={`h-screen sm:h-9/10  ${openSide ? "w-64" : "w-16"} ${!open && "hidden"} 
  ${open && "w-1/2 opacity-100"} bg-sideBarColor1 duration-300 rounded-none md:relative  absolute md:top-14 top-0 opacity-100 md:block z-10`}>
    <div className={sideIconProperty}>
    <FaBars className={`md:!m-0 md:!ms-4 h-6 w-6 md:h-8  md:w-8 cursor-pointer text-sideBarColor1 duration-500 visible ${openSide && "rotate-[180deg]"}`} onClick={() => handdleToggle()} style={{margin: "0.5rem 1rem"}}></FaBars>
    </div>
    <div className = {`ps-2 pt-3`}>
            {user === "CaseManager" &&
            <>
            <ul className="ps-0">
              <li className={sideBarIconProperty + `${pathname==="/caseManager" && " bg-hoverColor"}`} onClick={()=>navigate("/caseManager")} >
                <span><FaHome className="text-3xl text-textcolor block float-left"></FaHome></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>{t('Dashboard')}</span>
              </li>
              <li className={sideBarIconProperty+ `${pathname==="/caseManager/addChild" && " bg-hoverColor"}`} onClick={()=>navigate("/caseManager/addChild")} >
                <span><FaChild className="text-3xl text-textcolor block float-left"></FaChild></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>{t('Add Child')}</span>
              </li>
              <li className={sideBarIconProperty+ `${pathname==="/caseManager/profiles" && " bg-hoverColor"}`} onClick={()=>navigate("/caseManager/profiles")}>
                <span><FaRegUserCircle className="text-3xl text-textcolor block float-left"></FaRegUserCircle></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>{t('Children Profiles')}</span>
              </li>
              <li className={sideBarIconProperty+ `${pathname==="/caseManager/reports" && " bg-hoverColor"}`} onClick={()=>navigate("/caseManager/reports")} >
                <span><BsPeopleFill className="text-3xl text-textcolor block float-left"></BsPeopleFill></span>
              <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>{t('Assign Cases')}</span>
              </li>
              <li className={sideBarIconProperty+ `${pathname==="/caseManager/taskStatus" && " bg-hoverColor"}`} onClick={()=>navigate("/caseManager/taskStatus")} >
                <span><FaTasks className="text-3xl text-textcolor block float-left"></FaTasks></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>{t('Task Status')}</span>
              </li>
              <li className={sideBarIconProperty+ `${pathname==="/caseManager/taskComments" && " bg-hoverColor"}`} onClick={()=>navigate("/caseManager/taskComments")} >
                <span><FaComments className="text-3xl text-textcolor block float-left"></FaComments></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>{t('Task Comments')}</span>
              </li>
            </ul>
            </>
            }
          {user === "Admin" && 
          <div className="h-full flex flex-col ">
            <ul className="pt-2 ps-0">
            <li className={sideBarIconProperty+ `${pathname==="/admin" && " bg-hoverColor"}`} onClick={()=>navigate("/admin")} >
                <span><FaHome className="text-3xl text-textcolor block float-left"></FaHome></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>{t('Dashboard')}</span>
              </li>
              <li className={sideBarIconProperty+ `${pathname==="/admin/addUser" && " bg-hoverColor"}`} onClick={()=>navigate("/admin/addUser")} >
                <span><FaUserPlus className="text-3xl text-textcolor block float-left"></FaUserPlus></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>{t('Add User')}</span>
              </li>
              <li className={sideBarIconProperty+ `${pathname==="/admin/managersList" && " bg-hoverColor"}`} onClick={()=>navigate("/admin/managersList")} >
                <span><FaRegListAlt className="text-3xl text-textcolor block float-left"></FaRegListAlt></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>{t('Managers List')}</span>
              </li>
              <li className={sideBarIconProperty+ `${pathname==="/admin/workersList" && " bg-hoverColor"}`} onClick={()=>navigate("/admin/workersList")} >
                <span><FaClipboardList className="text-3xl text-textcolor block float-left"></FaClipboardList></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>{t('Workers List')}</span>
              </li>
              <li className={sideBarIconProperty+ `${pathname==="/admin/childrenProfiles" && " bg-hoverColor"}`} onClick={()=>navigate("/admin/childrenProfiles")} >
                <span><FaChild className="text-3xl text-textcolor block float-left"></FaChild></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>{t('Child Profile')}</span>
              </li>
            </ul>
        </div>
          }
          {
          user === "GroundWorker" ? (user==="GroundWorker" && (isCaseDetailsView===null || isCaseDetailsView.params["*"]==='')) ?
          <div className="h-full flex flex-col ">
            <ul className="pt-2 ps-0">
              <li className={sideBarIconProperty+ `${pathname==="/groundWorker" && " bg-hoverColor"}`} onClick={()=>navigate("/groundWorker")} >
                <span><FaHome className="text-3xl text-textcolor block float-left"></FaHome></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>{t('Dashboard')}</span>
              </li>
              <li className={sideBarIconProperty+ `${pathname==="/groundWorker/profiles" && " bg-hoverColor"}`} onClick={()=>navigate("/groundWorker/profiles")} >
                <span><FaRegUserCircle className="text-3xl text-textcolor block float-left"></FaRegUserCircle></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>{t('Children Profiles')}</span>
              </li>
              <li className={sideBarIconProperty+ `${pathname==="/groundWorker/caseDetails" && " bg-hoverColor"}`} onClick={()=>navigate("/groundWorker/caseDetails")} >
                <span><FaClipboardList className="text-3xl text-textcolor block float-left"></FaClipboardList></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>{t('Assigned Cases')}</span>
              </li>
            </ul>
        </div>: <div className="h-full flex flex-col">
          <GroundWorkerSidebar user={user} openSide={openSide}/>
          </div> :""
          }
        </div>
        <div className={`w-full ms-2 ${!openSide &&" hidden"}`}>
          <Dropdown
            isOpen={dropdownOpen}
            toggle={toggle}
            direction="down"
            className="me-1"
            onChange={(event) => console.log(event)}
          >
        <DropdownToggle size=""
              className="!bg-buttonColor/[0.7] !border-none !btn-block w-95"
              caret>{language}</DropdownToggle>
        <DropdownMenu >
          <DropdownItem onClick={()=>{setLanguage("English");i18next.changeLanguage('en');}}>English</DropdownItem>
          <DropdownItem onClick={()=>{setLanguage("हिंदी");i18next.changeLanguage('hi');}}>हिंदी</DropdownItem>
          <DropdownItem onClick={()=>{setLanguage("मराठी");i18next.changeLanguage('mr');}}>मराठी</DropdownItem>
        </DropdownMenu>
      </Dropdown>
              </div>
          <div className={logoutIconProperty} onClick={handleLogout} >
            <span><FaArrowAltCircleRight className="mx-3 mb-2 text-3xl text-logoutContent block float-left"></FaArrowAltCircleRight></span>
            <span className={`text-base font-medium ${!openSide && "hidden"}`}>{t('Logout')}</span>
          </div>
        </div>
        </>
	)
};

export default SideBar;