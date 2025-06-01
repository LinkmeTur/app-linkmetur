'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Paper, Typography } from '@mui/material';

const empresas = [
    { id: 1, nome: 'Empresa A', lat: -29.68, lng: -53.81 },
    { id: 2, nome: 'Empresa B', lat: -29.69, lng: -53.78 },
    { id: 3, nome: 'Empresa C', lat: -29.7, lng: -53.82 },
];

export default function MapaEmpresas() {
    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, overflow: 'hidden' }}>
            <Typography variant='h6' fontWeight='bold' color='textPrimary' mb={3}>
                Localização das Empresas
            </Typography>

            <MapContainer style={{ height: '400px', width: '100%' }}>
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

                {empresas.map((empresa) => (
                    <Marker key={empresa.id} position={[empresa.lat, empresa.lng]}>
                        <Popup>{empresa.nome}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </Paper>
    );
}
