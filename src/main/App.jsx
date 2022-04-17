import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import "./App.css"
import Logo from "./components/template/Logo"
import Header from "./components/template/Header"
import Nav from "./components/template/Nav"
import Footer from "./components/template/Footer"
import Main from "./components/template/Main"



import { BrowserRouter } from 'react-router-dom'

export default props =>
    <BrowserRouter>
        <div className="app" >
            <Header/>
            <Nav />
            <Main/>
            <Logo />
            <Footer />
        </div>
    </BrowserRouter>