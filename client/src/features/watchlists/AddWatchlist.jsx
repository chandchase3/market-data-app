import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addWatchlist } from './watchlistsSlice'
import styles from './watchlists.module.css'

export default function AddWatchlist() {
  const [input, setInput] = useState('')
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.watchlists)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = input.trim()
    if (!name) return

    try {
      const resultAction = await dispatch(addWatchlist(name))
      if (addWatchlist.fulfilled.match(resultAction)) {
        setInput('')
      }
    } catch (err) {
      console.error('Failed to add watchlist:', err)
    }
  }

  return (
    <form className={styles.addWatchlists} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter new watchlist name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add'}
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  )
}
