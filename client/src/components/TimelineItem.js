import { render } from 'react-dom';
import React from 'react';
import '../css/TimelineItem.css'



class TimelineItem extends React.Component {
    render() {
        return (
            <div id="container" class="card">
                <h1 class="card-title">The Phantom Menace</h1>            
                <div class="content">
                    <ul>
                        <li>Released: 1999</li>
                        <li> Main characters: Anakin Skywalker, Obi-Wan Kenobe, Darth Maul</li>
                    </ul>
                    <p class="description">Arguably the worst Star Wars movie.</p>
                    <div class="rating-container">
                        <i class="fas fa-star" id="star-one"></i>
                        <i class="fas fa-star" id="star-two"></i>
                        <i class="fas fa-star" id="star-three"></i>
                        <i class="fas fa-star" id="star-four"></i>
                        <i class="fas fa-star" id="star-five"></i>
                    </div>
                </div>
            </div>
        )
    }
};


export default TimelineItem;