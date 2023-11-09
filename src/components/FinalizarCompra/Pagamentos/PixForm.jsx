import Card from '@mui/material/Card';
import Contaniner from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export const Pix = () => {
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
            type="number"
            label="Celular"
            variant="standard"
            required
          />
          <TextField label="CPF / CNPJ" variant="standard" required />
          <TextField type="email" label="E-mail" variant="standard" required />
        </Stack>
      </Contaniner>
    </Card>
  );
};
