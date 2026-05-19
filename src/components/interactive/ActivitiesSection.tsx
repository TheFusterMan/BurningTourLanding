import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import ActivityCard from './ActivityCard';
import RowerAnimation from './RowerAnimation';
import DressMeUp from './DressMeUp';

// Временные заглушки
const RouteBuilder: React.FC = () => <div>🗺️ Интерактив: Построй маршрут</div>;

interface ActivityData {
    id: number;
    title: string;
    description: string;
    component: React.ReactNode;
}

const activitiesData: ActivityData[] = [
    {
        id: 1,
        title: "🎒 Подготовка к походу",
        description: "Соберите своего персонажа в тур. Выберите правильную экипировку: палатку, спальник и одежду по погоде.",
        component: <DressMeUp />
    },
    {
        id: 2,
        title: "🚣 Сплав по бурной реке",
        description: "Ущелье Дарданеллы славится своими порогами. Почувствуй драйв и проверь себя на прочность. Наведи курсор на блок, чтобы начать сплав!",
        component: <RowerAnimation />
    },
    {
        id: 3,
        title: "Восхождение на вершину",
        description: "Преодолейте горный перевал. Насладитесь видами и чистым воздухом на высоте 2000 метров.",
        component: <RouteBuilder />
    }
];

const ActivitiesSection: React.FC = () => {
    return (
        <Box sx={{ py: 10, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
                <Typography variant="h3" align="center" gutterBottom sx={{ mb: 8, fontWeight: 'bold' }}>
                    Что вас ждет в туре
                </Typography>

                {activitiesData.map((activity, index) => (
                    <ActivityCard
                        key={activity.id}
                        title={activity.title}
                        description={activity.description}
                        isReversed={index % 2 !== 0}
                    >
                        {activity.component}
                    </ActivityCard>
                ))}
            </Container>
        </Box>
    );
};

export default ActivitiesSection;