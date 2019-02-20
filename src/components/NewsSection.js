import React, { Component } from 'react'

class NewsSection extends Component {

  state = {
    newsData: []
  }

  componentDidMount() {
    fetch('https://api.iextrading.com/1.0/stock/market/news/last/5').then(res=>res.json())
    .then((newsData) => {this.setState({ newsData })})
  }

  newsCard = (news) => {
    return (
      <div key={news.url} onClick={()=> window.open(news.url, "_blank")} className='newsCard'>
        <h3>{news.headline}</h3>
        Summary: {news.summary}
      </div>
    )
  }


  render() {
    const newsList = this.state.newsData.map(news => this.newsCard(news))
      return (
        <div className="newsHolder">
        {newsList}
        </div>
      )
    }
}


export default NewsSection
