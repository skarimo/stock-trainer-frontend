import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

// import { createBrowserHistory } from 'history'
// const history = createBrowserHistory()

const _ = require('lodash')

class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      searchTerm: "",
      searchResults: []
    }
  }

  handleOnLogoutClick = (e) => {
    localStorage.removeItem("token")
    window.location.reload()
  }

  getSearchResults = (searchObj) => {
    const token = localStorage.getItem("token")
    fetch(`http://localhost:3000/api/v1/search`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({'search_term': this.state.searchTerm})
      })
      .then(r => r.json())
      .then(searchResults => { this.setState({ searchResults })})
  }

  handleSearchTermChange = (e, { value }) => {
    this.setState({ searchTerm: value })
    this.getSearchResults()
  }

  handleResultSelect = (e, { result }) => {
    this.props.history.push(`/stock/${result.value.id}`, result.value)
  }

  render() {
    const results = this.state.searchResults.map((res) => {
      return {"title": res.symbol, "description": res.name, "value": res}
    })

    return (
      <div className="navbar">
        <div className="ui search">
          <button className="ui green button" onClick={this.handleOnLogoutClick}>Logout</button>
          <div className="ui icon input">
            <Search onSearchChange={_.debounce(this.handleSearchTermChange, 1000)} onResultSelect={this.handleResultSelect} placeholder="Search stock..." showNoResults={true} results={results} />
            <i className="search icon"></i>
          </div>
        </div>
    </div>
    )
  }
}

export default withRouter(Navbar)
