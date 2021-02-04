import React, { Component } from "react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa"
import MovieService from "../Services/MovieService";

export default class CreateMovie extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeUrl = this.onChangeUrl.bind(this);
        this.saveMovie = this.saveMovie.bind(this);
        this.newMovie = this.newMovie.bind(this);
        this.toggleButton = this.toggleButton.bind(this)

        this.state = {
            id: null,
            title: "",
            description: "",
            url: "",
            checked: false,
        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value,
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value,
        });
    }

    onChangeUrl(e) {
        this.setState({
            url: e.target.value,
        });
    }

    saveMovie() {
        var data = {
            title: this.state.title,
            description: this.state.description,
            url: this.state.url,
            checked: this.state.checked,
        };

        MovieService.create(data)
            .then(() => {
                this.props.history.goBack();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    newMovie() {
        this.setState({
            id: null,
            title: "",
            description: "",
            url: "",
            checked: false,
        });
    }

    toggleButton() {
        console.log(this.state.checked)
        this.setState({
            checked: !this.state.checked,
        })
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You Submitted Successfully!</h4>
                        <button onClick={this.newMovie}>Add</button>
                    </div>
                ) : (
                        <div >
                            <div className="form-group">
                                <label htmlFor="title">Movie Title</label>
                                <input type="text" className="form-control" id="title" required value={this.state.title} onChange={this.onChangeTitle} name="title" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea type="text" className="form-control" id="description" required value={this.state.description} onChange={this.onChangeDescription} name="description" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="url">Image URL</label>
                                <input type="text" className="form-control" id="url" required value={this.state.url} onChange={this.onChangeUrl} name="url" />
                            </div>

                            <div className="form-group">
                                <button className="checked" value={this.state.checked} onClick={this.toggleButton} name="checked">{this.state.checked ? <FaToggleOn size="2.5rem" color="green" /> : <FaToggleOff size="2.5rem" />}</button>
                                <p>Status is <span>{this.state.checked ? "available" : "non-available"}</span></p>
                            </div>

                            <button className="btn btn-success btn-block" onClick={this.saveMovie}>Save</button>

                        </div>
                    )
                }
            </div>
        )
    }
}