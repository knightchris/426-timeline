import React from 'react';
import Menu from '../Menu.js';
import {Background, Midground,} from '../Background.js';

function Timeline() {
  return (
    <div className="Timeline">
        <Background />
        <Midground />
        <Menu />
    </div>
  );
}

export default Timeline;