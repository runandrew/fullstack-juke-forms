import React, { Component } from 'react';
import NewPlaylistForm from '../components/NewPlaylistForm';
import axios from 'axios';

export default class NewPlaylistContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            playlistInput: '',
            isDisabled: false,
            warning: '',
            message: ''
        }

        this.updatePlaylistInput = this.updatePlaylistInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    updatePlaylistInput(playlistInput) {
        let warning, isDisabled = true;
        if (playlistInput.length > 16) {
            warning = 'Enter a name less than 17 characters';

        } else if (playlistInput.length === 0) {
            warning = 'The name cannot be empty';
        } else {
            warning = '';
            isDisabled = false;
        }

        this.setState({
            playlistInput: playlistInput,
            isDisabled: isDisabled,
            warning: warning
        })
    }

    onSubmit(event) {
        event.preventDefault();
        console.log(this.state.playlistInput);
        axios.post('/api/playlists', {
            name: this.state.playlistInput
        })
        .then((res) => res.data)
        .then((result) => {
            console.log(result);
            this.setState({
                playlistInput: '',
                message: `${this.state.playlistInput} was successfully added.`
            });

            setTimeout(() => {
                this.setState({
                    message: ''
                });
            }, 5000);
        })
        .catch(console.error);

    }


    render() {

        return (
            <div>
            <NewPlaylistForm updatePlaylistInput={this.updatePlaylistInput} onSubmit={this.onSubmit} playlistInput={this.state.playlistInput} isDisabled={this.state.isDisabled} warning={this.state.warning} message={this.state.message}/>
            </div>

        );
    }
}
