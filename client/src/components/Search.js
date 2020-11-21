import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/Search.css';
import axios from 'axios'
import TimelineItem from './TimelineItem.js'

export class Autocomplete extends Component {

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  static propTypes = {
    options: PropTypes.instanceOf(Array).isRequired
  };
  state = {
    activeOption: 0,
    filteredOptions: [],
    showOptions: false,
    userInput: ''
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,

      state: { activeOption, filteredOptions, showOptions, userInput }
    } = this;
    let optionList;
    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionList = (
          <ul className="options">
            {filteredOptions.map((optionName, index) => {
              let className;
              if (index === activeOption) {
                className = 'option-item';
              }
              return (
                <li className={className} key={optionName} onClick={onClick}>
                  {optionName}
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
            type="text"
            className="search-box"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
        </div>
        {optionList}
      </React.Fragment>
    );
  }

  onChange = async(e) => {
    //console.log('it is changing');

    let { options } = this.props;
    // options = await this.getCardTitles();
    //console.log(options);
    
    //console.log(e.currentTarget.value);

    const userInput = e.currentTarget.value;
    

    const filteredOptions = options.filter(
      (optionName) =>
        optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = (e) => {
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: e.currentTarget.innerText
    });
  };
  onKeyDown = (e) => {
    const { activeOption, filteredOptions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showOptions: false,
        userInput: filteredOptions[activeOption]
      });
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        console.log(activeOption);
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

   handleClick = async(e) => {
    e.preventDefault();
    const result = await axios({
        method: 'post',
        url: 'http://localhost:3000/mediacards',
        withCredentials: true,
        data: {
          "approved": true
        }
       }); 
      // console.log(this.state.userInput); 
      // console.log(result.data); 
      for(let i = 0; i < result.data.length; i++) {
        if(result.data[i].title === this.state.userInput) {
          document.getElementById(result.data[i].mediaid).scrollIntoView();
      }
      }
      
    //const timelineitem = <TimelineItem key={card.mediaid} data={card}></TimelineItem>;
  }

  getCardTitles = async(e) => {
    //e.preventDefault();
    const result = await axios({
        method: 'post',
        url: 'http://localhost:3000/mediacards',
        withCredentials: true,
        data: {
          "approved": true
        }
    });
    let titlearr = [];
    titlearr = result.data.map(tup => tup.title);
    //console.log(titlearr);
    return titlearr;
  }


}


export default Autocomplete;