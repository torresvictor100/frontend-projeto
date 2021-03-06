import './Nav.css'
import { Link } from 'react-router-dom'

export default props =>
    <aside className='menu-area'>
        <nav className='menu'>
            <Link to="/">
                <i className="fa fa-home">Início</i>
            </Link>
            <Link to="/departament">
                <i class="fa fa-users"> Departamento</i>
            </Link>
            <Link to="/professor">
                <i class="fa fa-users"> Professor</i>
            </Link>
            <Link to="/courses">
                <i class="fa fa-users"> Curso</i>
            </Link>
            <Link to="/allocation">
                <i class="fa fa-users">Alocações</i>
            </Link>
        </nav>
    </aside>