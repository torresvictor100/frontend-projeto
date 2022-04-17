import React, { Component } from "react";
import axios from 'axios'
import Main from "../template/Main";
import './Departamento.css'

const headerProps = {
    icon: 'users',
    title: 'Departamento',
    subtitle: 'Cadastro de departamento: Incluir, Listar, Alterar e excluir'
}

const baseUrl = 'http://localhost:8080/departments'

const initialState = {
    departament: { name: '', sigla: '', area: '' },
    list: []
}

export default class Departament extends Component {

    state = { ...initialState }


    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ departament: initialState.departament })
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initialState.user, list })
            })
    }

    getUpdatedList(departament, add = true) {
        const list = this.state.list.filter(u => u.id !== departament.id)
        if (add) list.unshift(departament)
        return list
    }

    updateField(event) {
        const departament = { ...this.state.departament }
        departament[event.target.name] = event.target.value
        this.setState({ departament })
    }

    mudararea(event) {
        const departament = { ...this.state.departament }
        departament[event.target.area] = event.target.value
        this.setState({ departament })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="form-grup">
                            <label>Nome</label>
                            <input type="text" className="form-control" name="name"
                                value={this.state.departament.name} onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="form-grup">

                            <label>sigla</label>
                            <input type="text" className="form-control" name="sigla"
                                value={this.state.departament.sigla} onChange={e => this.updateField(e)}
                                placeholder="Digite o sigla..." />

                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="form-grup">
                            <label>Area</label>
                            <div/>
                            <select className="selectAreaId" name="selectArea" onChange={e => this.mudararea()}>
                                <option value="1" >BIOLOGICAS</option>
                                <option value="2" >EXATAS</option>
                                <option value="3" >HUMANAS</option>
                            </select>
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

    load(departament) {
        this.setState({ departament })
    }

    remove(departament) {
        axios.delete(`${baseUrl}/${departament.id}`).then(resp => {
            const list = this.getUpdatedList(departament, false)
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
                        <th>sigla</th>
                        <th>Area</th>
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
        return this.state.list.map(departament => {
            return (
                <tr key={departament.id}>
                    <td>{departament.id}</td>
                    <td>{departament.name}</td>
                    <td>{departament.sigla}</td>
                    <td>{departament.area = 1 ? "BIOLOGICAS": departament.area = 2 ? "EXATAS": "HUMANAS" }</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(departament)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(departament)}>
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