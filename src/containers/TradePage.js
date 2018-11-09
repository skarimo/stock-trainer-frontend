import React, { Component } from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import Buy from '../components/Buy'
import Sell from '../components/Sell'


class Trade extends Component {
  constructor({ stock }) {
    super()
    this.state = {
      form: 'BUY',
      open: false,
      stock: {...stock},
      message: null
    }
  }

  handleModalClose = () => {this.setState({ open: false })}

  showForm = () => {
    if(this.state.form === 'BUY') {
      return (
        <React.Fragment>
          <Header style={{color:'green'}}>Buy Form</Header>
          <Buy addMessageToModal={this.addMessageToModal} handleModalClose={this.handleModalClose} addMessageToHomeScreen={this.props.addMessageToHomeScreen} stock={this.props.stock} liveData={this.props.liveData} submitShareBuy={this.submitShareBuy} />
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Header style={{color:'red'}}>Sell Form</Header>
          <Sell addMessageToModal={this.addMessageToModal} handleModalClose={this.handleModalClose} stock={this.props.stock} addMessageToHomeScreen={this.props.addMessageToHomeScreen} />
        </React.Fragment>
      )
    }
  }

  renderMessage = () => {
    if (this.state.message) {
      return 'block'
    } else {
      return 'none'
    }
  }

  addMessageToModal = (message) => {this.setState({ message })}

  render() {
    return (
      <Modal size={'mini'} open={this.state.open} dimmer={'blurring'} trigger={<Button onClick={() => this.setState({ open: true })} className='ui inverted green button'>Trade</Button>}>
        <Modal.Header>
          <div className="ui red message" style={{display: this.renderMessage()}}>
            <i className="close icon" onClick={() => this.setState({ message: null })}></i>
            <div className="header">
              {this.state.message}
            </div>
          </div>
          <button onClick={()=> this.setState({ open: false })} className='ui inverted red button' style={{float: 'right'}}>X</button>
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
