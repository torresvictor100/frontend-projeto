import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../home/Home";
import Departament from "../departamento/Departamento";



export default props =>
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/departament" element={<Departament />} />
        <Route path="*" element={<Home />} />
    </Routes>