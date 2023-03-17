import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchImages = async () => {
    console.log('app/fetchImages()')
    let url
    url = `${mainUrl}${clientID}&page=${page}`
    try {
      setLoading(true)
      const response = await fetch(url)
      const data = await response.json()

      setPhotos((prevData) => [...prevData, ...data])
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const initialSearch = async () => {
    console.log('app/searchImages()')
    const url = `${searchUrl}${clientID}&page=1&query=${searchTerm}`
    try {
      setLoading(true)
      const response = await fetch(url)
      const data = await response.json()

      setPhotos(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    } finally {
      setPage(1)
    }
  }

  const searchImages = async () => {
    console.log('app/searchImages()')
    const url = `${searchUrl}${clientID}&page=${page}&query=${searchTerm}`
    try {
      setLoading(true)
      const response = await fetch(url)
      const data = await response.json()

      setPhotos((prevData) => [...prevData, ...data])
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('app/handleSubmit()')
    initialSearch()
  }

  useEffect(() => {
    console.log('there s a searhc term')
    if (searchTerm) {
      searchImages()
    } else {
      fetchImages()
    }
  }, [page])

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if (
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2 &&
        !loading
      ) {
        setPage((p) => p + 1)
      }
      /* How to know if you got to the bottom? 
      window.innerHeight + window.scrollY = document.body.scrollHeight
      */
    })

    return () => {
      window.removeEventListener('scroll', event)
    }
  }, [])

  return (
    <main>
      <section className="search">
        <form action="" onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            className="form-input"
            placeholder="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="submit-btn" type="submit">
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((photo) => (
            <Photo {...photo} key={photo.id} />
          ))}
        </div>
        {loading && <h2 className="loading">Loading...</h2>}
      </section>
    </main>
  )
}

export default App
