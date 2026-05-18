import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Button,
    Box,
    useScrollTrigger
} from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

// Специальный компонент MUI для добавления тени при скролле
interface Props {
    children: React.ReactElement;
}
function ElevationScroll(props: Props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 20, // Тень появляется после скролла на 20px
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
        // Добавляем эффект полупрозрачного стекла при скролле
        sx: {
            bgcolor: trigger ? 'rgba(255, 255, 255, 0.95)' : 'white',
            backdropFilter: trigger ? 'blur(10px)' : 'none',
            transition: 'all 0.3s ease-in-out',
            color: 'black'
        }
    } as any);
}

const Header: React.FC = () => {

    // Функция для плавного скролла к секциям
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <ElevationScroll>
            <AppBar position="fixed">
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>

                        {/* ЛОГОТИП */}
                        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <Typography variant="h5" component="div" sx={{ fontWeight: '900', letterSpacing: '-0.5px', color: 'primary.main' }}>
                                WildTours
                            </Typography>
                            <Typography variant="h5" component="div" sx={{ ml: 1 }}>
                                🏕️
                            </Typography>
                        </Box>

                        {/* НАВИГАЦИЯ (Скрываем на мобилках) */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
                            <Button color="inherit" onClick={() => scrollToSection('activities')} sx={{ fontWeight: 500, '&:hover': { color: 'primary.main', bgcolor: 'transparent' } }}>
                                Программа
                            </Button>
                            <Button color="inherit" onClick={() => scrollToSection('reviews')} sx={{ fontWeight: 500, '&:hover': { color: 'primary.main', bgcolor: 'transparent' } }}>
                                Отзывы
                            </Button>
                        </Box>

                        {/* КНОПКА ДЕЙСТВИЯ */}
                        <Button
                            variant="contained"
                            color="secondary"
                            endIcon={<LocalFireDepartmentIcon />}
                            sx={{
                                fontWeight: 'bold',
                                borderRadius: 8,
                                px: { xs: 2, md: 3 },
                                textTransform: 'none',
                                fontSize: '1rem'
                            }}
                        >
                            Забронировать
                        </Button>

                    </Toolbar>
                </Container>
            </AppBar>
        </ElevationScroll>
    );
};

export default Header;