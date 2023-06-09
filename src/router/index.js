import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import PasswordReset from '../pages/PasswordReset'

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  { name: 'Signup', path: '/signup', component: Signup },
  { name: 'Login', path: '/login', component: Login },
  { name: 'Profile', path: '/profile', component: Profile },
  { name: 'PasswordReset', path: '/passwordreset', component: PasswordReset }
]

export { routes }
