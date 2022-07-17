import { useState } from 'react'
import { Box, Button, Typography, Modal, TextField } from '@mui/material'

import httpClient from '../../../utils/httpClient'

function TourRequest() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [stayDuration, setStayDuration] = useState(0)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const recipientEmail = 'sc529025@dal.ca'
    const { data } = await httpClient.post(
      '/requestTour',
      { stayDuration, recipientEmail },
      { headers: { 'Access-Control-Allow-Origin': true } }
    )
    const { success, tourPackages } = data
    if (success) {
      console.log(tourPackages)
      setStayDuration(0)
      handleClose()
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
              <Button
                fullWidth
                variant='contained'
                color='secondary'
                type='submit'
              >
                Request
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  )
}
export default TourRequest
