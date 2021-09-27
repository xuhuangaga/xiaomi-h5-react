const initState = {
  banner: [],
  nav:[],
  new:[],
  recommNav:[],
  recommProduct:[],
  notice:[],
  citys:[],
  area:[],
  storeHome:[],
  detail:{}
}

interface Action {
  type: string,
  data: any
}

const homeReducers = (state = initState, action: Action) => {
  if (action.type === 'banner') {
    return {
      ...state,
      banner: action.data
    }
  }
  if (action.type === 'nav') {
    return {
      ...state,
      nav: action.data
    }
  }
  if (action.type === 'new') {
    return {
      ...state,
      new: action.data
    }
  }
  if (action.type === 'commNav') {
    return {
      ...state,
      recommNav: action.data
    }
  }
  if (action.type === 'commproduct') {
    return {
      ...state,
      recommProduct: action.data
    }
  }
  if (action.type === 'notice') {
    return {
      ...state,
      notice: action.data
    }
  }
  if (action.type === 'citys') {
    return {
      ...state,
      citys: action.data
    }
  }
  if (action.type === 'storeHome') {
    return {
      ...state,
      storeHome: action.data.data.store_type_list[0].store_list
    }
  }
  if (action.type === 'searchArea') {
    return {
      ...state,
      area: action.data.data.area_list
    }
  }
  if (action.type === 'storeDetail') {
    return {
      ...state,
      detail: action.data
    }
  }
  return {
    ...state
  }
}

export default homeReducers