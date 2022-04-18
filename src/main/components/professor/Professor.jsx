import React, { Component } from "react";
import Main from "../template/Main";
import axios from 'axios'
import './Professor.css'

const headerProps = {
    icon: 'users',
    title: 'Professor',
    subtitle: 'Cadastro de Professor: Incluir, Listar, Alterar e excluir'
}

const baseUrl = 'http://localhost:8080/professors'
const baseUrlDepartment = 'http://localhost:8080/departments'


const initialState = {
    professor: { name: '', cpf: '', departmentId: '' },
    list: [],
    listDepartment: []
}

export default class Professor extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
        axios(baseUrlDepartment).then(resp => {
            this.setState({ listDepartment: resp.data })
        })
        
    }

    clear() {
        const professor = {
            name : '',
            cpf : '',
            departmentId: ''
        }
        
        this.setState({ professor })
    }

    save() {
        const professor = this.state.professor
        const method = professor.id ? 'put' : 'post'
        const url = professor.id ? `${baseUrl}/${professor.id}` : baseUrl
        axios[method](url, professor)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ professor: initialState.professor, list })
            })

    }


    getUpdatedList(professor, add = true) {
        const list = this.state.list.filter(u => u.id !== professor.id)
        if (add) list.unshift(professor)
        return list
    }

    updateField(event) {
        const professor = { ...this.state.professor }
        professor[event.target.name] = event.target.value
        this.setState({ professor })
    }

    mudararea(event) {
        const professor = { ...this.state.professor }
        var select = document.getElementById('area');
        var text = select.options[select.selectedIndex].value;
        professor.departmentId = text
        this.setState({ professor })
    }

    opiton(){
        const listaDeDados = this.state.listDepartment
        const listDepartmentUnicos = []
        listaDeDados.map((department) =>  department.id == (listDepartmentUnicos.map((department) => department.id)? listDepartmentUnicos.push(department) : null ))
        return (
            <select className="selectAreaId" name="selectArea" id= "area" onChange={e => this.mudararea()}>
                                <option>Select o departamento</option>
                                { (listaDeDados.map( (department)=>( <option key={department.id} value={department.id} >  {department.name} </option>))) }
                            </select>
        )
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="form-grup">
                            <label>Nome</label>
                            <input type="text" className="form-control" name="name"
                                value={this.state.professor.name} onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="form-grup">
                            <label>CPF</label>
                            <input type="text" className="form-control" name="cpf"
                                value={this.state.professor.cpf} onChange={e => this.updateField(e)}
                                placeholder="Digite o CPF..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="form-grup">
                            <label>Departamento</label>
                            {this.opiton()}
                            <div/>
                            
                        </div>
                    </div>
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

    load(professor) {
        this.state.professor.id = professor.id
        this.state.professor.name = professor.name
        this.state.professor.cpf = professor.cpf
        this.state.professor.departmentId = professor.department.id
        this.setState(professor)
    }

    remove(professor) {
        console.log(professor.id)
        axios.delete(`${baseUrl}/${professor.id}`).then(resp => {
            const list = this.getUpdatedList(professor, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Departamento</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(professor => {
            return (
                <tr key={professor.id}>
                    <td>{professor.id}</td>
                    <td>{professor.name}</td>
                    <td>{professor.cpf}</td>
                    <td>{professor.department.name}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(professor)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(professor)}>
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
