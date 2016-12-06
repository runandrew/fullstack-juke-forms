import React from 'react';
import Warning from './Warning';

const NewPlaylistForm = (props) => {
    return (
        <div className="well">
          <form className="form-horizontal" onSubmit={(e) => {
              props.onSubmit(e);
          }}>
            <fieldset>
              <legend>New Playlist</legend>
              <div className="form-group">
                <label className="col-xs-2 control-label">Name</label>
                <div className="col-xs-10">
                    <input
                    className="form-control"
                    placeholder="Enter a playlist name"
                    value={props.playlistInput}
                    onChange={ (event) => {
                        props.updatePlaylistInput(event.target.value);
                    }}
                    />
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-10 col-xs-offset-2">
                  <Warning {...props}/>
                  <button type="submit" className="btn btn-success" disabled={props.isDisabled}>Create Playlist</button>
                  <h4>{props.message}</h4>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
    );
}

export default NewPlaylistForm;
