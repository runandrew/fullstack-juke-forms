import React from 'react';
import Songs from '../components/Songs';

class Playlist extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      selectedSong: {}
    }
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

  addSongToPlaylist (song) {
    axios.post(`/api/playlists/${this.props.selectedPlaylist.id}/songs`, {
      id: song.id
    })
    .then(res => res.data)
    .then(song => {
      this.props.updateSelectedPlaylistSongs(song);
    })
    .catch(console.error);
  }

  render () {
    const playlist = this.props.selectedPlaylist;
    const songs = this.props.songs;
    return (
      <div>
        <div>
          <h3>{ playlist.name }</h3>
          <Songs songs={playlist.songs} />
          { playlist.songs && !playlist.songs.length && <small>No songs.</small> }
          <hr />
        </div>
        <div className="well">
          <form className="form-horizontal" noValidate name="songSelect">
            <fieldset>
              <legend>Add to Playlist</legend>
              <div className="form-group">
                <label htmlFor="song" className="col-xs-2 control-label">Song</label>
                <div className="col-xs-10">
                  <select className="form-control" name="song">
                    {songs.map(song => {
                      return <option key={song.id} value={song.id}>{song.name}</option>
                    })}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-10 col-xs-offset-2">
                  <button type="submit" className="btn btn-success" onClick={this.addSongToPlaylist}>Add Song</button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default Playlist;
