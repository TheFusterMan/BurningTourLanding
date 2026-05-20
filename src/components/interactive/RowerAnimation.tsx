import React, { useRef, useEffect, useState } from 'react';
import { Box, Button, Fade, LinearProgress, Typography } from '@mui/material';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import boatAnimation from '../../animations/boating.json';

export interface InteractiveElementProps {
    isHovered?: boolean;
    onOpenModal?: () => void;
}

const RowerAnimation: React.FC<InteractiveElementProps> = ({ isHovered, onOpenModal }) => {
    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const [progress, setProgress] = useState(0); // Стейт прогресса сплава

    // Управление анимацией и прогрессом
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isHovered) {
            lottieRef.current?.setDirection(1);
            lottieRef.current?.play();

            // Если навели курсор и прогресс меньше 100 — плывем!
            if (progress < 100) {
                interval = setInterval(() => {
                    setProgress(prev => {
                        if (prev >= 100) {
                            clearInterval(interval);
                            return 100; // Доплыли!
                        }
                        return prev + 2; // Прибавляем прогресс
                    });
                }, 50); // Каждые 50мс (до 100 дойдет за 2.5 секунды)
            }
        } else {
            lottieRef.current?.pause();
            clearInterval(interval!);
        }

        return () => clearInterval(interval!);
    }, [isHovered, progress]);

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>

            <Lottie
                lottieRef={lottieRef}
                animationData={boatAnimation}
                autoplay={false}
                loop={true}
                style={{ width: '100%', height: '100%' }}
                rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
            />

            {/* ИНДИКАТОР СПЛАВА (показывается пока плывем) */}
            <Fade in={progress > 0 && progress < 100}>
                <Box sx={{
                    position: 'absolute',
                    bottom: 40, // Подняли выше от нижнего края
                    left: '50%', // Ровно по центру
                    translate: { xs: "-50%", md: "-60%" }, // Сдвиг для идеального центрирования
                    zIndex: 10,
                    width: 'max-content' // Чтобы текст не переносился
                }}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', mb: 0.5, display: 'block', textAlign: 'center' }}>
                        Удерживай курсор, чтобы проплыть порог!
                    </Typography>
                    <LinearProgress variant="determinate" value={progress} color="primary" sx={{ height: 8, borderRadius: 4 }} />
                </Box>
            </Fade>

            {/* НАГРАДА (Кнопка появляется, когда доплыли) */}
            <Fade in={progress === 100}>
                <Box sx={{
                    position: 'absolute',
                    bottom: 40, // Подняли выше от нижнего края
                    left: '50%', // Ровно по центру
                    translate: { xs: "-50%", md: "-60%" }, // Сдвиг для идеального центрирования
                    zIndex: 10,
                    width: 'max-content' // Чтобы текст не переносился
                }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={onOpenModal}
                        sx={{
                            fontWeight: 'bold',
                            borderRadius: 8,
                            px: 4, // Сделали кнопку чуть шире
                            py: 1.5, // И чуть выше
                            boxShadow: '0 4px 15px rgba(255, 152, 0, 0.5)'
                        }}
                    >
                        Порог пройден! Забронировать 🌊
                    </Button>
                </Box>
            </Fade>

        </Box>
    );
};

export default RowerAnimation;