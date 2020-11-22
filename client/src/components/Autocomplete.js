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
    activeOption: 0,
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
        <input type="submit" value="Find Item" className="search-button" onClick={this.handleClick}/>
          <input
            placeholder="Title name..."
            type="text"
            className="search-box"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={searchText}
          />
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
        activeOption: 0,
        filteredOptions,
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
    let userInputObject = this.props.options.filter(t => t.mediaid === searchId)[0];

    let searchText = e.currentTarget.innerText;
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInputObject: userInputObject,
      searchText: searchText
    });
  };
  onKeyDown = (e) => {
    
    const { activeOption, filteredOptions } = this.state;
    if (e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showOptions: false,
        userInputObject: filteredOptions[activeOption],
        searchText: filteredOptions[activeOption].title
      });
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
    document.getElementById(this.state.userInputObject.mediaid).scrollIntoView();
  }

}


export default Autocomplete;