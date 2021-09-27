import { createStore,combineReducers ,applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import home from '../store/reducers/home'
import product from '../store/reducers/product'
import user from '../store/reducers/user'


export default function configStore () {
  const store = createStore(combineReducers({home,product,user}),applyMiddleware(thunkMiddleware))
  return store
}
