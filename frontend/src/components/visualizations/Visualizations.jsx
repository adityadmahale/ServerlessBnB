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
        src='https://datastudio.google.com/embed/reporting/966842de-6030-4496-a135-f7a1ef978c85/page/FxVyC'
        frameBorder='0'
        style={{ border: 0 }}
        title='ServerlessBnBVisualizations'
      ></iframe>
    </Box>
  )
}
export default Visualizations
