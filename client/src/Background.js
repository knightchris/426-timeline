import { render } from 'react-dom';
import './Background.css';

function Background() {
    return (
        <div id="background"></div>
    );
}

function Midground() {
    return (
        <div id="midground"></div>
    );
}

export {
    Background,
    Midground,
}