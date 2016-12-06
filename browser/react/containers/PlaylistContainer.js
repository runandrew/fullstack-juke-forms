import React, { Component } from 'react';
import axios from 'axios';
import Playlist from '../components/Playlist';

export default class PlaylistContainer extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      selectedSongId: 1,
      isDisabled: false,
      warning: ''
    }
    this.addSelectedSong = this.addSelectedSong.bind(this);
    this.updateSelectedSong = this.updateSelectedSong.bind(this);
  }

  componentDidMount () {
    const selectPlaylist = this.props.selectPlaylist;
    selectPlaylist(this.props.routeParams.playlistId);
  }

  componentWillReceiveProps (nextProps) {
    const nextPlaylistId = nextProps.routeParams.playlistId;
    const currentPlaylistId = this.props.routeParams.playlistId;
    const selectPlaylist = this.props.selectPlaylist;
    if (nextPlaylistId !== currentPlaylistId) selectPlaylist(nextPlaylistId);
  }

  addSelectedSong (event) {
    event.preventDefault();
    console.log(this.state.selectedSongId);
    axios.post(`/api/playlists/${this.props.selectedPlaylist.id}/songs`, {
      id: this.state.selectedSongId
    })
    .then(res => res.data)
    .then(song => {
      this.props.updateSelectedPlaylistSongs(song);
    })
    .catch(err => {
      this.setWarning();
      console.error(err);
    });
  }

  updateSelectedSong (songId) {
    this.setState({
      selectedSongId: songId,
      isDisabled: false,
      warning: ''
    });
  }

  setWarning () {
    this.setState({
      isDisabled: true,
      warning: 'Cannot add duplicate song'
    });
  }

  render () {
    const props = Object.assign({}, this.props, this.state, {
      addSelectedSong: this.addSelectedSong,
      updateSelectedSong: this.updateSelectedSong,
    });
    return (
        <Playlist {...props} />
    );
  }

}
