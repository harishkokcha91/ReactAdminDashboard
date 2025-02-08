
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ColorContext } from '../../ColorContext/darkContext';
import './Sidebar.scss';

function Sidebar() {
    // color state management using react context
    const { darkMode, dispatch } = useContext(ColorContext);

    return (
        <div className="sidebar">
            <div className="logo">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h3 className="text_none">AdminDashboard</h3>
                </Link>
            </div>

            <div className="links">
                <ul>
                    <p className="spann">Main</p>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <li>
                            <DashboardIcon className="icon" /> Dashboard
                        </li>
                    </Link>

                    <p className="spann">lists</p>
                    <Link to="/users" style={{ textDecoration: 'none' }}>
                        <li>
                            <PersonIcon className="icon" /> Users
                        </li>
                    </Link>

                    <Link to="/profiles" style={{ textDecoration: 'none' }}>
                        <li>
                            <GroupIcon className="icon" /> Profiles
                        </li>
                    </Link>
                    <Link to="/events" style={{ textDecoration: 'none' }}>
                        <li>
                            <EventIcon className="icon" /> Events
                        </li>
                    </Link>
                    <Link to="/achievements" style={{ textDecoration: 'none' }}>
                        <li>
                            <EmojiEventsIcon className="icon" /> Achievements
                        </li>
                     </Link>
                    <Link to="/orders" style={{ textDecoration: 'none' }}>
                        <li>
                            <CreditCardIcon className="icon" /> Orders
                        </li>
                    </Link>
                   
                    <li>
                        <CreditCardIcon className="icon" /> Balance
                    </li>
                    <li>
                        <BarChartIcon className="icon" /> Status
                    </li>

                    <p className="spann">Seetings</p>
                    <li>
                        <AccountCircleIcon className="icon" /> Profile
                    </li>
                    <li>
                        <SettingsRoundedIcon className="icon" /> Setting
                    </li>
                    <li>
                        <LogoutIcon className="icon" /> Log Out
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
