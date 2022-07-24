import { Box, Typography } from '@mui/material'

function Visualizations() {
  return (
    <Box px={3} height='100vh'>
      <Typography my={2} variant='h5'>
        Visualizations
      </Typography>
      <iframe
        width='100%'
        height='100%'
        src='https://datastudio.google.com/embed/reporting/f0ab2ef4-dbc0-4ed2-82f4-e57edab3e8f7/page/rOXyC'
        frameBorder='0'
        style={{ border: 0 }}
        title='ServerlessBnBVisualizations'
      ></iframe>
    </Box>
  )
}
export default Visualizations
