import styled from 'styled-components'
import { faBook, faPlus } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { Box, Text, Image, Icon } from '../UI'
import { colors } from '../utils/colors'
import { NONE, SHELF_OPTIONS } from '../utils/constants'
import { useBookList } from '../hooks/useBookList'

const Select = styled.select`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 2;
  opacity: 0;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`

export const Book = ({ book, thumbnail, authorNames, shelf, isSearched }) => {
  const { title, subtitle } = book
  const { handleChangeBookShelf, addBookToList, removeBookFromList } =
    useBookList()

  const handleChange = (newShelf) => {
    if (newShelf === shelf) {
      return
    }

    if (newShelf === NONE) {
      return removeBookFromList(book, shelf)
    }

    if (isSearched && shelf === NONE) {
      return addBookToList(book, newShelf)
    }
    handleChangeBookShelf({ ...book, shelf }, newShelf)
  }

  return (
    <>
      <Box
        position='relative'
        my={30}
        mx={10}
        p={10}
        maxWidth={200}
        minWidth={200}
        borderRadius={5}
        bg={colors.white}
      >
        <Box
          display='inline-flex'
          position='relative'
          overflow='hidden'
          height='15rem'
          mt={-30}
          borderRadius={5}
          boxShadow='0 16px 38px -12px rgb(0 0 0 / 56%), 0 4px 25px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%);'
        >
          <Image
            src={thumbnail}
            width='10rem'
            height='100%'
            mx='auto'
            alt='book image'
          />
        </Box>
        <Box>
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            textAlign='left'
            height='auto'
          >
            <Text color={colors.yellow.dark} fontSize='1' fontWeight='bold'>
              <Icon icon={faBook} mr={2} alt='book icon' />
              {title}
            </Text>

            {subtitle && (
              <Text color={colors.black.default} fontSize='14px'>
                {subtitle}
              </Text>
            )}

            <Text as='span' fontSize='14px'>
              Authors:{' '}
              {authorNames.map(
                (authorName, index) =>
                  `${authorName} ${
                    authorNames.length === index + 1 ? '.' : ', '
                  }`
              )}
            </Text>
          </Box>
        </Box>

        <Box position='absolute' top='200px' right='30px' display='flex'>
          <Select
            value={shelf}
            onChange={(opt) => handleChange(opt.target.value)}
          >
            {SHELF_OPTIONS.map((shelfOption) => (
              <option key={shelfOption.code} value={shelfOption.code}>
                {shelfOption.name}
              </option>
            ))}
          </Select>
          <Box
            bg={colors.blue.default}
            display='flex'
            justifyContent='center'
            borderRadius='100%'
            textAlign='center'
            p={2}
          >
            <Icon icon={faPlus} alt='plus icon' color={colors.white} />
          </Box>
        </Box>
      </Box>
    </>
  )
}

Book.defaultProps = {
  authorNames: [],
  shelf: NONE,
  isSearched: false,
}

Book.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
  }).isRequired,
  authorNames: PropTypes.arrayOf(PropTypes.string),
  thumbnail: PropTypes.string.isRequired,
  shelf: PropTypes.string,
  isSearched: PropTypes.bool,
}
