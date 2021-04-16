import {ADD_USER, SIGN_OUT, LOG_IN} from '../actions/types';

export const add_user = user => ({
  type: ADD_USER,
  mName: user.name,
  mEmail: user.email,
  mPass: user.pass,
});

export const sign_out = () => ({
  type: SIGN_OUT,
  mName: '',
  mEmail: '',
  mPass: '',
});

export const log_in = user => ({
  type: LOG_IN,
  mName: user.name,
  mEmail: user.email,
  mPass: user.pass,
});
