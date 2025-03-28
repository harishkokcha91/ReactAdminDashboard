import { useContext } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ColorContext } from './ColorContext/darkContext';
import Achievements from "./Components/Achievements/Achievements";
import Home from './Components/Home/Home';
import Orders from './Components/Orders/Orders';
import Lists from './Components/UserLists/UserLists';
import Businesses from "./Components/business/Businesses";
import Events from './Components/events/Events';
import AddNew from './Pages/AddNew/AddNew';
import AddNewAchievement from './Pages/AddNew/AddNewAchievement';
import AddNewBusiness from './Pages/AddNew/AddNewBusiness';
import AddNewEvent from './Pages/AddNew/AddNewEvent';
import AddNewProfile from './Pages/AddNew/AddNewProfile';
import BlogDetail from './Pages/BlogDetail/BlogDetail';
import Blogs from './Pages/Blogs/Blogs';
import AchievementDetails from "./Pages/Detail/AchievementDetails";
import BusinessDetails from "./Pages/Detail/BusinessDetails";
import Detail from './Pages/Detail/Detail';
import EventDetails from './Pages/Detail/EventDetails';
import ProfileDetails from './Pages/Detail/ProfileDetails';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import ProfileForm from './Pages/profile/ProfileForm';
import './app.scss';

// Dynamicaly change the data for different pages(replaceable)
const userInpDetails = [
    {
        id: 2,
        name: 'username',
        lable: 'Username',
        type: 'text',
        placeholder: 'John23',
        required: true,
        pattern: '^[A-Za-z0-9]{3,12}$',
        errorMsg: 'Username should be 3-12 characters & should not include any special character!',
    },
    {
        id: 3,
        name: 'name',
        lable: 'Name',
        type: 'text',
        placeholder: 'John Smith',
        required: true,
        pattern: '^[A-Za-z]{1,20}$',
        errorMsg: 'Name is required!',
    },
    {
        id: 4,
        name: 'email',
        lable: 'Email',
        type: 'email',
        placeholder: 'example@email.com',
        required: true,
        errorMsg: 'Enter a valid email!',
    },
    {
        id: 5,
        name: 'password',
        lable: 'Password',
        type: 'password',
        placeholder: 'Password',
        required: true,
        pattern: '^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{6,20}$',
        errorMsg:
            'Password should be 6-20 characters and include at last 1 num, 1 letter, 1 special character!',
    },
    {
        id: 6,
        name: 'address',
        lable: 'Address',
        type: 'text',
        placeholder: 'Address',
        required: true,
        errorMsg: 'Address is required!',
    },
];
const productInpDetails = [
    {
        id: 2,
        name: 'title',
        lable: 'Title',
        type: 'text',
        placeholder: 'Product title',
        required: true,
        errorMsg: 'Title is required!',
    },
    {
        id: 3,
        name: 'description',
        lable: 'Description',
        type: 'text',
        placeholder: 'Product description',
        required: true,
        errorMsg: 'Description is required!',
    },
    {
        id: 4,
        name: 'category',
        lable: 'Category',
        type: 'text',
        placeholder: 'Product category',
        required: true,
        errorMsg: 'Category is required!',
    },
    {
        id: 5,
        name: 'price',
        lable: 'Price',
        type: 'number',
        placeholder: 'Product price',
        required: true,
        errorMsg: 'Price is required!',
    },
    {
        id: 6,
        name: 'stock',
        lable: 'In Stock',
        type: 'text',
        placeholder: 'In Stock',
        required: true,
        errorMsg: 'This field is required!',
    },
];
const blogInputs = [
    {
        id: 1,
        name: 'title',
        lable: 'Title',
        type: 'text',
        placeholder: 'Blog title',
        required: true,
        errorMsg: 'Title is required!',
    },
    {
        id: 2,
        name: 'description',
        lable: 'Description',
        type: 'text',
        placeholder: 'Blog description',
        required: true,
        errorMsg: 'Description is required!',
    },
    {
        id: 3,
        name: 'tags',
        lable: 'Tags',
        type: 'text',
        placeholder: 'Travel, Communication',
        required: true,
        errorMsg: 'Tag is required!',
    },
];

function App() {
    // color state management using react context
    const { darkMode } = useContext(ColorContext);

    return (
        <div className={darkMode ? 'App dark' : 'App'}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/profileForm" element={<ProfileForm />} />
                    <Route path="/">
                        <Route index element={<Home />} />
                        {/* nested routes */}
                        <Route path="users">
                            <Route index element={<Lists type="user" />} />
                            <Route path=":userId" element={<Detail />} />
                            <Route
                                path="addnew"
                                element={
                                    <AddNew
                                        inputs={userInpDetails}
                                        titlee="Add New User"
                                        type="USER"
                                    />
                                }
                            />
                        </Route>
                        <Route path="orders" element={<Orders />} />
                        
                        <Route path="achievements">
                            <Route index element={<Achievements />} />
                            <Route path=":achievementId" element={<AchievementDetails />} />
                            <Route
                                path="addnew"
                                element={
                                    <AddNewAchievement
                                        titlee="Add New Achievement"
                                        type="ACHIEVEMENT"
                                    />
                                }
                            />
                        </Route>

                        <Route path="business">
                            <Route index element={<Businesses />} />
                            <Route path=":businessId" element={<BusinessDetails />} />
                            <Route
                                path="addnew"
                                element={
                                    <AddNewBusiness 
                                        titlee="Add New Business" 
                                        type="BUSINESS" 
                                    />
                                }
                            />
                        </Route>

                        <Route path="events">
                            <Route index element={<Events />} />
                            <Route path=":eventId" element={<EventDetails />} />
                            <Route
                                path="addnew"
                                element={
                                    <AddNewEvent 
                                        titlee="Add New Event" 
                                        type="EVENT" 
                                    />
                                }
                            />
                        </Route>

                        {/* nested routes */}
                        <Route path="profiles">
                            <Route index element={<Lists type="profile" />} />
                            <Route path=":profileId" element={<ProfileDetails />} />
                            <Route
                                path="addnew"
                                element={
                                    <AddNewProfile
                                        titlee="Add New Profile"
                                        type="PROFILE"
                                    />
                                }
                            />
                        </Route>

                          {/* nested routes */}
                        <Route path="products">
                            <Route index element={<Lists type="product" />} />
                            <Route path=":productId" element={<Detail />} />
                            <Route
                                path="addnew"
                                element={
                                    <AddNew
                                        inputs={productInpDetails}
                                        titlee="Add New Product"
                                        type="PRODUCT"
                                    />
                                }
                            />
                        </Route>

                        <Route path="blogs">
                            <Route index element={<Blogs type="blog" />} />
                            <Route path=":blogId" element={<BlogDetail />} />
                            <Route
                                path="addnew"
                                element={
                                    <AddNew inputs={blogInputs} titlee="Add New Blog" type="BLOG" />
                                }
                            />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
