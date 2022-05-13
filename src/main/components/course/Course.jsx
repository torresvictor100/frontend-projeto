import React, { Component } from "react";
import axios from 'axios'
import Main from "../template/Main";
import './Course.css'

const headerProps = {
    icon: 'users',
    title: 'Curso',
    subtitle: 'Cadastro de curso: Incluir, Listar, Alterar e excluir'
}

const baseUrl = 'https://muribequers-backend.herokuapp.com//courses'

const initialState = {
    course: { name: '', sigla: '' },
    list: []
}

export default class Course extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ course: initialState.course })
        alert("Foi limpado todo o campo")
    }

    save() {
        const course = this.state.course
        const method = course.id ? 'put' : 'post'
        const url = course.id ? `${baseUrl}/${course.id}` : baseUrl
        axios[method](url, course)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ course: initialState.course, list })
            })
    }

    getUpdatedList(course, add = true) {
        const list = this.state.list.filter(u => u.id !== course.id)
        if (add) list.unshift(course)
        return list
    }

    updateField(event) {
        const course = { ...this.state.course }
        course[event.target.name] = event.target.value
        this.setState({ course })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-grup">
                            <label>Nome</label>
                            <input type="text" className="form-control" name="name"
                                value={this.state.course.name} onChange={e => this.updateField(e)}
                                placeholder="Nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-grup">
                            <label>Sigla</label>
                            <input type="text" className="form-control" name="sigla"
                                value={this.state.course.sigla} onChange={e => this.updateField(e)}
                                placeholder="Sigla..." />
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

    load(course) {
        this.setState({ course })
        alert("A course com o id:" + course.id + " Esta no campo para ser atualizado para se atualizada")
    }

    remove(course) {
        axios.delete(`${baseUrl}/${course.id}`).then(resp => {
            const list = this.getUpdatedList(course, false)
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
                        <th>Sigla</th>
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
        return this.state.list.map(course => {
            return (
                <tr key={course.id}>
                    <td>{course.id}</td>
                    <td>{course.name}</td>
                    <td>{course.sigla}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(course)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(course)}>
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
