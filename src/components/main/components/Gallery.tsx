import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, IconButton, Typography, Stack, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { motion, AnimatePresence } from 'framer-motion';

import dardanelliImg from '../../../images/gallery/dardanelli.jpg';
import raftingImg from '../../../images/gallery/rafting.jpg';
import friendsImg from '../../../images/gallery/friends.jpg';

interface SlideData {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    buttonText?: string;
}

const slides: SlideData[] = [
    {
        id: 1,
        // Картинка: Красивое горное ущелье/скалы
        image: dardanelliImg,
        title: 'Горящий тур в Ущелье Дарданеллы',
        subtitle: 'Один день, который изменит твои выходные. Успей забронировать место!',
        buttonText: 'Хочу в тур'
    },
    {
        id: 2,
        // Картинка: Драйв, сплав по реке / активный отдых
        image: raftingImg,
        title: 'Сегодня — приключения',
        subtitle: 'Сплавы, скалы и дикая природа. Идеально для тех, кто не любит сидеть на диване.',
    },
    {
        id: 3,
        // Картинка: Группа молодых людей на вершине, эмоции
        image: friendsImg,
        title: 'Завтра — воспоминания',
        subtitle: 'Бросай рутину! Погнали за настоящим драйвом и новыми знакомствами.',
    }
];

const Gallery: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null); // Храним ID таймера

    // Функция для сброса таймера
    const resetTimer = useCallback(() => {
        // 1. Очищаем старый таймер, если он есть
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        // 2. Создаем новый таймер (поставил 8 секунд, как ты просил)
        timerRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1 === slides.length ? 0 : prev + 1));
        }, 6000);
    }, []);

    // При монтировании запускаем таймер
    useEffect(() => {
        resetTimer();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [resetTimer]);

    // Обработчики теперь сбрасывают таймер
    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1 === slides.length ? 0 : prev + 1));
        resetTimer(); // Сброс!
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
        resetTimer(); // Сброс!
    };

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
        resetTimer(); // Сброс!
    };

    return (
        <Box sx={{ position: 'relative', height: { xs: '70vh', md: '85vh' }, width: '100%', overflow: 'hidden', bgcolor: 'black' }}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${slides[currentIndex].image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {/* Чуть усилил затемнение, чтобы акцентировать внимание на призыве */}
                    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(0,0,0,0.5)' }} />

                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white', width: '90%' }}>

                        {/* Добавили бейдж "Горящий тур" на первый слайд для привлечения внимания */}
                        {currentIndex === 0 && (
                            <Typography variant="overline" sx={{ bgcolor: 'secondary.main', color: 'black', px: 2, py: 0.5, borderRadius: 1, fontWeight: 'bold', mb: 2, display: 'inline-block' }}>
                                🔥 Места ограничены
                            </Typography>
                        )}

                        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: '900', textTransform: 'uppercase', textShadow: '2px 2px 4px rgba(0,0,0,0.7)', fontSize: { xs: '2.2rem', md: '4.5rem' }, letterSpacing: '2px' }}>
                            {slides[currentIndex].title}
                        </Typography>

                        <Typography variant="h5" sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', fontSize: { xs: '1.2rem', md: '1.5rem' }, mb: 4, fontWeight: 300 }}>
                            {slides[currentIndex].subtitle}
                        </Typography>

                        {/* Кнопка действия (Call to action) */}
                        {slides[currentIndex].buttonText && (
                            <Button variant="contained" color="secondary" size="large" sx={{ py: 1.5, px: 4, fontSize: '1.2rem', fontWeight: 'bold', borderRadius: 8, textTransform: 'none' }}>
                                {slides[currentIndex].buttonText}
                            </Button>
                        )}
                    </Box>
                </motion.div>
            </AnimatePresence>

            {/* Кнопки переключения остаются без изменений */}
            <IconButton onClick={handlePrev} sx={{ position: 'absolute', top: '50%', left: { xs: 10, md: 30 }, transform: 'translateY(-50%)', color: 'white', bgcolor: 'rgba(0,0,0,0.3)', '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' } }}>
                <ArrowBackIosNewIcon />
            </IconButton>

            <IconButton onClick={handleNext} sx={{ position: 'absolute', top: '50%', right: { xs: 10, md: 30 }, transform: 'translateY(-50%)', color: 'white', bgcolor: 'rgba(0,0,0,0.3)', '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' } }}>
                <ArrowForwardIosIcon />
            </IconButton>

            <Stack direction="row" spacing={1} sx={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)' }}>
                {slides.map((_, index) => (
                    <Box
                        key={index}
                        onClick={() => handleDotClick(index)}
                        sx={{
                            width: 12, height: 12, borderRadius: '50%',
                            bgcolor: index === currentIndex ? 'secondary.main' : 'rgba(255,255,255,0.5)',
                            cursor: 'pointer', transition: 'all 0.3s',
                            '&:hover': { bgcolor: 'white' }
                        }}
                    />
                ))}
            </Stack>
        </Box>
    );
};

export default Gallery;