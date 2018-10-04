import { combineReducers } from 'redux';

import { user } from './user.reducer';
import { alert } from './alert.reducer';
import { transaction } from './transaction.reducer';

const reducers = combineReducers({
  user,
  alert,
  transaction
});

export default reducers;