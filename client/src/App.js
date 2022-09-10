import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminHomeTemplate from "./templates/AdminHomeTemplate";
import PrivateOutlet from "./pages/PrivateOutlet";
import HomeTemplates from "./templates/HomeTemplates";
import UsersTable from "./pages/admin/Users/UsersTable";
import FilmTable from "./pages/admin/Films/FilmTable";
import TheaterTable from "./pages/admin/Theater/TheaterTable";
import HeroSlider from "./components/HeroSlider";
import { SkeletonTheme } from "react-loading-skeleton";
import FilmScheduleDetail from "./pages/user/FilmScheduleDetail";
import SeatsDetail from "./pages/user/SeatsDetail";
import ConfirmReservation from "./pages/user/ConfirmReservation";
import Movie from "./components/Movie";
import io from "socket.io-client";
import { host } from "./utils/constant";
import MyTicket from "./components/MyTicket";
let socket = io.connect(host);
function App() {
    return (
        <SkeletonTheme>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <HomeTemplates>
                                <HeroSlider />
                            </HomeTemplates>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/system" element={<PrivateOutlet />}>
                        <Route
                            index
                            element={
                                <AdminHomeTemplate>
                                    <UsersTable />
                                </AdminHomeTemplate>
                            }
                        />
                        <Route
                            index
                            path="users"
                            element={
                                <AdminHomeTemplate>
                                    <UsersTable />
                                </AdminHomeTemplate>
                            }
                        />
                        <Route
                            path="films"
                            element={
                                <AdminHomeTemplate>
                                    <FilmTable />
                                </AdminHomeTemplate>
                            }
                        />
                        <Route
                            path="theater"
                            element={
                                <AdminHomeTemplate>
                                    <TheaterTable />
                                </AdminHomeTemplate>
                            }
                        />
                    </Route>
                    <Route
                        path="/films/:id"
                        element={
                            <HomeTemplates>
                                <FilmScheduleDetail />
                            </HomeTemplates>
                        }
                    />
                    <Route
                        path="/films/:id/seats/:scheduleId"
                        element={
                            <HomeTemplates>
                                <SeatsDetail socket={socket} />
                            </HomeTemplates>
                        }
                    />
                    <Route
                        path="/films/:id/seats/reservation/:id"
                        element={
                            <HomeTemplates>
                                <ConfirmReservation />
                            </HomeTemplates>
                        }
                    />
                    <Route
                        path="/ticket/:userId"
                        element={
                            <HomeTemplates>
                                <MyTicket />
                            </HomeTemplates>
                        }
                    />
                    <Route
                        path="/films"
                        element={
                            <HomeTemplates>
                                <Movie />
                            </HomeTemplates>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </SkeletonTheme>
    );
}

export default App;
