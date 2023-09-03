import { connect } from 'react-redux';
import { updateUser } from '../actions/user_actions';
import Login from '../screens/auth/login';
import User from '../models/user';

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);