import React, { Component } from 'react'
import SignUpForm from '../components/SignUpForm'
import { connect } from 'react-redux'
import { signUp } from '../actions/authorizeActions'


class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      account_balance: null
    }
  }


  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleOnSubmit = (e) => {
    e.preventDefault()
    this.props.signUp(this.state)
    .then((res) => {
      if (res.message === "Success") {
        this.props.history.push('/')
      } else {
        let errorKeys = Object.keys(res.errors).map((key) => `${key.split("_").join(" ")}: ${res.errors[key]} `)
        alert(errorKeys)
      }
    })
  }

  render() {
      return (
        <SignUpForm handleOnChange={this.handleOnChange} handleOnSubmit={this.handleOnSubmit}/>
      )
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      signUp: (userState) => dispatch(signUp(userState))
    }
  }

  export default connect(null, mapDispatchToProps)(SignUp)
