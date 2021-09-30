import PropTypes from 'prop-types'
import { Box, Text, Image } from '../UI'

export const Book = ({ title, authorName, thumbnail }) => {
  return (
    <Box mr={100} position='relative'>
      <Image src={thumbnail} width='10rem' height='15rem' mx='auto' />
      <Text>{title}</Text>
      <Text>{authorName}</Text>
      <Box position='absolute' bg='red' top='10px' width='10px' height='10px'>
        {title}
      </Box>
    </Box>
  )
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
}
