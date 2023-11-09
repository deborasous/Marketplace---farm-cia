import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export const CartaoCredito=() =>{
    return (
        <Card sx={{
            margin: 2,
            padding: 2,
        }}
        >
            <Container
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
                        type='number'
                        label="Número do Cartão"
                        variant="standard"
                        required
                    />
                    <TextField
                        label="Nome no Cartão"
                        variant="standard"
                        required
                    />
                    <TextField
                        type='number'
                        label="Data de Validade"
                        variant="standard"
                        required
                    />
                    <TextField
                        type='number'
                        label="CVV"
                        variant="standard"
                        required
                    />
                </Stack>
            </Container>
        </Card>
    );
}