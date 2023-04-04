import '../App.css'

import Layout from '../components/UI/Layout'
import Aside from '../components/Aside/Aside'
import Chat from '../components/Chat/Chat'

const Home = () => {
  return (
    <Layout>
      <Aside />
      <Chat />
    </Layout>
  )
}
export default Home
