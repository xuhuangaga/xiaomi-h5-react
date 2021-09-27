const initState = {
  category: [],
  hot:[],
  search:{},
  detail:{},
  recommend:[],
  data:[],
  carList:[]
}

interface Action {
  type: string,
  data: any,
  total:number
}

const productReducers = (state = initState, action: Action) => {
  if (action.type === 'category') {
    return {
      ...state,
      category: action.data
    }
  }
  if (action.type === 'hot') {
    return {
      ...state,
      hot: action.data
    }
  }
  if (action.type === 'search') {
    return {
      ...state,
      search: {
        data:action.data.data,
        total:action.data.total
      }
    }
  }
  if (action.type === 'detail') {
    return {
      ...state,
      detail: action.data
    }
  }
  if (action.type === 'recommend') {
    return {
      ...state,
      recommend: action.data
    }
  }
  if (action.type === 'addCar') {
    return {
      ...state,
      data: action.data
    }
  }
  if (action.type === 'addOrder') {
    return {
      ...state,
      data: action.data
    }
  }
  if (action.type === 'getCar') {
    return {
      ...state,
      carList: action.data
    }
  }
  return {
    ...state
  }
}

export default productReducers