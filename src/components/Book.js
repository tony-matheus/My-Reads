import { faBook } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { Box, Text, Image, Icon } from '../UI'
import { colors } from '../utils/colors'

export const Book = ({ title, authorName, subtitle, thumbnail }) => {
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
          <Image src={thumbnail} width='10rem' height='100%' mx='auto' />
          <Box
            position='absolute'
            bg='red'
            top='10px'
            width='10px'
            height='10px'
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
              <Icon icon={faBook} mr={2} />
              {title}
              {subtitle && (
                <Text color={colors.black.default} fontSize='14px'>
                  {subtitle}
                </Text>
              )}
            </Text>
            <Box>Author: {authorName}</Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

Book.defaultProps = {
  subtitle: '',
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  authorName: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
}
