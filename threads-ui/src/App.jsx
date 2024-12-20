import {React} from 'react'
import {useQuery} from '@tanstack/react-query'

import {getNewsSources} from './requests'

import NewsBlock from './components/NewsBlock'
import Title from './components/Title'
import Spinner from './components/Spinner'

const App = () => {

  const {isPending: isPendingNewsSource, isError: isErrorNewsSource, data: dataNewsSource} = useQuery({
    queryKey: ['newsSources'],
    queryFn: getNewsSources,
    retry: 1
  })

  if (isPendingNewsSource) {

    return <Spinner />

  }

  if (isErrorNewsSource) {

    return <div>Tietojen haku epäonnistui.</div>

  }

  const newsSources = dataNewsSource.filter((item) => item.active)

  return <>
    <Title
      text="News Threads"
      level={1}
    />
    <NewsBlock
      newsSources={newsSources}
    />

  </>

}


export default App
