import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css'
import ImageCard from 'components/ImagaeGalleryItem/ImageCard';

export default class ImageGallery extends Component {
    static propTypes ={
        images: PropTypes.arrayOf(PropTypes.shape({id: PropTypes.number.isRequired})).isRequired
    }

  render() {
    const {images} = this.props;
    return (
        <ul className={css.gallery}>
        {images.map(image => (
          <ImageCard key={image.id} image={image} />
        ))}
      </ul>
    )
  }
}
