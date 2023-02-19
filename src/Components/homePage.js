import {Link} from "react-router-dom"

const HomePage = ()=>{
    return(
        <nav>
            <ul>
                <li>
                   <Link to="/Ejercicios">Listado Ejercicios</Link>
                </li>
                <li>
                   <Link to="/Ejercicios">Listado Ejercicios para seleccionar</Link>
                </li>
                <li>
                    <Link to="/Ejercicios/Ejercicio">Nuevo Ejercicio</Link>
                </li>
                <li>
                    <Link to="/Rutina">Nueva Rutina</Link>
                </li>
            </ul>
        </nav>
        )
}

export default HomePage