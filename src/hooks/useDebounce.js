import { useRef, useEffect } from 'react'

export default function useDebounce(callback, timeout) {
  const ref = useRef(null)

  useEffect(() => {
    return () => clearTimeout(ref.current)
  }, [])

  const debounce = (...params) => {
    if (ref.current) clearTimeout(ref.current)
    ref.current = setTimeout(() => callback(...params), timeout)
  }

  return debounce
}
