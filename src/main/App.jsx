import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import "./App.css"
import Logo from "./components/template/Logo"
import Header from "./components/template/Header"
import Nav from "./components/template/Nav"
import Footer from "./components/template/Footer"
import Main from "./components/template/Main"
import Routes from './components/routes/Routes'



import { BrowserRouter } from 'react-router-dom'

export default props =>
    <BrowserRouter>
        <div className="app" >
            <Nav />
            <Routes/>
            <Logo />
            <Footer />
        </div>
    </BrowserRouter>