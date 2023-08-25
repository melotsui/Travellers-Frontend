import { connect } from 'react-redux';
import { updateProfile } from '../actions/profile_actions';
import Login from '../screens/auth/login';
import { User } from '../models/user';

const mapStateToProps = (state: any) => {
  return {
    profile: state.profile,
  };
};

const mapDispatchToProps = {
  updateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);