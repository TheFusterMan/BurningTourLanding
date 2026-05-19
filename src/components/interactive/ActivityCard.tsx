import React, { useState } from 'react';
import { Box, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

interface ActivityCardProps {
    title: string;
    description: string;
    isReversed: boolean;
    children: React.ReactNode;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ title, description, isReversed, children }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Подключаем тему MUI для определения размера экрана
    const theme = useTheme();
    // Переменная isMobile будет true, если экран меньше 900px (md)
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Paper
            elevation={isMobile ? 2 : 4} // На мобилках тень поменьше
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            // Добавляем обработку тапов для телефонов (нажал - анимация пошла)
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
            sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 4,
                mb: { xs: 4, md: 6 },
                // На ПК высота фиксированная для эффекта наложения. На мобилках - растягивается по контенту
                height: { xs: 'auto', md: 380 },
                display: 'flex',
                // САМОЕ ГЛАВНОЕ: На мобилках - колонка. На ПК - строка (с учетом шахматного порядка)
                flexDirection: { xs: 'column', md: isReversed ? 'row-reverse' : 'row' },
                bgcolor: '#eaf4fc',
                cursor: 'pointer'
            }}
        >
            {/* НИЖНИЙ СЛОЙ (Или верхний блок на мобилках): АНИМАЦИЯ */}
            <Box
                sx={{
                    width: { xs: '100%', md: '55%' },
                    // На мобилках жестко задаем высоту, чтобы анимации было где рисоваться
                    height: { xs: 250, md: '100%' },
                    position: { xs: 'relative', md: 'absolute' },
                    right: { md: isReversed ? 'auto' : 0 },
                    left: { md: isReversed ? 0 : 'auto' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                }}
            >
                {React.isValidElement(children)
                    ? React.cloneElement(children as React.ReactElement<any>, { isHovered })
                    : children}
            </Box>

            {/* ВЕРХНИЙ СЛОЙ (Или нижний блок на мобилках): ТЕКСТ */}
            <Box
                component={motion.div}
                // На мобилках (isMobile) отключаем движение по оси X. Текст никуда не отъезжает.
                animate={{ x: isMobile ? 0 : (isHovered ? (isReversed ? '40px' : '-40px') : '0px') }}
                transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                sx={{
                    width: { xs: '100%', md: '55%' },
                    height: { xs: 'auto', md: '100%' },
                    position: 'relative',
                    zIndex: 2,
                    bgcolor: 'white',
                    p: { xs: 3, md: 6 }, // На мобилках отступы меньше
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    // Отключаем боковую тень на мобилках, так как блоки стоят друг под другом
                    boxShadow: isMobile ? 'none' : (isReversed ? '15px 0 40px rgba(0,0,0,0.1)' : '-15px 0 40px rgba(0,0,0,0.1)'),
                }}
            >
                <Box sx={{ maxWidth: 400, mx: 'auto', textAlign: { xs: 'center', md: 'left' } }}>
                    <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '1.8rem', md: '2.125rem' } }}>
                        {title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                        {description}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default ActivityCard;