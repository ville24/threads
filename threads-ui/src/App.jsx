import {React} from 'react'

import NewsBlock from './components/NewsBlock'
import Title from './components/Title'
import './App.css'

const App = () => <>
  <Title
    text="News Threads"
    level={1}
  />
  <NewsBlock />

</>


export default App
