import React from 'react'
import { Link } from 'react-router-dom'

const LoginForm = (props) => {
    return (
      <div className="background" style={{height: '100vh'}}>
        <div className="column">
            <h2 className="ui green image header">
              {/*<img src="assets/images/logo.png" className="image" />*/}
            </h2>
            <form className="ui large form">
              <div className="ui stacked segment" style={{backgroundColor: 'Silver'}}>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon"></i>
                    <input onChange={props.handleLoginFormChange} type="text" name="username" placeholder="Username" />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input onChange={props.handleLoginFormChange} type="password" name="password" placeholder="Password" />
                  </div>
                </div>
                <button onClick={(e) => props.handleLoginSubmit(e)} className="ui fluid large green submit button">Login</button>
              </div>
              <div className="ui error message"></div>
            </form>
            <div className="ui message" style={{backgroundColor: 'Silver'}}>
              New to us? <Link to='/signup'>Sign Up</Link>
            </div>
          </div>
        </div>
    )
  }

export default LoginForm
