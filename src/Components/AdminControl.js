import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenAlt,faTint, faHistory, faHandHoldingDroplet,faTruckDroplet} from '@fortawesome/free-solid-svg-icons';
import '../Css/AdminControl.css';
import AddBloodBank from './AddBloodBank';
import GetAllBloodBanks from './GetAllBloodBanks';
import ViewRequests from './ViewRequests';
import AvailableBloodGroup from './AvailableBloodGroup';
import GetAllDonors from './GetAllDonors';
import Status from './Status';
 
const AdminControl = () => {
    const [selectedComponent, setSelectedComponent] = useState(null);
 
    const handleTabClick = (component) => {
        setSelectedComponent(component);
    };
 
    const navigateToHome = () => {
        setSelectedComponent(null);
    };
 
    return (<div
        className="requests-container"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/b1.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          padding: '20px'
        }}
      >
        <br/><br/>
        <div className="admin-control-container">
            {selectedComponent ? (
                <div>
                    {selectedComponent}
                    <button className='btn1' onClick={navigateToHome}>Go Back</button>
                    <br/><br/><br/><br/>
                </div>
            ) : (
                <div className="grid-container">
                    <div className="tab1" onClick={() => handleTabClick(<AddBloodBank />)}>
                        <FontAwesomeIcon icon={faPlus} />
                        <p>Add Blood Bank</p>
                    </div>
                    <div className="tab1" onClick={() => handleTabClick(<AvailableBloodGroup />)}>
                        <FontAwesomeIcon icon={faTint} />
                        <p>Available Blood Group</p>
                    </div>
                    <div className="tab1" onClick={() => handleTabClick(<ViewRequests />)}>
                        <FontAwesomeIcon icon={faPenAlt} />
                        <p>Update Status</p>
                    </div>
                    <div className="tab1" onClick={() => handleTabClick(<GetAllBloodBanks />)}>
                        <FontAwesomeIcon icon={faTruckDroplet} />
                        <p>All Blood Banks</p>
                    </div>
                    <div className="tab1" onClick={() => handleTabClick(<GetAllDonors />)}>
                        <FontAwesomeIcon icon={faHandHoldingDroplet} />
                        <p>Donors</p>
                    </div>
                    <div className="tab1" onClick={() => handleTabClick(<Status />)}>
                        <FontAwesomeIcon icon={faHistory} />
                        <p>History</p>
                    </div>
                    <br/><br/>
                </div>
            )}
        </div>
        </div>
    );
};
 
export default AdminControl;