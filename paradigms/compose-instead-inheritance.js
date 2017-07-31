
//Away from mixin
//================

//The original reuse with mixin
//-----------------------------------
function StoreMixin(...stores) {
  var Mixin = {
    getInitialState() {
      return this.getStateFromStores(this.props);
    },
    componentDidMount() {
      stores.forEach(store =>
        store.addChangeListener(this.handleStoresChanged)
      );
      this.setState(this.getStateFromStores(this.props));
    },
    componentWillUnmount() {
      stores.forEach(store =>
        store.removeChangeListener(this.handleStoresChanged)
      );
    },
    handleStoresChanged() {
      if (this.isMounted()) {
        this.setState(this.getStateFromStores(this.props));
      }
    }
  };
  return Mixin;
}

var UserProfilePage = React.createClass({
  mixins: [StoreMixin(UserStore)],
  propTypes: {
    userId: PropTypes.number.isRequired
  },
  getStateFromStores(props) {
    return {
      user: UserStore.get(props.userId)
    }
  }
  render() {
    var { user } = this.state;
    return <div>{user ? user.name : 'Loading'}</div>;
  }
};

//Reuse with composition
// 1. try
//-----------------------------------
const HandleStoreChange = Notified,stores => class extends Component {
    constructor(){
      this.state = {toggle:false};
    }
    render() {
      return <Notified {...this.props} />;
    }
    componentDidMount() {
      stores.forEach(store =>
        store.addChangeListener(this.handleStoresChanged)
      );
    }
    componentWillUnmount() {
      stores.forEach(store =>
        store.removeChangeListener(this.handleStoresChanged)
      );
    }
    handleStoresChanged() {
      this.setState = {toggle:! this.state.toggle};
    }
}

class UserProfilePage2 extends Component {
  render() {
    let user = UserStore.get(props.userId);
    return <div>{user ? user.name : 'Loading'}</div>;
  }
}
UserProfilePage2.propTypes: {
    userId: PropTypes.number.isRequired
  },

const UserProfilePage2 = HandleStoreChange(UserProfilePage2,UserStore);
/*
Problem:
What if there is no change at all because the store already contains the value?

What we need is
 * try to get the value at construction time
 * get be notified if a store changes
*/

//Reuse with composition 1
// 2. try
//-----------------------------------
/*
  We want reuse a behavior attached to life cycle methods
  -> a component is needed

  we want use the getStoreState more times in the life cycle
  -> it must be a parameter
  -> the result must be passed to the wrapped component
     Data passing mechanism in React is property
     The passed data must be transparent for the wrapper
     -> It must be an object which will be merged
        into the properties for the wrapped component

*/

const HandleStoreChange2 = Notified,stores,getStoreState => class extends Component {
    constructor(){
      this.state = getStoreState(this.props);
    }
    render() {
      return <Notified {...this.props} {...this.state}/>;
    }
    componentDidMount() {
      stores.forEach(store =>
        store.addChangeListener(this.handleStoresChanged)
      );
    }
    componentWillUnmount() {
      stores.forEach(store =>
        store.removeChangeListener(this.handleStoresChanged)
      );
    }
    handleStoresChanged() {
      this.setState(getStoreState(this.props));
    }
}

class UserProfilePage3 extends Component {
  render() {
    return <div>{user ? user.name : 'Loading'}</div>;
  }
}
UserProfilePage3.propTypes: {
    userId: PropTypes.number.isRequired,
    user: PropTypes.object
  },

const UserProfilePage3 = HandleStoreChange2(UserProfilePage3,UserStore,
  (props)=>{
    return {user: UserStore.get(props.userId)};
  });
