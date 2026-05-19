import React, { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText,
    TextField, DialogActions, Button, IconButton, Snackbar, Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

interface BookingModalProps {
    open: boolean;
    onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ open, onClose }) => {
    // Состояние для уведомления об успехе
    const [successOpen, setSuccessOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        // Здесь в будущем будет отправка данных на сервер/в телеграм

        onClose(); // Закрываем модалку
        setSuccessOpen(true); // Показываем сообщение "Успешно"
    };

    return (
        <>
            {/* САМО ОКНО ФОРМЫ */}
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Заявка на горящий тур 🔥
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <form onSubmit={handleSubmit}>
                    <DialogContent dividers>
                        <DialogContentText sx={{ mb: 3 }}>
                            Оставьте свои контакты, и наш менеджер свяжется с вами в течение 10 минут, чтобы подтвердить место в Ущелье Дарданеллы!
                        </DialogContentText>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Ваше имя"
                            type="text"
                            fullWidth
                            variant="outlined"
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="dense"
                            id="phone"
                            label="Номер телефона"
                            type="tel"
                            fullWidth
                            variant="outlined"
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="dense"
                            id="count"
                            label="Количество человек"
                            type="number"
                            slotProps={{ htmlInput: { min: 1, max: 10 } }}
                            defaultValue={1}
                            fullWidth
                            variant="outlined"
                            required
                        />

                    </DialogContent>
                    <DialogActions sx={{ p: 2, px: 3 }}>
                        <Button onClick={onClose} color="inherit" sx={{ fontWeight: 'bold' }}>
                            Отмена
                        </Button>
                        <Button type="submit" variant="contained" color="primary" endIcon={<SendIcon />} sx={{ fontWeight: 'bold', borderRadius: 8 }}>
                            Оставить заявку
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* ВСПЛЫВАЮЩЕЕ УВЕДОМЛЕНИЕ (Snackbar) */}
            <Snackbar
                open={successOpen}
                autoHideDuration={6000}
                onClose={() => setSuccessOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setSuccessOpen(false)} severity="success" sx={{ width: '100%', fontWeight: 'bold' }}>
                    Заявка успешно отправлена! Мы скоро позвоним вам.
                </Alert>
            </Snackbar>
        </>
    );
};

export default BookingModal;