import React, { useState } from 'react';
import { Box, Typography, Fade } from '@mui/material';
import { motion, PanInfo } from 'framer-motion';

// Расширяем типы экипировки
type TopGear = 'none' | 'tshirt' | 'jacket';
type FootGear = 'none' | 'boots' | 'slippers';
type HeadGear = 'none' | 'sunhat' | 'ushanka';

export interface InteractiveElementProps {
    isHovered?: boolean;
}

const DressMeUp: React.FC<InteractiveElementProps> = ({ isHovered }) => {
    const [top, setTop] = useState<TopGear>('none');
    const [shoes, setShoes] = useState<FootGear>('none');
    const [head, setHead] = useState<HeadGear>('none');

    // Логика фразочек (обратная связь туристу)
    const getSpeechBubble = () => {
        // Проверка на полную глупость
        if (head === 'ushanka' && shoes === 'slippers') return "Ушанка и шлепки?! Я что, за хлебом вышел или в горы иду? 🤦‍♂️";
        if (top === 'jacket' && shoes === 'slippers') return "Сверху потею, снизу ноги в кровь. Отличный план! 😡";

        // Индивидуальные ошибки
        if (shoes === 'slippers') return "В шлепках по скалам?! Я себе все ноги переломаю! 🤕";
        if (top === 'jacket') return "Май месяц на дворе, я в этом пуховике сварюсь! 🥵";
        if (head === 'ushanka') return "Мы на Дарданеллы идем или на Северный полюс? Сними это! 🐻";

        // Идеальный вариант
        if (top === 'tshirt' && shoes === 'boots' && head === 'sunhat') return "Идеально! Защита от солнца и камней. Я готов! 😎🔥";

        // Промежуточные правильные этапы
        if (top === 'tshirt' && shoes === 'boots') return "Почти готов! Но голову бы от солнца прикрыть ☀️";
        if (top === 'none' && shoes === 'none' && head === 'none') return "Холодновато... Перетащи на меня одежду!";

        return "Жду твоего решения... 🤔";
    };

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, type: 'top' | 'shoes' | 'head', value: string) => {
        // Если перетащили влево (к человечку)
        if (info.offset.x < -40) {
            if (type === 'top') setTop(value as TopGear);
            if (type === 'shoes') setShoes(value as FootGear);
            if (type === 'head') setHead(value as HeadGear);
        }
    };

    const DraggableItem = ({ children, type, value, label }: { children: React.ReactNode, type: 'top' | 'shoes' | 'head', value: string, label: string }) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', m: 1 }}>
            <motion.div
                drag
                dragSnapToOrigin
                onDragEnd={(e, info) => handleDragEnd(e, info, type, value)}
                whileDrag={{ scale: 1.2, zIndex: 100, cursor: 'grabbing' }}
                style={{
                    cursor: 'grab', width: 50, height: 50,
                    backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '10px',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
            >
                {children}
            </motion.div>
            <Typography variant="caption" sx={{ mt: 0.5, fontSize: '0.65rem', fontWeight: 'bold', color: '#555' }}>{label}</Typography>
        </Box>
    );

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center', p: 2, position: 'relative' }}>
            {/* ЛЕВАЯ ЧАСТЬ: Персонаж */}
            <Box sx={{
                position: 'relative',
                width: { xs: 150, md: 180 }, // Чуть уже на мобилках
                height: 280,
                mr: { xs: 1, md: 4 }
            }}>

                <Fade in={isHovered}>
                    <Box sx={{
                        position: 'absolute',
                        top: -50,
                        // Сдвигаем облачко, чтобы оно не вылетало за край экрана на мобилках
                        left: { xs: 0, md: -40 },
                        right: { xs: -80, md: -60 },
                        zIndex: 10,
                        bgcolor: 'white', p: 1, borderRadius: 2, boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        border: '2px solid #2e7d32', pointerEvents: 'none',
                        '&::after': {
                            content: '""', position: 'absolute', bottom: -8, left: 60,
                            borderWidth: '8px 8px 0', borderStyle: 'solid', borderColor: '#2e7d32 transparent', display: 'block', width: 0
                        }
                    }}>
                        <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '0.7rem', lineHeight: 1.1, display: 'block', textAlign: 'center' }}>
                            {getSpeechBubble()}
                        </Typography>
                    </Box>
                </Fade>

                {/* БАЗОВЫЙ СЛОЙ */}
                <svg viewBox="0 0 200 300" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}>
                    <circle cx="100" cy="40" r="25" fill="#fbc02d" />
                    <rect x="85" y="30" width="30" height="15" rx="5" fill="#ffffff" stroke="#333" strokeWidth="3" />
                    <path d="M 80 70 L 120 70 L 125 160 L 110 280 L 90 280 L 75 160 Z" fill="#37474f" />
                </svg>

                {/* ФУТБОЛКА */}
                <svg viewBox="0 0 200 300" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 2, transition: 'opacity 0.3s', opacity: top === 'tshirt' ? 1 : 0 }}>
                    <path d="M 70 70 L 130 70 L 135 120 L 120 120 L 120 165 L 80 165 L 80 120 L 65 120 Z" fill="#ff9800" />
                </svg>

                {/* ПУХОВИК */}
                <svg viewBox="0 0 200 300" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 3, transition: 'opacity 0.3s', opacity: top === 'jacket' ? 1 : 0 }}>
                    <path d="M 60 65 L 140 65 L 150 160 L 125 180 L 125 190 L 75 190 L 75 180 L 50 160 Z" fill="#e53935" />
                    <line x1="100" y1="70" x2="100" y2="190" stroke="#b71c1c" strokeWidth="4" />
                </svg>

                {/* БОТИНКИ */}
                <svg viewBox="0 0 200 300" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 4, transition: 'opacity 0.3s', opacity: shoes === 'boots' ? 1 : 0 }}>
                    <path d="M 80 270 L 100 270 L 105 290 L 75 290 Z" fill="#5d4037" />
                    <path d="M 100 270 L 120 270 L 125 290 L 95 290 Z" fill="#4e342e" />
                </svg>

                {/* ШЛЕПАНЦЫ */}
                <svg viewBox="0 0 200 300" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 4, transition: 'opacity 0.3s', opacity: shoes === 'slippers' ? 1 : 0 }}>
                    <rect x="75" y="280" width="25" height="6" rx="3" fill="#03a9f4" />
                    <rect x="100" y="280" width="25" height="6" rx="3" fill="#03a9f4" />
                </svg>

                {/* ПАНАМА ОТ СОЛНЦА */}
                <svg viewBox="0 0 200 300" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 5, transition: 'opacity 0.3s', opacity: head === 'sunhat' ? 1 : 0 }}>
                    <path d="M 60 20 L 140 20 L 120 5 L 80 5 Z" fill="#8bc34a" /> {/* Поля */}
                    <path d="M 75 5 L 125 5 L 115 -10 L 85 -10 Z" fill="#558b2f" /> {/* Верхняя часть */}
                </svg>

                {/* УШАНКА */}
                <svg viewBox="0 0 200 300" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 5, transition: 'opacity 0.3s', opacity: head === 'ushanka' ? 1 : 0 }}>
                    <path d="M 75 15 L 125 15 L 125 -5 L 75 -5 Z" fill="#795548" /> {/* Основа */}
                    <path d="M 70 10 L 80 10 L 80 40 L 70 40 Z" fill="#5d4037" /> {/* Левое ухо */}
                    <path d="M 120 10 L 130 10 L 130 40 L 120 40 Z" fill="#5d4037" /> {/* Правое ухо */}
                </svg>

            </Box>

            {/* ПРАВАЯ ЧАСТЬ: Гардероб (Сетка 2x3) */}
            <Box sx={{
                display: 'grid',
                // На мобилках 3 ряда по 2 колонки, на ПК - как влезет
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: { xs: 0.5, md: 1 },
                zIndex: 10
            }}>

                <DraggableItem type="top" value="tshirt" label="Футболка">
                    <svg viewBox="0 0 100 100" width="30" height="30"><path d="M 20 20 L 80 20 L 90 50 L 70 50 L 70 90 L 30 90 L 30 50 L 10 50 Z" fill="#ff9800" /></svg>
                </DraggableItem>

                <DraggableItem type="top" value="jacket" label="Пуховик">
                    <svg viewBox="0 0 100 100" width="30" height="30">
                        <path d="M 15 15 L 85 15 L 95 60 L 75 75 L 75 95 L 25 95 L 25 75 L 5 60 Z" fill="#e53935" />
                        <line x1="50" y1="20" x2="50" y2="95" stroke="#b71c1c" strokeWidth="4" />
                    </svg>
                </DraggableItem>

                <DraggableItem type="shoes" value="boots" label="Ботинки">
                    <svg viewBox="0 0 100 100" width="30" height="30"><path d="M 20 50 L 80 50 L 90 90 L 10 90 Z" fill="#5d4037" /></svg>
                </DraggableItem>

                <DraggableItem type="shoes" value="slippers" label="Шлепанцы">
                    <svg viewBox="0 0 100 100" width="30" height="30">
                        <rect x="15" y="70" width="30" height="10" rx="5" fill="#03a9f4" />
                        <rect x="55" y="70" width="30" height="10" rx="5" fill="#03a9f4" />
                    </svg>
                </DraggableItem>

                <DraggableItem type="head" value="sunhat" label="Панама">
                    <svg viewBox="0 0 100 100" width="30" height="30">
                        <path d="M 10 50 L 90 50 L 70 30 L 30 30 Z" fill="#8bc34a" />
                        <path d="M 30 30 L 70 30 L 60 10 L 40 10 Z" fill="#558b2f" />
                    </svg>
                </DraggableItem>

                <DraggableItem type="head" value="ushanka" label="Ушанка">
                    <svg viewBox="0 0 100 100" width="30" height="30">
                        <path d="M 25 40 L 75 40 L 75 10 L 25 10 Z" fill="#795548" />
                        <path d="M 15 35 L 30 35 L 30 80 L 15 80 Z" fill="#5d4037" />
                        <path d="M 70 35 L 85 35 L 85 80 L 70 80 Z" fill="#5d4037" />
                    </svg>
                </DraggableItem>

            </Box>
        </Box>
    );
};

export default DressMeUp;