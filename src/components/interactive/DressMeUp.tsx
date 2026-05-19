import React, { useState } from 'react';
import { Box, Typography, Fade } from '@mui/material';
import { motion, PanInfo } from 'framer-motion';

type TopGear = 'none' | 'tshirt' | 'jacket';
type FootGear = 'none' | 'boots' | 'slippers';
type HeadGear = 'none' | 'sunhat' | 'ushanka';
type BottomGear = 'none' | 'shorts' | 'pants';

export interface InteractiveElementProps {
    isHovered?: boolean;
}

const DressMeUp: React.FC<InteractiveElementProps> = ({ isHovered }) => {
    const [top, setTop] = useState<TopGear>('none');
    const [shoes, setShoes] = useState<FootGear>('none');
    const [head, setHead] = useState<HeadGear>('none');
    const [bottom, setBottom] = useState<BottomGear>('none');

    const getSpeechBubble = () => {
        if (head === 'ushanka' && bottom === 'shorts') return "Шорты и ушанка? Закаляем уши, греем ноги? Что за стиль уличного фрика? 🤪";
        if (top === 'jacket' && bottom === 'shorts') return "Куртка и шорты? Классический питерский прикид, но для гор не очень! 🌧️";
        if (shoes === 'slippers' && bottom === 'pants') return "Штаны и шлепки? Выглядит модно, но на первом же склоне я разуюсь! 👟";
        if (shoes === 'slippers') return "В шлепках по скалам?! Я себе все ноги переломаю! 🤕";
        if (top === 'jacket') return "Май месяц на дворе, я в этом пуховом балахоне сварюсь! 🥵";
        if (head === 'ushanka') return "Мы на Дарданеллы идем или на Колыму? Сними это! 🐻";
        if (bottom === 'shorts' && shoes === 'boots') return "Ботинки с шортами... Ну, ноги не натру, но комары скажут спасибо! 🦟";

        if (top === 'tshirt' && shoes === 'boots' && head === 'sunhat' && bottom === 'pants') {
            return "Идеально! Защита от солнца, веток и камней. Я готов к Дарданеллам! 😎🔥";
        }

        if (top === 'tshirt' && shoes === 'boots' && bottom === 'pants') return "Почти! Накинь панамку, а то голову напечет ☀️";
        if (top === 'none' && bottom === 'none' && shoes === 'none') return "Холодновато... Перетащи на меня одежду!";

        return "Жду твоего решения... 🤔";
    };

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, type: 'top' | 'shoes' | 'head' | 'bottom', value: string) => {
        if (info.offset.x < -30) {
            if (type === 'top') setTop(value as TopGear);
            if (type === 'shoes') setShoes(value as FootGear);
            if (type === 'head') setHead(value as HeadGear);
            if (type === 'bottom') setBottom(value as BottomGear);
        }
    };

    const DraggableItem = ({ children, type, value, label }: { children: React.ReactNode, type: 'top' | 'shoes' | 'head' | 'bottom', value: string, label: string }) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.div
                drag
                dragSnapToOrigin
                onDragEnd={(e, info) => handleDragEnd(e, info, type, value)}
                whileDrag={{ scale: 1.15, zIndex: 100, cursor: 'grabbing' }}
                style={{
                    cursor: 'grab',
                    width: 44, height: 44,
                    backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: '10px',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    boxShadow: '0 3px 6px rgba(0,0,0,0.1)'
                }}
            >
                {children}
            </motion.div>
            <Typography variant="caption" sx={{ mt: 0.2, fontSize: '0.6rem', fontWeight: 'bold', color: '#555', textAlign: 'center' }}>
                {label}
            </Typography>
        </Box>
    );

    return (
        <Box sx={{
            width: '100%', height: '100%',
            display: 'flex', flexDirection: 'row',
            alignItems: 'center', justifyContent: 'space-evenly',
            p: { xs: 1, md: 3 }, position: 'relative'
        }}>

            {/* ЛЕВАЯ ЧАСТЬ: Персонаж */}
            <Box sx={{ position: 'relative', width: { xs: 130, md: 160 }, height: { xs: 240, md: 280 } }}>

                <Fade in={isHovered}>
                    <Box sx={{
                        position: 'absolute', top: -45, left: { xs: -15, md: -30 }, right: { xs: -50, md: -40 }, zIndex: 10,
                        bgcolor: 'white', p: 1, borderRadius: 2, boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        border: '2px solid #2e7d32', pointerEvents: 'none',
                        '&::after': {
                            content: '""', position: 'absolute', bottom: -8, left: 45,
                            borderWidth: '8px 8px 0', borderStyle: 'solid', borderColor: '#2e7d32 transparent', display: 'block', width: 0
                        }
                    }}>
                        <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '0.65rem', lineHeight: 1.1, display: 'block', textAlign: 'center' }}>
                            {getSpeechBubble()}
                        </Typography>
                    </Box>
                </Fade>

                {/* БАЗОВЫЙ СЛОЙ */}
                <svg viewBox="0 0 200 300" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}>
                    <circle cx="100" cy="40" r="18" fill="#fbc02d" /> {/* Голова */}

                    {/* Руки (кожа) - Раздвинуты шире от тела */}
                    <path d="M 76 75 L 60 155 L 68 157 L 81 80 Z" fill="#fbc02d" /> {/* Левая рука */}
                    <path d="M 124 75 L 140 155 L 132 157 L 119 80 Z" fill="#fbc02d" /> {/* Правая рука */}

                    {/* Круглые ладошки (кулачки) - Сдвинуты вслед за руками */}
                    <circle cx="64" cy="156" r="5.5" fill="#fbc02d" />
                    <circle cx="136" cy="156" r="5.5" fill="#fbc02d" />

                    {/* Ступни (кожа) - Добавлены босые ноги */}
                    <rect x="84" y="268" width="12" height="12" rx="6" fill="#fbc02d" /> {/* Левая ступня */}
                    <rect x="104" y="268" width="12" height="12" rx="6" fill="#fbc02d" /> {/* Правая ступня */}

                    {/* Очки */}
                    <rect x="85" y="32" width="13" height="10" rx="3" fill="#212121" />
                    <rect x="102" y="32" width="13" height="10" rx="3" fill="#212121" />
                    <path d="M 97 35 L 103 35" stroke="#212121" strokeWidth="2.5" />

                    {/* Улыбка */}
                    <path d="M 94 48 Q 100 54 106 48" stroke="#37474f" strokeWidth="2" fill="none" strokeLinecap="round" />

                    {/* Тело и ноги */}
                    <path d="M 80 65 L 120 65 L 123 150 L 115 270 L 102 270 L 102 160 L 98 160 L 98 270 L 85 270 L 77 150 Z" fill="#37474f" />
                </svg>

                {/* ФУТБОЛКА (Поправил форму и горловину) */}
                <svg viewBox="0 0 200 300" style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: 3,
                    transition: 'opacity 0.2s',
                    opacity: top === 'tshirt' ? 1 : 0
                }}>
                    {/* Сама футболка с плавными плечами */}
                    <path d="M 80 65 L 120 65 L 132 85 L 122 92 L 122 92 L 125 152 L 75 152 L 78 92 L 78 92 L 68 85 Z"
                          fill="#ff9800"/>
                    {/* Контрастный вырез горловины, чтобы смотрелось аккуратно */}
                    <path d="M 90 65 Q 100 73 110 65" fill="none" stroke="#e65100" strokeWidth="2"/>
                </svg>

                {/* ПУХОВИК */}
                <svg viewBox="0 0 200 300" style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: 3,
                    transition: 'opacity 0.2s',
                    opacity: top === 'jacket' ? 1 : 0
                }}>
                    <path d="M 75 62 L 125 62 L 138 150 L 125 160 L 125 180 L 75 180 L 75 165 L 62 150 Z"
                          fill="#e53935"/>
                    <line x1="100" y1="65" x2="100" y2="180" stroke="#b71c1c" strokeWidth="3"/>
                </svg>

                {/* ШОРТЫ */}
                <svg viewBox="0 0 200 300" style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: 2,
                    transition: 'opacity 0.2s',
                    opacity: bottom === 'shorts' ? 1 : 0
                }}>
                    <path d="M 78 145 L 122 145 L 125 190 L 103 190 L 103 160 L 97 160 L 97 190 L 75 190 Z" fill="#0288d1" />
                </svg>

                {/* ШТАНЫ */}
                <svg viewBox="0 0 200 300" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 2, transition: 'opacity 0.2s', opacity: bottom === 'pants' ? 1 : 0 }}>
                    <path d="M 78 145 L 122 145 L 125 268 L 101 268 L 101 160 L 99 160 L 99 268 L 75 268 Z" fill="#546e7a" />
                </svg>

                {/* БОТИНКИ */}
                <svg viewBox="0 0 200 300" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 4, transition: 'opacity 0.2s', opacity: shoes === 'boots' ? 1 : 0 }}>
                    <path d="M 83 265 L 103 265 L 105 285 L 80 285 Z" fill="#5d4037" />
                    <path d="M 97 265 L 117 265 L 120 285 L 95 285 Z" fill="#4e342e" />
                </svg>

                {/* ШЛЕПАНЦЫ */}
                <svg viewBox="0 0 200 300" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 4, transition: 'opacity 0.2s', opacity: shoes === 'slippers' ? 1 : 0 }}>
                    <rect x="78" y="275" width="22" height="6" rx="2" fill="#26c6da" />
                    <rect x="100" y="275" width="22" height="6" rx="2" fill="#26c6da" />
                </svg>

                {/* ПАНАМА (Посадили плотнее на голову) */}
                <svg viewBox="0 0 200 300" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 5, transition: 'opacity 0.2s', opacity: head === 'sunhat' ? 1 : 0 }}>
                    <path d="M 62 28 L 138 28 L 120 16 L 80 16 Z" fill="#8bc34a" />
                    <path d="M 80 16 L 120 16 L 112 6 L 88 6 Z" fill="#558b2f" />
                </svg>

                {/* УШАНКА (Опустили ниже, теперь сидит плотно, добавлен мех) */}
                <svg viewBox="0 0 200 300" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 5, transition: 'opacity 0.2s', opacity: head === 'ushanka' ? 1 : 0 }}>
                    <path d="M 76 28 L 124 28 L 124 10 L 76 10 Z" fill="#795548" /> {/* Основа */}
                    <path d="M 72 20 L 80 20 L 80 48 L 72 48 Z" fill="#5d4037" stroke="#3e2723" strokeWidth="1" /> {/* Левое ухо */}
                    <path d="M 118 20 L 126 20 L 126 48 L 118 48 Z" fill="#5d4037" stroke="#3e2723" strokeWidth="1" /> {/* Правое ухо */}
                    <path d="M 82 28 L 118 28 L 118 20 L 82 20 Z" fill="#e0d0cc" /> {/* Пушистый меховой лоб */}
                </svg>

            </Box>

            {/* ПРАВАЯ ЧАСТЬ: Гардероб (Сетка 2x4) */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: { xs: 0.8, md: 1.5 },
                zIndex: 10
            }}>

                <DraggableItem type="top" value="tshirt" label="Футболка">
                    <svg viewBox="0 0 100 100" width="26" height="26"><path d="M 20 20 L 80 20 L 90 50 L 70 50 L 70 90 L 30 90 L 30 50 L 10 50 Z" fill="#ff9800" /></svg>
                </DraggableItem>

                <DraggableItem type="top" value="jacket" label="Пуховик">
                    <svg viewBox="0 0 100 100" width="26" height="26">
                        <path d="M 15 15 L 85 15 L 95 60 L 75 75 L 75 95 L 25 95 L 25 75 L 5 60 Z" fill="#e53935" />
                        <line x1="50" y1="20" x2="50" y2="95" stroke="#b71c1c" strokeWidth="4" />
                    </svg>
                </DraggableItem>

                <DraggableItem type="bottom" value="shorts" label="Шорты">
                    <svg viewBox="0 0 100 100" width="26" height="26"><path d="M 15 20 L 85 20 L 90 70 L 55 70 L 55 45 L 45 45 L 45 70 L 10 70 Z" fill="#0288d1" /></svg>
                </DraggableItem>

                <DraggableItem type="bottom" value="pants" label="Штаны">
                    <svg viewBox="0 0 100 100" width="26" height="26"><path d="M 15 15 L 85 15 L 90 95 L 55 95 L 55 45 L 45 45 L 45 95 L 10 95 Z" fill="#546e7a" /></svg>
                </DraggableItem>

                <DraggableItem type="shoes" value="boots" label="Ботинки">
                    <svg viewBox="0 0 100 100" width="26" height="26"><path d="M 20 50 L 80 50 L 90 90 L 10 90 Z" fill="#5d4037" /></svg>
                </DraggableItem>

                <DraggableItem type="shoes" value="slippers" label="Шлепки">
                    <svg viewBox="0 0 100 100" width="26" height="26">
                        <rect x="15" y="70" width="30" height="10" rx="5" fill="#26c6da" />
                        <rect x="55" y="70" width="30" height="10" rx="5" fill="#26c6da" />
                    </svg>
                </DraggableItem>

                <DraggableItem type="head" value="sunhat" label="Панама">
                    <svg viewBox="0 0 100 100" width="26" height="26">
                        <path d="M 10 50 L 90 50 L 70 30 L 30 30 Z" fill="#8bc34a" />
                        <path d="M 30 30 L 70 30 L 60 10 L 40 10 Z" fill="#558b2f" />
                    </svg>
                </DraggableItem>

                <DraggableItem type="head" value="ushanka" label="Ушанка">
                    <svg viewBox="0 0 100 100" width="26" height="26">
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