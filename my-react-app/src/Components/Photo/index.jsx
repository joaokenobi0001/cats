import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../Utils/useFetch'
//import { getPosts } from '../../api/cats'
import ErrorMsg from '../ErrorMsg'
import Loading from '../Loading'
import PhotoContent from '../PhotoContent'

function Photo() {
  const { id } = useParams()
  const { data, loading, error, request } = useFetch()

  useEffect(() => {
    const { url, options } = getPosts(id)
    request(url, options)
  }, [id, request])

  if (error) return <ErrorMsg error={error} />
  if (loading) return <Loading />
  if (data)
    return (
      <section className='container main-container'>
        <PhotoContent data={data} single={true} />
      </section>
    )
  else return null
}

export default Photo
