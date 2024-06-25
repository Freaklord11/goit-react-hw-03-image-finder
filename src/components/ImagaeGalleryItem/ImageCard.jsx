import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageCard.module.css';
import Modal from '../Modal/Modal';

export default class ImageCard extends Component {
  static propTypes ={
    image: PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string, 
    }).isRequired
  }

  state ={
    showModal: false,
  }

  toogleModal = () =>{
    this.setState(prevState =>({
        showModal: !prevState.showModal,
    }));
  }
  
  
    render() {
        const {webformatURL, largeImageURL, tags} = this.props.image;
        const {showModal} = this.state;
        
        return (
            <li className={css.galleryItem} onClick={this.toggleModal}>
            <img src={webformatURL} alt={tags} />
                {showModal && (
                    <Modal image={largeImageURL} tags={tags} onClose={this.toggleModal} />
                )}
            </li>
        )
  }
}
