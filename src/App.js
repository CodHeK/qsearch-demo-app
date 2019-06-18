import React, { Component } from 'react';
import Search from 'qsearch';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      filtered: null,
      suggested: null,
    }
  }
  componentWillMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(resp => resp.json())
        .then(data => this.setState({ data, }));
  }
  
  getSearchData = (data) => {
      const { filtered, suggested } = data;
      this.setState({ filtered, suggested });
  };
  
  render() {
    const { data, filtered, suggested } = this.state;
    const SearchBarStyles = {
      width: '300px',
      height: '50px',
      marginTop: '2%',
      marginBottom: '2%',
      borderRadius: '10px',
      paddingLeft: '5px'
    };
    
    const config = {
      data: data,
      styles: SearchBarStyles,
      onEnter: false,
      callback: this.getSearchData
    };
    
    let displayData = filtered && filtered.map((each, key) => {
      return <div className="jumbotron" key={key} style={{ marginTop: '2%' }}>
                <h3>{each.name}</h3>
                <h5>{`@${each.username}`}</h5>
                <h5>{each.email}</h5>
                <h5>{each.phone}</h5>
                <h5>{each.website}</h5>
            </div>
    });
    
    let suggestedData = suggested && suggested.map((each) => {
        return <span><b>{each}&nbsp;&nbsp;</b></span>
    });
    
    return (
        <div className="container">
          {
            data && <Search config={config} />
          }
          <div>
              <h5>Suggested: </h5>
              {suggestedData}
          </div>
          <div>
            {displayData}
          </div>
        </div>
    );
  }
}

export default App;
