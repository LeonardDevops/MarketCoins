import { Outlet } from "react-router-dom";
import { Headear } from "../header";


export function Layout() {
    return (
        <>
            <Headear />
            <Outlet />
        </>
    )
}