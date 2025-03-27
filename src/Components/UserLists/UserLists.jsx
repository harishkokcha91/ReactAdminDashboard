/* eslint-disable no-constant-condition */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import ProfileList from '../ProfileList/ProfileList';
import Sidebar from '../Sidebar/Sidebar';
import UserTable from '../UserTable/UserTable';
import './userlists.scss';

function Lists({ type }) {
    //
    return (
        <div className="list_page">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="list_page_main">
                <Navbar />

                {/* mui data table */
                console.log("type",type)}
                <div className="data_table">
                    <div className="btnn">
                        <Link
                            to={`/${
                                type === 'product'
                                    ? 'products'
                                    : type === 'user'
                                    ? 'users'
                                     : type === 'profile'
                                    ? 'profiles'
                                    : 'blogs'
                            }/addnew`}
                            style={{ textDecoration: 'none' }}>
                            <button type="button">Add New {type}</button>
                        </Link>
                    </div>

                    {type === 'user' ? <UserTable /> : <ProfileList />}
                </div>
            </div>
        </div>
    );
}

export default Lists;
