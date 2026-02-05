import { Outlet } from "react-router-dom"
import HomeNavBar from "./HomeNavBar"

function Layout() {
    return (
        <div>
            <HomeNavBar />
            <Outlet />
        </div>
    )
}

export default Layout
