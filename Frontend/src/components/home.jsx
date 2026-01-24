import { useState } from 'react';
import Navbar from './navbar';
import Navbar2 from './navbar2';
import MainNav from './mainnav';
import Slider from './Home/silder';
import Footer from "./Footer/Footer";
import Menu from './Home/Menu';
import Sidebar from './Home/sidebar';
import Sidebar1 from './Home/sidebar1';
import ClientReview from './Home/ClientReview';
import ADT from './Home/Adt';
import Slider2 from './Home/Slider2';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Home(){
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const handleOpenSidebar = () => setSidebarOpen(true);
    const handleCloseSidebar = () => setSidebarOpen(false);

    return(
        <>
            {isSidebarOpen && <Sidebar1 onClose={handleCloseSidebar} />}
            <Sidebar onOpenSidebar={handleOpenSidebar} />
            <Navbar></Navbar>
            <Navbar2></Navbar2>
            <MainNav></MainNav>
            <Slider></Slider>
            <Menu></Menu>
            <ADT></ADT>
            <Slider2></Slider2>
            <ClientReview></ClientReview>
            <Footer></Footer>
        </>
    )
};