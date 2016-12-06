import React from 'react';
import Songs from '../components/Songs';
import Warning from '../components/Warning';
import axios from 'axios';

const Playlist = (props) => {
  const playlist = props.selectedPlaylist;
  const songs = props.songs;
  return (
    <div>
      <div>
        <h3>{ playlist.name }</h3>
        <Songs 
          songs={playlist.songs} 
          currentSong={props.currentSong} 
          isPlaying = {props.isPlaying} 
          toggle = {props.toggleOne} />
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
                <select 
                  className="form-control" 
                  name="song" 
                  onChange={(event) => {props.updateSelectedSong(event.target.value)}}
                  value={props.selectedSongId}>
                  {songs.map(song => {
                    return <option key={song.id} value={song.id}>{song.name}</option>
                  })}
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <Warning {...props}/>
                <button type="submit" className="btn btn-success" onClick={(event) => {props.addSelectedSong(event)}}>Add Song</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default Playlist;
