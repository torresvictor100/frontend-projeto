import React from "react";
import { Routes, Route } from "react-router-dom";
import Course from "../Course/Course";
import Home from "../home/Home";
import Departament from "../departamento/Departamento";



export default props =>
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/departament" element={<Departament />} />
        <Route exact path="/courses" element={<Course />} />
        <Route path="*" element={<Home />} />
    </Routes>