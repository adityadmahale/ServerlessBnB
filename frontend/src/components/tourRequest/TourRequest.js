import { useState } from 'react'
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  styled,
  CircularProgress,
} from '@mui/material'

import { useNavigate } from 'react-router-dom'

import httpClient from '../../utils/httpClient'
import { toast } from 'react-toastify'

const StyledButton = styled(Button)({
  marginTop: '40px',
  padding: '15px',
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

function TourRequest() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [stayDuration, setStayDuration] = useState(0)

  const navigate = useNavigate()

  const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '0px solid #000',
    borderRadius: '10px',
    boxShadow: 15,
    p: 4,
    width: '40%',
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const recipientEmail = localStorage.getItem('username')
    setLoading(true)
    const { data } = await httpClient.post(
      '/requestTour',
      { stayDuration, recipientEmail },
      { headers: { 'Access-Control-Allow-Origin': true } }
    )
    const { success, tourPackage, message } = data
    setLoading(false)
    if (success) {
      setStayDuration(0)
      handleClose()
      navigate('/tourDetails', { state: { tourPackage } })
    } else {
      toast.error(message, { position: 'bottom-left' })
    }
  }

  return (
    <div>
      <Button style={{ minWidth: '20px' }} color='inherit' onClick={handleOpen}>
        Request Tour
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Request Tour
          </Typography>

          <form onSubmit={onSubmit}>
            <Box my={2}>
              <TextField
                type='number'
                label='Stay Duration in Days'
                fullWidth
                variant='standard'
                onChange={(e) => setStayDuration(e.target.value)}
                name='stayDuration'
                value={stayDuration}
              />
            </Box>

            <Box my={2}>
              <StyledButton
                disabled={loading}
                fullWidth
                variant='contained'
                type='submit'
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ ml: 2 }} />
                ) : (
                  <>Request</>
                )}
              </StyledButton>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  )
}
export default TourRequest
