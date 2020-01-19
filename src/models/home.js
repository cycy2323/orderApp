export default {
  namespace: 'home',

  state: {
    h1: '',
    h2: '',
    text: 'this is the home component'
  },

  subscriptions: {},
  reducers: {
    setTitle1(state, payLoad){
      let _state = JSON.parse(JSON.stringify(state))
      _state.h1 = payLoad.data.h1
      return _state
    },
    setTitle2 (state, payLoad) {
      let _state = JSON.parse(JSON.stringify(state))
      _state.h2 = payLoad.data.h2
      return _state
    }
  },
  effects: {
    *setSyncTitle1({payLoad}, {put,call}) {
      // yield console.log('runrunrurnurnrurnr')
      yield put({
        type: 'setTitle1',
        data: {
          h1: '欢迎大家来到我的pizza屋'
        }
      })
    }
  },
};
