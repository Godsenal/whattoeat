import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import Autosuggest from 'react-autosuggest';
import FaFlus from 'react-icons/lib/fa/plus';
import styles from '../style/TagFinder.scss';
import theme from '../style/AutoSuggest.css';

import {getSuggestTags } from '../actions/tag';

const cx = classNames.bind(styles);
const re=/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

const checkAndReplace = (value) => {
  let word = value;
  let hasSpecial = re.test(word);
  if(word && hasSpecial){
    word = word.replace(re,'');
  }
  return word;
};

class TagFinder extends Component {
  constructor(){
    super();
    this.state = {
      word : '',
      isSearch: false,
    };
  }
  handleChange = (e,{newValue}) => {
    let word = checkAndReplace(newValue);
    
    this.setState({
      word
    });
  }
  handleSelect = (e,{suggestion}) => {
    if(this.props.isAdd && 'value' in suggestion){
      this.props.handleAddTag(suggestion.value);
    }
    else{
      this.props.handleAddTag(suggestion.name);
    }
    
    this.setState({
      word: ''
    });

  }
  handleButtonClick = () =>{
    this.setState({
      isSearch: !this.state.isSearch
    });
  }
  getSuggestionValue = (item) =>{
    if(this.props.isAdd && 'value' in item){
      return item.value.trim();
    }
    else{
      return item.name.trim();
    }
  }
  onSuggestionsFetchRequested = ({value}) =>{
    let word = checkAndReplace(value);
    if(word){
      this.props.getSuggestTags(word.trim());
    }
  }
  onSuggestionsClearRequested = () =>{
    this.props.getSuggestTags('');
  }
  render() {
    const {word,isSearch} = this.state;
    const {getSuggest, isAdd} = this.props;
    let suggestions = getSuggest.tags.length == 0 && isAdd? [{name:word+'...을(를) 새로운 태그로 추가',value:word}] : getSuggest.tags;
    return (
      <div className={cx('tagFinderContainer')}>
        {
          !isAdd?
            <div className={cx('tagFinderButton',isSearch?'tagFinderButton-inactive':null)} onClick={this.handleButtonClick}>
              <FaFlus className={cx('tagFinderButtonIcon',isSearch?'tagFinderButtonIcon-rotate':null)}/>
            </div>:null
        }
        
        <div className={cx('tagFinderInput',isSearch || isAdd?'tagFinderInput-active':null)}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            onSuggestionSelected={this.handleSelect}
            getSuggestionValue={this.getSuggestionValue}
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
  isAdd: false,
};

TagFinder.propTypes = {
  getSuggest: PropTypes.object.isRequired,
  getSuggestTags: PropTypes.func.isRequired,
  handleAddTag: PropTypes.func.isRequired,
  isAdd: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    getSuggest: state.tag.getSuggest,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSuggestTags : (word) => {
      return dispatch(getSuggestTags(word));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagFinder);