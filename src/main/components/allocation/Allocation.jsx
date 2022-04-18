import React, { Component } from "react";
import Main from "../template/Main";
import axios from 'axios'
import './Allocation.css'

const headerProps = {
    icon: 'users',
    title: 'Alocações',
    subtitle: 'Cadastro de Alocações: Incluir, Listar, Alterar e excluir'
}

const baseUrl = 'http://localhost:8080/allocations'
const baseUrlProfessors = 'http://localhost:8080/professors'
const baseUrlCourses = 'http://localhost:8080/courses'


const initialState = {
    allocation: { day: '', start: '', end: '', professorId: '',courseId: '' },
    list: [],
    baseUrlProfessors: [],
    baseUrlCourses: []
}