import React, { Component } from "react";
import MovieService from '../Services/MovieService';
import { FaToggleOn, FaToggleOff } from "react-icons/fa"

export default class Movie extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeUrl = this.onChangeUrl.bind(this);
        this.getMovie = this.getMovie.bind(this);
        this.updateMovie = this.updateMovie.bind(this);
        this.toggleButton = this.toggleButton.bind(this)

        this.state = {
            currentMovie: {
                id: null,
                title: "",
                description: "",
                url: "",
                checked: false,
            },
            message: "",
        }
    }

    componentDidMount() {
        this.getMovie(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentMovie: {
                    ...prevState.currentMovie,
                    title: title,
                }
            }
        })
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState((prevState) => ({
            currentMovie: {
                ...prevState.currentMovie,
                description: description,
            }
        }))
    }

    onChangeUrl(e) {
        const url = e.target.value;

        this.setState((prevState) => ({
            currentMovie: {
                ...prevState.currentMovie,
                url: url,
            }
        }))
    }

    getMovie(id) {
        MovieService.retrieveById(id)
            .then((response) => {
                const data = response.data;
                this.setState({
                    currentMovie: data
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    updateMovie() {
        MovieService.update(this.state.currentMovie.id, {
            title: this.state.currentMovie.title,
            description: this.state.currentMovie.description,
            url: this.state.currentMovie.url,
            checked: this.state.currentMovie.checked,
        })
            .then((response) => {
                this.setState({
                    message: "Data updated succesfully",
                })
            })
            .catch((error) => {
                this.setState({
                    message: "Error when updating data" + error,
                })
            })
    }

    toggleButton() {
        this.setState({
            currentMovie: {
                ...this.state.currentMovie,
                checked: !this.state.currentMovie.checked,
            }
        })
    }

    render() {
        const { currentMovie } = this.state;

        return (
            <div className="submit-form">
                {currentMovie ? (
                    <div>
                        <h4>Update Movie</h4>

                        <div >
                            <label className="form-group" htmlFor="title">Movie Title</label>
                            <input className="form-control" type="text" id="title" name="title" value={currentMovie.title} onChange={this.onChangeTitle} />
                        </div>

                        <div >
                            <label className="form-group" htmlFor="description">Description</label>
                            <input className="form-control" type="text" id="description" name="description" value={currentMovie.description} onChange={this.onChangeDescription} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="url">Image URL</label>
                            <input type="text" className="form-control" id="url" required value={currentMovie.url} onChange={this.onChangeUrl} name="url" />
                        </div>

                        <div className="form-group">
                            <button className="checked" value={currentMovie.checked} onClick={this.toggleButton}>{currentMovie.checked ? <FaToggleOn size="2.5rem" color="green" /> : <FaToggleOff size="2.5rem" />}</button>
                            <p>Status is <span>{currentMovie.checked ? "available" : "non-available"}</span></p>
                        </div>

                        <button className="btn btn-success btn-block" type="submit" onClick={this.updateMovie}>
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Please click on a Movie...</p>
                        </div>
                    )
                }
            </div >
        )
    }
}