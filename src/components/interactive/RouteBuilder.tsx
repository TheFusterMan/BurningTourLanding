import React, { useState } from 'react';
import { Box } from '@mui/material';

interface RouteBuilderProps {
    onRouteComplete?: (route: number[]) => void;
    onPointSelect?: (pointId: number) => void;
    onOpenModal: () => void;
}

interface RoutePoint {
    id: number;
    name: string;
    distance: number;
    icon: string;
    nextPointHint?: string;
}

const routePoints: RoutePoint[] = [
    { id: 1, name: 'Старт', distance: 0, icon: '🏁', nextPointHint: 'Куда дальше? К смотровой!' },
    { id: 2, name: 'Смотровая', distance: 2.5, icon: '📸', nextPointHint: 'Дальше водопад!' },
    { id: 3, name: 'Водопад', distance: 5, icon: '💧', nextPointHint: 'Теперь порог!' },
    { id: 4, name: 'Порог', distance: 8, icon: '🌊', nextPointHint: 'После порога — привал!' },
    { id: 5, name: 'Привал', distance: 11, icon: '🏕️', nextPointHint: 'Остался финиш!' },
    { id: 6, name: 'Финиш', distance: 17, icon: '🏆', nextPointHint: 'Ты у цели!' },
];

const RouteBuilder: React.FC<RouteBuilderProps> = ({ onRouteComplete, onPointSelect, onOpenModal }) => {
    const [selectedPoints, setSelectedPoints] = useState<number[]>([1]);
    const [lastSelected, setLastSelected] = useState<number>(1);
    const [showHint, setShowHint] = useState(false);
    const [hintMessage, setHintMessage] = useState('');

    const togglePoint = (pointId: number) => {
        if ((pointId === 1 || pointId === 6) && selectedPoints.includes(pointId)) {
            return;
        }

        if (selectedPoints.includes(pointId)) {
            setSelectedPoints(selectedPoints.filter(id => id !== pointId));
            return;
        }

        const expectedNext = lastSelected + 1;
        if (pointId !== expectedNext && !selectedPoints.includes(pointId)) {
            const currentPoint = routePoints.find(p => p.id === lastSelected);
            setHintMessage(currentPoint?.nextPointHint || 'Выбери следующую по порядку точку!');
            setShowHint(true);
            setTimeout(() => setShowHint(false), 2000);
            onPointSelect?.(pointId);
            return;
        }

        const newPoints = [...selectedPoints, pointId].sort((a, b) => a - b);
        setSelectedPoints(newPoints);
        setLastSelected(pointId);
        setShowHint(false);
        
        if (pointId === 6) {
            onRouteComplete?.(newPoints);
        }
    };

    const getTotalDistance = (): number => {
        if (selectedPoints.length < 2) return 0;
        const startPoint = routePoints.find(p => p.id === 1);
        const endId = Math.max(...selectedPoints);
        const endPoint = routePoints.find(p => p.id === endId);
        return (endPoint?.distance || 0) - (startPoint?.distance || 0);
    };

    return (
        <Box sx={{
            padding: '16px',
            textAlign: 'center',
            translate: { xs: '0', md: '10%' }
        }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {routePoints.map(point => {
                    const isSelected = selectedPoints.includes(point.id);
                    const isDisabled = point.id !== 1 && point.id !== 6 && isSelected;
                    
                    return (
                        <button
                            key={point.id}
                            onClick={() => togglePoint(point.id)}
                            disabled={isDisabled}
                            style={{
                                padding: '6px 8px',
                                backgroundColor: isSelected ? '#2e7d32' : '#f0f0f0',
                                color: isSelected ? 'white' : '#333',
                                border: isSelected ? 'none' : '1px solid #ddd',
                                borderRadius: '8px',
                                cursor: isDisabled ? 'default' : 'pointer',
                                opacity: isDisabled ? 0.5 : 1,
                                transition: 'all 0.2s',
                                minWidth: '55px'
                            }}
                        >
                            <div style={{ fontSize: '20px' }}>{point.icon}</div>
                            <div style={{ fontSize: '9px' }}>{point.name}</div>
                            <div style={{ fontSize: '8px', color: isSelected ? '#ccc' : '#999' }}>{point.distance} км</div>
                        </button>
                    );
                })}
            </div>

            {showHint && (
                <div style={{
                    backgroundColor: '#fff3cd',
                    padding: '6px',
                    borderRadius: '6px',
                    marginBottom: '12px',
                    fontSize: '12px',
                    color: '#856404'
                }}>
                    💡 {hintMessage}
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ fontSize: '13px' }}>
                    📏 <strong>{getTotalDistance()} км</strong> / 17 км
                </div>
                <div style={{ flex: 1, backgroundColor: '#e0e0e0', borderRadius: '10px', height: '6px' }}>
                    <div style={{
                        width: `${(selectedPoints.length / routePoints.length) * 100}%`,
                        backgroundColor: '#2e7d32',
                        borderRadius: '10px',
                        height: '6px',
                        transition: 'width 0.3s'
                    }} />
                </div>
                <div style={{ fontSize: '13px' }}>
                    ✅ {selectedPoints.length}/{routePoints.length}
                </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'center', marginTop: '24px'}}>
                <button
                    style={{
                        padding: '14px 32px', // Делаем кнопку пухленькой
                        backgroundColor: selectedPoints.length === routePoints.length ? '#ff9800' : '#ccc',
                        color: 'white',
                        border: 'none',
                        borderRadius: '30px', // Делаем овальную форму, как везде на сайте
                        cursor: selectedPoints.length === routePoints.length ? 'pointer' : 'default',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        transition: 'all 0.3s',
                        boxShadow: selectedPoints.length === routePoints.length ? '0 4px 15px rgba(255, 152, 0, 0.4)' : 'none'
                    }}
                    disabled={selectedPoints.length !== routePoints.length}
                    onClick={onOpenModal}
                >
                    {selectedPoints.length === routePoints.length ? '🚀 Отправиться в путь!' : `🔒 Ещё ${routePoints.length - selectedPoints.length} точек`}
                </button>
            </div>
        </Box>
    );
};

export default RouteBuilder;