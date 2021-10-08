import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import useDebounce from '../hooks/useDebounce'
import { Box } from '../UI'
import { Input } from '../UI/Input'

export const SearchInput = ({ onSearch }) => {
  const [text, setText] = useState('')
  const handleDelayedSearch = useDebounce(
    (currentText) => onSearch(currentText),
    1000,
    true
  )

  useEffect(() => {
    return handleDelayedSearch.cancel
  }, [])

  const handleChange = (e) => {
    const currentText = e.target.value
    setText(currentText)
    handleDelayedSearch(currentText)
  }

  return (
    <Box width='100%'>
      <Input value={text} onChange={handleChange} />
    </Box>
  )
}

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
}
