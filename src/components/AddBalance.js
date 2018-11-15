import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { addBalance } from '../actions/userActions'


class AddBalance extends Component {
  constructor({ stock }) {
    super()
    this.state = {
      form: 'BUY',
      open: false,
      message: null,
      deposit_amount: null
    }
  }

  handleModalClose = () => {this.setState({ open: false })}

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addMessageToHomeScreen(`Successfully deposited $${this.state.deposit_amount}`)
    this.handleModalClose()
    this.props.addBalance({deposit_amount: this.state.deposit_amount, user_id: this.props.user_id})
  }

  showForm = () => {
    return(
      <form onSubmit={this.handleSubmit} className="ui form" style={{color: 'black'}}>
        <h2>Current balance: ${this.props.account_balance}</h2>
          <label>Enter an amount to deposit</label>
          <input onChange={this.onChangeHandler} type="number" step="0.001" name="deposit_amount" placeholder="Amount" />
        <button style={{marginTop:'1%'}} className="ui green button" type="submit">Submit</button>
      </form>
    )
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
      <Modal size={'mini'} open={this.state.open} dimmer={'blurring'} trigger={<Button onClick={() => this.setState({ open: true })} className='ui inverted green button'>Deposit</Button>}>
        <Modal.Header>
          <div className="ui red message" style={{display: this.renderMessage()}}>
            <i className="close icon" onClick={() => this.setState({ message: null })}></i>
            <div className="header">
              {this.state.message}
            </div>
          </div>
          <button onClick={()=> this.setState({ open: false })} className='ui inverted red button' style={{float: 'right'}}>X</button>
          </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {this.showForm()}
          </Modal.Description>
        </Modal.Content>
      </Modal>
  )}
}

const mapStateToProps = (state) => {
  return {
    account_balance: state.user.account_balance,
    user_id: state.user.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBalance: (amount) => dispatch(addBalance(amount))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBalance)
