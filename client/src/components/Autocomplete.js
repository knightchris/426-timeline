import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/Autocomplete.css';

export class Autocomplete extends Component {

  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this); 
  }

  static propTypes = {
    options: PropTypes.instanceOf(Array).isRequired
  };
  state = {
    activeOption: null,
    filteredOptions: [],
    showOptions: false,
    userInputObject: {},
    searchText: ""
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,

      state: { activeOption, filteredOptions, showOptions, userInputObject, searchText }
    } = this;
    let optionList;
    if (showOptions && userInputObject) {
      if (filteredOptions.length) {
        optionList = (
          <ul className="options">
            {filteredOptions.map((option, index) => {
              let className;
              if (index === activeOption) {
                className = 'option-item';
              }
              return (
                <li data-mediaid={option.mediaid} className={className} key={option.mediaid} onClick={onClick}>
                  {option.title}
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionList = (
          <div className="no-options">
            <em>None</em>
          </div>
        );
      }
    }
    return (
      <React.Fragment>
        <div className="search">
          <input
            placeholder="Title name..."
            type="text"
            className="search-box"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={searchText}
          />
          <input type="submit" value="Find Item" className="search-button" onClick={this.handleClick}/>
        </div>
        {optionList}
      </React.Fragment>
    );
  }

  onChange = async(e) => {

    let searchText = e.target.value;
    const filteredOptions = this.props.options.filter(
      (option) =>
        option.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1
    );
    if(!searchText) {
      this.setState({
        activeOption: null,
        filteredOptions: [],
        showOptions: false,
        searchText: searchText
      });
      return;
    }
    this.setState({
    activeOption: 0,
    filteredOptions,
    showOptions: true,
    userInputObject: filteredOptions[0],
    searchText: searchText
    });
  };


  onClick = (e) => {
    const searchId = e.currentTarget.getAttribute("data-mediaid");
    // eslint-disable-next-line
    let userInputObject = this.props.options.filter(t => t.mediaid == searchId)[0];

    let searchText = e.currentTarget.innerText;
    this.setState({
      activeOption: null,
      filteredOptions: [],
      showOptions: false,
      userInputObject: userInputObject,
      searchText: searchText
    });
  };
  
  onKeyDown = (e) => {
    
    const { activeOption, filteredOptions } = this.state;
    if (e.keyCode === 13 && activeOption !== null) {
      this.setState({
        activeOption: null,
        showOptions: false,
        userInputObject: filteredOptions[activeOption],
        searchText: filteredOptions[activeOption]?.title
      });
      this.handleClick();
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ 
        activeOption: activeOption - 1, 
        userInputObject: filteredOptions[activeOption - 1] 
      });
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        return;
      }
      this.setState({ 
        activeOption: activeOption + 1, 
        userInputObject: filteredOptions[activeOption + 1] 
       });
    }
  };

   handleClick = async(e) => {
    if (this.state.userInputObject?.mediaid != null ) {
      document.getElementById(this.state.userInputObject.mediaid).scrollIntoView();
    }
  }

}


export default Autocomplete;