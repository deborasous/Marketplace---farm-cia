import React from 'react';
import Card from '@mui/material/Card';
import Contaniner from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export const Transferencia = () => {
  return (
    <Card
      sx={{
        margin: 2,
        padding: 2,
      }}
    >
      <Contaniner
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Stack
          component="form"
          sx={{
            width: '50vw',
          }}
          spacing={2}
          noValidate
          autoComplete="off"
        >
          <TextField
            type="text"
            label="Nome / Razão Social"
            variant="standard"
            required
          />
          <TextField label="CPF / CNPJ" variant="standard" required />
          <TextField type="email" label="E-mail" variant="standard" required />
          <TextField type="text" label="Banco" variant="standard" required />
          <TextField
            type="number"
            label="Agência"
            variant="standard"
            required
          />
          <TextField type="text" label="Conta" variant="standard" required />
          <TextField
            type="text"
            label="Tipo de Conta"
            variant="standard"
            required
          />
          {/* <Select label="Selecione o Endereço de Entrega">
                        <MenuItem value={10}></MenuItem>
                        <MenuItem value={10}>Conta Corrente</MenuItem>
                        <MenuItem value={20}>Poupança</MenuItem>
                    </Select> */}

        </Stack>
      </Contaniner>
    </Card>
  );

};
