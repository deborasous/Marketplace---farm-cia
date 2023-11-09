import React from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const PageNotFound = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '85vh',
      }}
    >
      <Grid item xs={12} sm={12} textAlign="center">
        <Typography variant="h1">
          <b>404</b>
        </Typography>
        <Typography variant="p" color="text.secondary">
          Isso é um erro.
        </Typography>
        <Typography variant="p" component="div">
          A URL requisitada não foi encontrada, verifique o endereço digitado.
        </Typography>
        <Button
          variant="contained"
          style={{ backgroundColor: 'rgb(32, 193, 148)' }}
          sx={{ mt: 5 }}
          onClick={handleGoBack}
        >
          Voltar
        </Button>
      </Grid>
    </Grid>
  );
};
