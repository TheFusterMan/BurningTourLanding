import React from 'react';
import { Stack, Grid, Box, Typography, Paper } from '@mui/material';

// 1. Создаем интерфейс для пропсов
interface ActivityCardProps {
    title: string;
    description: string;
    isReversed: boolean;
    children: React.ReactNode;
}

// 2. Указываем React.FC<ActivityCardProps>
const ActivityCard: React.FC<ActivityCardProps> = ({
                                                       title,
                                                       description,
                                                       isReversed,
                                                       children
                                                   }) => {
    return (
        <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 4, mb: 6 }}>
            <Stack
                direction={
                    isReversed
                        ? { xs: 'column', md: 'row-reverse' }
                        : { xs: 'column', md: 'row' }
                }
            >
                <Grid size={{ xs: 12, md: 6 }} sx={{ p: { xs: 4, md: 6 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Текст
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                        {description}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }} sx={{ minHeight: 350, bgcolor: '#f0f4c3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {children}
                </Grid>
            </Stack>
        </Paper>
    );
};

export default ActivityCard;