import React, { Component } from "react";
import { Link } from "react-router-dom";
import MovieService from '../Services/MovieService';
import { FaEdit, FaTrash, FaEyeSlash, FaEye } from "react-icons/fa"

export default class MovieList extends Component {
    constructor(props) {
        super(props);
        this.retrieveMovies = this.retrieveMovies.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveMovie = this.setActiveMovie.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);

        this.state = {
            Movies: [],
            currentMovie: null,
            currentIndex: -1,
        };
    }

    componentDidMount() {
        this.retrieveMovies();
    }

    retrieveMovies() {
        MovieService.retrieveAll()
            .then(response => {
                const data = response.data;
                this.setState({
                    Movies: data
                })
            })
            .catch(error => {
                console.error(error);
            })
    }

    refreshList() {
        this.retrieveMovies();
        this.setState({
            currentMovie: null,
            currentIndex: -1,
        });
    }

    setActiveMovie(Movie, index) {
        this.setState({
            currentMovie: Movie,
            currentIndex: index,
        })
    }

    deleteMovie(id) {
        MovieService.delete(id)
            .then(response => {
                this.refreshList()
            })
            .catch((error) => {
                alert("error")
            })
    }

    render() {
        const { Movies, currentMovie, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Movie List</h4>

                    <ul className="list-group-item">
                        {Movies &&
                            Movies.map((Movie, index) => (
                                <li className={"list-group-item list-group-item-dark" + (index === currentIndex ? "" : "active")} onClick={() => this.setActiveMovie(Movie, index)} key={index}>
                                    <div className="d-flex justify-content-between">
                                        {Movie.title}
                                        <div>
                                            <button className="checked"> {Movie.checked === 0 ? <FaEyeSlash /> : <FaEye />}</button>
                                            <Link to={"/movies/" + Movie.id}> <FaEdit className="link-hover" /> </Link>
                                            <FaTrash onClick={() => { if (window.confirm("Are you sure want to delete this item?")) { this.deleteMovie(Movie.id) } }} className="link-hover" />
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    {currentMovie ? (
                        <div>
                            <h4>Detail Movie</h4>
                            <div>
                                <img className="size-image img-thumbnail" src={currentMovie.url} alt="Cover Movie" />
                            </div>
                            <div >
                                <label className="form-group">
                                    <strong>Title:</strong>
                                </label>
                                <p>{currentMovie.title}</p>
                            </div>
                            <div >
                                <label className="form-group">
                                    <strong>Description:</strong>
                                </label>
                                <p>{currentMovie.description}</p>
                            </div>
                            <div>
                                <label className="form-group">
                                    <strong>Status:</strong>
                                </label>
                                <p>{currentMovie.checked ? "Available" : "Non-available"}</p>
                            </div>
                        </div>
                    ) : (
                            <div>
                                <br />
                                <p>Click the Movie to See the Details...</p>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}