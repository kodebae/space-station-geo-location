import React from 'react';
import Tilt from 'index';
import { DefaultComponent } from '../_DefaultComponent/DefaultComponent';
import '../Assets/Logo.css';
import Logo from '../Assets.js/ISS_emblem.png';

const KeepFloating = () => (
  <Tilt reset={false}>
    <DefaultComponent />
  </Tilt>
);

export default KeepFloating;