export const initialUserState = {
  authView: "login",
  loading: false,
  user: null,
  username: "",
  email: "",
  password: "",
  verifyCode: ""
};

const actions = {
  reset: state => () => {
    state = initialUserState;
  },
  update: state => ({ key, val }) => {
    state[key] = val;
  },
  setLoading: state => loading => {
    state.loading = loading;
  },
  setUser: state => user => {
    state.user = user;
  },
  setView: state => view => {
    state.authView = view;
  }
};

export const userReducer = (state, { type, payload }) => {
  actions[type] && actions[type](state)(payload);
};
