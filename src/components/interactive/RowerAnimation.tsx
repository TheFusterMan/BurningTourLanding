import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import boatAnimation from '../../animations/boating.json';

export interface InteractiveElementProps {
    isHovered?: boolean;
}

const RowerAnimation: React.FC<InteractiveElementProps> = ({ isHovered }) => {
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useEffect(() => {
        if (isHovered) {
            lottieRef.current?.setDirection(1);
            lottieRef.current?.play();
        } else {
            lottieRef.current?.pause();
        }
    }, [isHovered]);

    return (
        // 1. Убрали ограничения ширины (maxWidth). Теперь Box занимает ровно 100% выделенного ему места
        <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Lottie
                lottieRef={lottieRef}
                animationData={boatAnimation}
                autoplay={false}
                loop={true}
                // 2. Растягиваем сам плеер
                style={{ width: '100%', height: '100%' }}
                // 3. МАГИЯ ЗДЕСЬ: заставляем SVG растянуться как фон (cover), обрезая лишнее по краям
                rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
            />
        </Box>
    );
};

export default RowerAnimation;