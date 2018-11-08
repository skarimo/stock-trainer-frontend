import React, { Component } from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import Buy from '../components/Buy'
import Sell from '../components/Sell'


class Trade extends Component {
  constructor({ stock }) {
    super()
    this.state = {
      form: 'BUY',
      stock: {...stock}
    }
  }


  showForm = () => {
    if(this.state.form === 'BUY') {
      return (
        <React.Fragment>
          <Header style={{color:'green'}}>Buy Form</Header>
          <Buy stock={this.state.stock} liveData={this.props.liveData} submitShareBuy={this.submitShareBuy} />
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Header style={{color:'red'}}>Sell Form</Header>
          <Sell stock={this.state.stock} />
        </React.Fragment>
      )
    }
  }


  render() {
    return (
      <Modal size={'tiny'} dimmer={'blurring'} trigger={<Button className='ui inverted green button'>Trade</Button>}>
        <Modal.Header>
          <button onClick={()=> this.setState({ form: 'BUY' })} className='ui green button'>Buy</button>
          <button onClick={()=> this.setState({ form: 'SELL' })} className='ui red button'>Sell</button></Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {this.showForm()}
          </Modal.Description>
        </Modal.Content>
      </Modal>
  )}
}

export default Trade




























 // import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { withRouter } from 'react-router'
//
// import Buy from '../components/Buy'
// import Sell from '../components/Sell'
//
// import { buyStock, sellStock } from '../actions/stockActions'
//
//
// class TradePage extends Component {
//   // constructor({ symbol }) {
//     state = {
//       symbol: this.props.match.params.symbol
//     }
//   // }
//   symbol = () => this.props.match.params.symbol
//
//   showPage = () => {
//     let ownedStocks = null
//     let ownedCurrentStockCard = null
//
//     ownedStocks = this.props.stockList.owned_stocks
//
//     if (ownedStocks) {
//        ownedCurrentStockCard = ownedStocks.filter(stock => stock.stock.symbol === this.symbol())[0]
//     }
//
//     if (ownedCurrentStockCard) {
//       return (
//         <React.Fragment>
//           <Buy />
//           <Sell />
//         </React.Fragment>)
//     } else {
//       return (
//         <React.Fragment>
//           <Buy />
//         </React.Fragment>)
//     }
//   }
//
//
//   render() {
//     return (
//       <div className="stockContainer">
//           <div style={{display:'inline-block', align:'center', width:'100%'}}>
//             <button>Buy Form</button>
//             <button>Sell Form</button>
//           </div>
//           {this.showPage()}
//       </div>
//     )
//   }
// }
//
// const mapStateToProps = (state) => {
//   return {
//     stockList: {owned_stocks: state.user.owned_stocks},
//     user: state.user,
//   }
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     buyStock: (stockData) => dispatch(buyStock(stockData)),
//     sellStock: (stockData) => dispatch(sellStock(stockData))
//   }
// }
//
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TradePage))
