import React, { Component } from 'react';
import Artists from '../components/Artists';
import FilterInput from '../components/FilterInput';

export default class ArtistsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            artistsFilter: ''
        }

        this.filterArtists = this.filterArtists.bind(this);
    }

    filterArtists(inputValue) {
        this.setState({ artistsFilter: inputValue })
    }

    render () {

        // Filter the artists
        const filteredArtists = this.props.artists.filter((artist) => {
            return artist.name.indexOf(this.state.artistsFilter) !== -1;
        });

        return (
            <div>
                <FilterInput filterArtists={this.filterArtists} />
                <Artists artists={filteredArtists}/>
            </div>
        );
    }
}
