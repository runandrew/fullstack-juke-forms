import React, { Component } from 'react';
import NewPlaylistForm from '../components/NewPlaylistForm';
import axios from 'axios';
import { hashHistory } from 'react-router';

export default class NewPlaylistFormContainer extends Component {

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
        axios.post('/api/playlists', {
            name: this.state.playlistInput
        })
        .then((res) => res.data)
        .then((result) => {
            this.props.updatePlaylists(result);
            this.setState({
                playlistInput: '',
                message: `${this.state.playlistInput} was successfully added.`
            });

            setTimeout(() => {
                const path = `/playlists/${result.id}`;
                hashHistory.push(path);
            }, 2000);
        })
        .catch(console.error);

    }

    render() {
        const props = Object.assign({}, this.props, this.state, {
          updatePlaylistInput: this.updatePlaylistInput,
          onSubmit: this.onSubmit,
        });
        return (
            <NewPlaylistForm {...props} />
        );
    }
}
