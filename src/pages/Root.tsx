import {Fragment} from "react";
import {Outlet} from "react-router-dom";
import Header from "../components/layout/Header.tsx";
import Footer from "../components/layout/Footer.tsx";

export default function RootLayout() {

    return (
        <Fragment>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </Fragment>
    )
}
