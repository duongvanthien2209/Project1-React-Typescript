import authSaga from 'features/auth/authSaga';
import { filterSaga } from 'features/filter/filterSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([authSaga(), filterSaga()]);
}
