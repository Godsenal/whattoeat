import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Autosuggest from 'react-autosuggest';
import FaFlus from 'react-icons/lib/fa/plus';
import styles from '../style/TagFinder.scss';
import theme from '../style/AutoSuggest.css';
const cx = classNames.bind(styles);


export default class TagFinder extends Component {
  constructor(){
    super();
    this.state = {
      word : '',
      isSearch: false,
    };
  }
  handleChange = (e) => {
    this.setState({
      word : e.target.value
    });
  }
  handleSelect = (val) => {
    this.props.handleAddTag(val);
    this.setState({
      word: ''
    });

  }
  handleButtonClick = () =>{
    this.setState({
      isSearch: !this.state.isSearch
    });
  }
  onSuggestionsFetchRequested = ({value}) =>{
    if(value){
      this.props.getSuggestTags(value);
    }
  }
  onSuggestionsClearRequested = () =>{
    this.props.getSuggestTags('');
  }
  render() {
    const {word,isSearch} = this.state;
    const {getSuggest} = this.props;
    return (
      <div className={cx('tagFinderContainer')}>
        <div className={cx('tagFinderButton',isSearch?'tagFinderButton-inactive':null)} onClick={this.handleButtonClick}>
          <FaFlus className={cx('tagFinderButtonIcon',isSearch?'tagFinderButtonIcon-rotate':null)}/>
        </div>
        <div className={cx('tagFinderInput',isSearch?'tagFinderInput-active':null)}>
          <Autosuggest
            suggestions={getSuggest.tags}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            onSuggestionSelected={this.handleSelect}
            getSuggestionValue={(item) => item.name}
            renderSuggestion={(item) =>
              <div className={cx('tagSuggenstion')}>
                {item.name}
              </div>
            }
            inputProps={{
              placeholder: '태그 검색',
              onChange: this.handleChange,
              value: word,
              autoFocus: true,
            }}
            theme={theme}
          />
        </div>
      </div>
    );
  }
}

TagFinder.defaultProps = {
  getSuggest: {},
};

TagFinder.propTypes = {
  getSuggest: PropTypes.object.isRequired,
  getSuggestTags: PropTypes.func.isRequired,
  handleAddTag: PropTypes.func.isRequired,
};
