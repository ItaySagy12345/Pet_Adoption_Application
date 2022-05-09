import { HOME, PROFILE, SEARCH, DASHBOARD, MY_PETS, PETS } from "../Utils/Constants/constants";
import { Routes, Route } from "react-router-dom";
import ActiveUserProvider from '../Components/Providers/AuthProvider/AuthProvider';
import InspectedPetProvider from '../Components/Providers/InspectedPetProvider/InspectedPetProvider';
import NavBarContents from "../Components/PetAdopt/NavBarContents/NavBarContents";
import ProtectedAuthRoute from '../Components/General/ProtectedRoutes/ProtectedAuthRoute';
import ProtectedAdminRoute from '../Components/General/ProtectedRoutes/ProtectedAdminRoute';
import Col from '../Components/General/Flexboxes/Column/Col';
import HomePage from "../Pages/Home";
import ProfilePage from '../Pages/Profile/ProfilePage';
import SearchPage from "../Pages/Search/SearchPage";
import DashboardPage from '../Pages/Dashboard/DashboardPage';
import MyPetsPage from "../Pages/MyPets/MyPetsPage";
import PetPage from "../Pages/PetPage/PetPage";
import './App.css';

function App() {
    return (
        <ActiveUserProvider>
            <NavBarContents />
            <Col styles='app-main-content'>
                <Routes>
                    <Route
                        path={HOME}
                        element={<HomePage />}
                    />
                    <Route
                        path={PROFILE}
                        element={
                            <ProtectedAuthRoute>
                                <ProfilePage />
                            </ProtectedAuthRoute>}
                    />
                    <Route
                        path={SEARCH}
                        element={
                            <ProtectedAuthRoute>
                                <InspectedPetProvider>
                                    <SearchPage />
                                </InspectedPetProvider>
                            </ProtectedAuthRoute>}
                    />
                    <Route
                        path={DASHBOARD}
                        element={
                            <ProtectedAuthRoute>
                                <ProtectedAdminRoute>
                                    <DashboardPage />
                                </ProtectedAdminRoute>
                            </ProtectedAuthRoute>}
                    />
                    <Route
                        path={MY_PETS}
                        element={
                            <ProtectedAuthRoute>
                                <InspectedPetProvider>
                                    <MyPetsPage />
                                </InspectedPetProvider>
                            </ProtectedAuthRoute>}
                    />
                    <Route
                        path={PETS}
                        element={
                            <ProtectedAuthRoute>
                                <InspectedPetProvider>
                                    <PetPage />
                                </InspectedPetProvider>
                            </ProtectedAuthRoute>}
                    />
                </Routes>
            </Col>
        </ActiveUserProvider>
    );
}

export default App;