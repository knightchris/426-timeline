import React from 'react';
import Menu from '../Menu.js';
import {Background, Midground,} from '../Background.js';
import TL from '../TL.js';

function Timeline() {
  return (
    <div className="Timeline">
        <Background />
        <Midground />
        <Menu />
        <Timeline />
    </div>
  );
}

export default Timeline;