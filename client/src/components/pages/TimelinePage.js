import React from 'react';
import Menu from '../Menu.js';
import {Background, Midground,} from '../Background.js';
import Timeline from '../Timeline.js';

function TimelinePage() {
  return (
    <div className="Timeline">
        <Background />
        <Midground />
        <Menu />
        <Timeline />
    </div>
  );
}

export default TimelinePage;