import React from 'react';
import '../styles/footer.css';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__grid">
                    {/* Колонка 1: О компании */}
                    <div className="footer__column">
                        <h3 className="footer__title">WildTours</h3>
                        <p className="footer__text">
                            Организуем незабываемые путешествия с 2015 года. 
                            Индивидуальный подход к каждому клиенту и лучшие маршруты по всему миру.
                        </p>
                        <div className="footer__social">
                            <a href="#" className="footer__social-link" aria-label="VK">📘</a>
                            <a href="#" className="footer__social-link" aria-label="Telegram">💬</a>
                            <a href="#" className="footer__social-link" aria-label="Instagram">📷</a>
                            <a href="#" className="footer__social-link" aria-label="WhatsApp">📱</a>
                        </div>
                    </div>

                    {/* Колонка 2: Быстрые ссылки */}
                    <div className="footer__column">
                        <h4 className="footer__title">Быстрые ссылки</h4>
                        <ul className="footer__links">
                            <li><a href="#" className="footer__link">О нас</a></li>
                            <li><a href="#" className="footer__link">Туры</a></li>
                            <li><a href="#" className="footer__link">Отзывы</a></li>
                            <li><a href="#" className="footer__link">Контакты</a></li>
                            <li><a href="#" className="footer__link">Блог</a></li>
                        </ul>
                    </div>

                    {/* Колонка 3: Контакты */}
                    <div className="footer__column">
                        <h4 className="footer__title">Контакты</h4>
                        <div className="footer__contact-item">
                            <span className="footer__contact-icon">📍</span>
                            <span>г. Москва, ул. Тверская, 15</span>
                        </div>
                        <div className="footer__contact-item">
                            <span className="footer__contact-icon">📞</span>
                            <a href="tel:+79990000000" className="footer__link">+7 (999) 000-00-00</a>
                        </div>
                        <div className="footer__contact-item">
                            <span className="footer__contact-icon">✉️</span>
                            <a href="mailto:info@wildtours.ru" className="footer__link">info@wildtours.ru</a>
                        </div>
                        <div className="footer__contact-item">
                            <span className="footer__contact-icon">🕐</span>
                            <span>Ежедневно: 09:00 - 21:00</span>
                        </div>
                    </div>

                    {/* Колонка 4: Подписка */}
                    <div className="footer__column">
                        <h4 className="footer__title">Подпишитесь</h4>
                        <p className="footer__text">
                            Получайте новости о новых турах и акциях первыми
                        </p>
                        <form className="footer__subscribe-form" onSubmit={(e) => e.preventDefault()}>
                            <input 
                                type="email" 
                                placeholder="Ваш email"
                                className="footer__subscribe-input"
                            />
                            <button 
                                type="submit"
                                className="footer__subscribe-button"
                            >
                                →
                            </button>
                        </form>
                    </div>
                </div>

                {/* Нижняя полоса */}
                <div className="footer__bottom">
                    <p>© {currentYear} WildTours. Все права защищены.</p>
                    <div className="footer__bottom-links">
                        <a href="#" className="footer__bottom-link">Политика конфиденциальности</a>
                        <a href="#" className="footer__bottom-link">Пользовательское соглашение</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;