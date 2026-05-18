import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';

interface ActivityCardProps {
    title: string;
    description: string;
    isReversed: boolean;
    children: React.ReactNode;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ title, description, isReversed, children }) => {
    // Состояние наведения для всей карточки
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Paper
            elevation={4}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 4,
                mb: 6,
                height: { xs: 'auto', md: 380 }, // Фиксированная высота для ПК, чтобы слои легли ровно
                display: 'flex',
                flexDirection: isReversed ? 'row-reverse' : 'row',
                bgcolor: '#eaf4fc', // Светло-голубой/зеленоватый фон для слоя с анимацией
                cursor: 'pointer' // Показываем, что карточка интерактивная
            }}
        >
            {/* НИЖНИЙ СЛОЙ: АНИМАЦИЯ (Слой 1) */}
            <Box
                sx={{
                    width: { xs: '100%', md: '55%' }, // Занимает половину + чуть-чуть
                    position: { xs: 'relative', md: 'absolute' },
                    right: isReversed ? 'auto' : 0,
                    left: isReversed ? 0 : 'auto',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1, // Под текстом
                }}
            >
                {/* Клонируем элемент, чтобы прокинуть в него наш isHovered */}
                {React.isValidElement(children)
                    ? React.cloneElement(children as React.ReactElement<any>, { isHovered })
                    : children}
            </Box>

            {/* ВЕРХНИЙ СЛОЙ: ТЕКСТ (Слой 2 - "Шторка") */}
            <Box
                component={motion.div}
                // Анимация: отъезжаем на 40px в нужную сторону при наведении
                animate={{ x: isHovered ? (isReversed ? '40px' : '-40px') : '0px' }}
                transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                sx={{
                    width: { xs: '100%', md: '55%' }, // Плашка чуть шире половины, чтобы накрывать анимацию
                    position: 'relative',
                    zIndex: 2, // НАД анимацией
                    bgcolor: 'white',
                    p: { xs: 4, md: 6 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    // Красивая массивная тень, создающая эффект "наслоения"
                    boxShadow: isReversed
                        ? '15px 0 40px rgba(0,0,0,0.1)'
                        : '-15px 0 40px rgba(0,0,0,0.1)',
                }}
            >
                <Box sx={{ maxWidth: 400, mx: 'auto' }}>
                    <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
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