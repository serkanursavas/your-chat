import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Home from '../pages/Home'

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  { name: 'Signup', path: '/signup', component: Signup },
  { name: 'Login', path: '/login', component: Login }
]

export { routes }
