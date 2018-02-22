import React from 'react';
import { graphql, compose } from 'react-apollo';
import { resetPasswordMutation } from '../mutations';
import history from '../history';

class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = { submitted: false };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { resetPassword } = this.props;

    resetPassword({
      variables: { email: event.target.email.value },
    });

    // optimistic
    this.setState({ submitted: true });
    setTimeout(() => { history.push('/login'); }, 3000);
  };

  render() {
    return this.state.submitted
      ? (<h4 className="password-reset-confirm">Password reset email sent. You are now being redirected.</h4>)
      : (
        <form className="container-auth password-reset" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="email"
            className="input"
            placeholder="Email"
          />
          <div className="item-button">
            <button type="submit" className="btn btn-lg button-default">Reset password</button>
          </div>
        </form>
      );
  }
}

export default compose(
  graphql(resetPasswordMutation, { name: 'resetPassword' })
)(PasswordReset);
