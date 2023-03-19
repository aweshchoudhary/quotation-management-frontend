import Layout from '@/components/Layout'
import store from '@/redux/store'
import '@/styles/global.css'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }) {
  return <Provider store={store}><Layout><Component {...pageProps} /></Layout></Provider>
}
