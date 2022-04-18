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
    allocation: { day: '', start: '', end: '', professorId: '', courseId: '' },
    list: [],
    listProfessors: [],
    listCourses: []
}

export default class Allocation extends Component {


    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
        axios(baseUrlProfessors).then(resp => {
            this.setState({ listProfessors: resp.data })
        })
        axios(baseUrlCourses).then(resp => {
            this.setState({ listCourses: resp.data })
        })
    }

    clear() {
        const allocation = {
            day: '',
            start: '',
            end: '',
            professorId: '',
            courseId: ''
        }

        this.setState({ allocation })
    }

    save() {
        const allocation = this.state.allocation
        const method = allocation.id ? 'put' : 'post'
        const url = allocation.id ? `${baseUrl}/${allocation.id}` : baseUrl
        axios[method](url, allocation)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ allocation: initialState.allocation, list })
            })

    }

    getUpdatedList(allocation, add = true) {
        const list = this.state.list.filter(u => u.id !== allocation.id)
        if (add) list.unshift(allocation)
        return list
    }

    updateField(event) {
        const allocation = { ...this.state.allocation }
        allocation[event.target.name] = event.target.value
        this.setState({ allocation })
    }

    mudarProfessor(event) {
        const allocation = { ...this.state.allocation }
        var select = document.getElementById('professor');
        var text = select.options[select.selectedIndex].value;
        allocation.professorId = text
        this.setState({ allocation })
    }

    opitonProfessor() {
        const listaDeDados = this.state.listProfessors
        const listProfessoresUnicos = []
        listaDeDados.map((professor) => professor.id == (listProfessoresUnicos.map((professor) => professor.id) ? listProfessoresUnicos.push(professor) : null))
        return (
            <select className="select" name="selectProfessor" id="professor" onChange={e => this.mudarProfessor()}>
                <option>Select o Professor</option>
                {(listaDeDados.map((professor) => (<option key={professor.id} value={professor.id} >  {professor.name} </option>)))}
            </select>
        )
    }

    mudarDay(event) {
        const allocation = { ...this.state.allocation }
        var select = document.getElementById("day");
        var text = select.options[select.selectedIndex].value;
        allocation.day = text
        this.setState({ allocation })
    }

    opitonDay() {
        return (
            <select className="select" name="selectDay" id="day" onChange={e => this.mudarDay()}>
                <option>Select o Dia</option>
                <option value={'MONDAY'}>Segunda</option>
                <option value={'TUESDAY'}>Terça</option>
                <option value={'WEDNESDAY'}>Quarta</option>
                <option value={'THURSDAY'}>Quinta</option>
                <option value={'FRIDAY'}>Sexta</option>
                <option value={'SATURDAY'}>Sabado</option>
                <option value={'SUNDAY'}>Domingo</option>
            </select>
        )
    }

    mudarCurso(event) {
        const allocation = { ...this.state.allocation }
        var select = document.getElementById('curso');
        var text = select.options[select.selectedIndex].value;
        allocation.courseId = text
        this.setState({ allocation })
    }

    opitonCurso() {
        const listaDeDados = this.state.listCourses
        const listCursoUnicos = []
        listaDeDados.map((curso) => curso.id == (listCursoUnicos.map((curso) => curso.id) ? listCursoUnicos.push(curso) : null))
        return (
            <select className="select" name="selectCurso" id="curso" onChange={e => this.mudarCurso()}>
                <option>Select o Curso</option>
                {(listaDeDados.map((curso) => (<option key={curso.id} value={curso.id} >  {curso.name} </option>)))}
            </select>
        )
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="form-grup">
                            <label>Curso</label>
                            {this.opitonCurso()}
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="form-grup">
                            <label>Dia</label>
                            {this.opitonDay()}
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="form-grup">
                            <label>Professor</label>
                            {this.opitonProfessor()}
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="form-grup">
                            <label>Inicio</label>
                            <input type="time" className="form-control" name="start"
                                value={this.state.allocation.start} onChange={e => this.updateField(e)}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="form-grup">
                            <label>Final</label>
                            <input type="time" className="form-control" name="end"
                                value={this.state.allocation.end} onChange={e => this.updateField(e)}
                            />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">

                </div>
                <hr />

                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>

            </div>
        )
    }

    load(allocation) {
        this.state.allocation.id = allocation.id
        this.state.allocation.day = allocation.day
        this.state.allocation.professorId = allocation.professor.id
        this.state.allocation.courseId = allocation.course.id
        this.state.allocation.start = allocation.start
        this.state.allocation.end = allocation.end
        this.setState(allocation)
    }

    remove(allocation) {
        axios.delete(`${baseUrl}/${allocation.id}`).then(resp => {
            const list = this.getUpdatedList(allocation, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Curso</th>
                        <th>Professor</th>
                        <th>Dia</th>
                        <th>Inicio</th>
                        <th>Final</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    diaPt(allocation){

        if(allocation.day == 'MONDAY' ){
            return 'Segunda'
        }else if(allocation.day == 'TUESDAY'){
            return'Terça'
        }else if(allocation.day == 'WEDNESDAY'){
            return 'Quarta'
        }else if(allocation.day == 'THURSDAY'){
            return'Quinta'
        }else if(allocation.day == 'FRIDAY'){
            return'Sexta'
        }else if(allocation.day == 'SATURDAY'){
            return'Sabado'
        }else if(allocation.day == 'SUNDAY'){
            return'Domingo'
        }
    }

    arrumaHora(allocation){
        const horaSemNada = allocation.start
        const tirandoOFuso = horaSemNada.subtitle(0,horaSemNada.length -5)
        return console.log(tirandoOFuso)
    }

    renderRows() {
        return this.state.list.map(allocation => {
            return (
                <tr key={allocation.id}>
                    <td>{allocation.id}</td>
                    <td>{allocation.course.name}</td>
                    <td>{allocation.professor.name}</td>
                    <td>{this.diaPt(allocation)}</td>
                    <td>{allocation.start}</td>
                    <td>{allocation.end}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(allocation)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(allocation)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}