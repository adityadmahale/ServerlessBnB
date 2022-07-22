import {
  Button,
  Grid,
  Stack,
  Typography,
  Box,
  styled,
  Container,
} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function TourDetails() {
  const {
    state: { tourPackage },
  } = useLocation()

  const navigate = useNavigate()
  const { name, price, destination } = tourPackage

  const StyledButton = styled(Button)({
    backgroundColor: '#8C522A',
    color: '#fff',
    borderColor: '#8C522A',
    '&:active': {
      backgroundColor: '#8C522A',
    },
    '&:hover': {
      backgroundColor: '#8C522A',
    },
    '&:disabled': {
      backgroundColor: '#dddddd',
    },
  })

  const bookTour = () => {
    toast.success('Tour booked successfully', { position: 'bottom-left' })
    navigate('/')
  }

  return (
    <Container>
      <Grid container my={2} spacing={3}>
        <Grid item xs={12}>
          <Box my={1}>
            <StyledButton
              variant='contained'
              color='secondary'
              component='span'
              onClick={() => navigate(-1)}
            >
              Back
            </StyledButton>
            <Typography my={1} variant='h4'>
              Your recommended tour package
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={6} xs={12}>
          <img
            src='https://source.unsplash.com/random?destinations'
            style={{
              width: '100%',
              maxHeight: '500px',
              maxWidth: '500px',
              height: '100%',
              textAlign: 'center',
            }}
            alt={name}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Stack gap={1}>
            <Typography variant='h5' fontWeight='400'>
              {name}
            </Typography>

            <Typography>
              <strong>Destination </strong> {destination}
            </Typography>

            <Typography>
              <strong>Price </strong> CAD {price}
            </Typography>
          </Stack>
          <Stack direction='row' my={1} spacing={2}>
            <StyledButton onClick={bookTour} variant='contained'>
              Book Tour
            </StyledButton>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}
export default TourDetails
