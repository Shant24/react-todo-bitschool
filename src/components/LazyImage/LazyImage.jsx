import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Image = ({ img }) => <LazyLoadImage {...img} effect="blur" />;

Image.propTypes = { image: PropTypes.object.isRequired };

export default Image;
