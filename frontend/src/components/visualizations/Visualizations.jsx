import { Box, CircularProgress, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Visualizations() {
  const VISUALIZATIONS_GENERATOR_ENDPOINT =
    'https://us-central1-csci5410-a4-355201.cloudfunctions.net/generateVisualizations'
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (
      localStorage.getItem('group29_logged_in') === null ||
      localStorage.getItem('group29_logged_in') === 'false'
    ) {
      navigate('/login')
    } else {
      const generateVisualizations = async () => {
        setLoading(true)
        const {
          data: { success },
        } = await axios.get(VISUALIZATIONS_GENERATOR_ENDPOINT)
        setLoading(false)
        if (!success) {
          toast.error('Error generating latest visualizations')
        }
      }
      generateVisualizations()
    }
  }, [])

  return (
    <Box px={3} height='100vh'>
      <Typography my={2} variant='h5'>
        Visualizations
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <iframe
          width='100%'
          height='100%'
          src='https://datastudio.google.com/embed/reporting/f0ab2ef4-dbc0-4ed2-82f4-e57edab3e8f7/page/rOXyC'
          frameBorder='0'
          style={{ border: 0 }}
          title='ServerlessBnBVisualizations'
        ></iframe>
      )}
    </Box>
  )
}
export default Visualizations
