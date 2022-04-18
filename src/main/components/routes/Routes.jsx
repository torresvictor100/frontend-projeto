import React from "react";
import { Routes, Route } from "react-router-dom";
import Course from "../course/Course";
import Home from "../home/Home";
import Departament from "../departamento/Departamento";
import Professor from "../professor/Professor"
import Allocation from "../allocation/Allocation";



export default props =>
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/departament" element={<Departament />} />
        <Route exact path="/courses" element={<Course />} />
        <Route exact path="/professor" element={<Professor />} />
        <Route exact path="/allocation" element={<Allocation />} />
        <Route path="*" element={<Home />} />
    </Routes>