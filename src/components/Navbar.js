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
      searchResults: [],
      isLoading: false
    }
  }

  handleOnLogoutClick = (e) => {
    localStorage.removeItem("token")
    window.location.reload()
  }

  getSearchResults = (searchObj) => {
    const token = localStorage.getItem("token")
    fetch(`https://stock-trainer-backend.herokuapp.com/api/v1/search`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({'search_term': this.state.searchTerm})
      })
      .then(r => r.json())
      .then(searchResults => {
        this.setState({ searchResults: searchResults, isLoading: false })})
  }

  handleSearchTermChange = (e, { value }) => {
    this.setState({ searchTerm: value, isLoading: true })
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
      <div className="navbar" style={{margin: "1%"}}>
        <div className="ui search">
          <button onClick={() => this.props.history.push(`/`)} className="ui green button">HOME</button>
          <div className="ui icon input">
            <Search loading={this.state.isLoading} onSearchChange={_.debounce(this.handleSearchTermChange, 500)} onResultSelect={this.handleResultSelect} placeholder="Search stock..." showNoResults={true} results={results} />
            <i className="search icon"></i>
          </div>
          <button style={{float:'right'}} className="ui red button" onClick={this.handleOnLogoutClick}>Logout</button>
        </div>
    </div>
    )
  }
}

export default withRouter(Navbar)
