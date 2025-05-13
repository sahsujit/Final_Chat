import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: 'bold', color: '#343a40' }}>
        404
      </Typography>
      <Typography variant="h6" sx={{ margin: '1rem 0', color: '#6c757d' }}>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/')}
        sx={{ textTransform: 'none', padding: '0.5rem 1.5rem' }}
      >
        Go back to Home
      </Button>
    </Box>
  )
}

export default NotFound