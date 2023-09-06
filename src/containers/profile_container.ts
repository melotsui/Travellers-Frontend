import { connect } from 'react-redux';
import { updateUser } from '../actions/user_actions';
import Login from '../screens/auth/login';

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);