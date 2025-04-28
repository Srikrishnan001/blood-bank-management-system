import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import Home from './Home';
import Request from './Request';
import Login from './Login';
import AdminControl from './AdminControl';
import Logout from './Logout';
import '../Css/Control.css';
import { FaUser } from 'react-icons/fa';
import AddDonor from './AddDonor';
import About from './About';
import AddBloodBank from './AddBloodBank';
import GetAllBloodBanks from './GetAllBloodBanks';
import ViewRequests from './ViewRequests';
import AvailableBloodGroup from './AvailableBloodGroup';
import GetAllDonors from './GetAllDonors';
import ThankYou from './ThankYou';
import Status from './Status';
import CheckStatus from './CheckStatus';
import Footer from './Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingDroplet} from '@fortawesome/free-solid-svg-icons';

const Control = () => {
    const [isAdmin, setIsAdmin] = useState(false);
 
    const handleLogin = () => {
        setIsAdmin(true);
    };
 
    const handleLogout = () => {
        setIsAdmin(false);
 
    };
 
    return (
        <div className='bodyy'>
        <Router>
            {!isAdmin ? (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><div className="icon"><div className='fatint'> <FontAwesomeIcon icon={faHandHoldingDroplet} /></div> .LifeSource </div></Link>                        
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/allbloodbanks">BloodBanks</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/donate">Willing To Donate?</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/request">Raise a Request?</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/checkstatus">Check Status?</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about">About Us</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        <FaUser className="user-icon" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            ) : (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><div className="icon2"><div className='fatint'> <FontAwesomeIcon icon={faHandHoldingDroplet} /></div> .LifeSource Admin Dashboard</div></Link>                        
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin-control">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about">About</Link>
                                </li>
 
                                <li className="nav-item">
                                    <Link className="nav-link" to="/logout">
                                        <FaUser className="user-icon" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            )}
 
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/donate" element={<AddDonor />} />
                <Route path="/request" element={<Request />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                {isAdmin && <Route path="/admin-control/*" element={<AdminControl />} />}
                {!isAdmin && <Route path="/admin-control/*" element={<Navigate to="/login" replace />} />}
                <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
                <Route path="/allbloodbanks" element={<GetAllBloodBanks />} />
                <Route path="/status" element={<Status />} />
                <Route path="/checkstatus" element={<CheckStatus />} />
                <Route path="add-blood-bank" element={<AddBloodBank />} />
                <Route path="get-all-blood-banks" element={<GetAllBloodBanks />} />
                <Route path="view-requests" element={<ViewRequests />} />
                <Route path="available-blood-group" element={<AvailableBloodGroup />} />
                <Route path="get-all-donors" element={<GetAllDonors />} />
                <Route path="/thankyou" element={<ThankYou />} />  
            </Routes>
        </Router>
        <Footer/>
        </div>
    );
};
 
export default Control;
 