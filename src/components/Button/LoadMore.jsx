import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './LoadMore.module.css'

export default class LoadMore extends Component {
    static propTypes ={
        onClick: PropTypes.func.isRequired,
    }
  render() {
    return (
        <button className={css.Button} onClick={this.props.onClick}>
            Load more
        </button>
    )
  }
}
