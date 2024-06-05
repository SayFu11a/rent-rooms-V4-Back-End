import React from 'react';
import styles from './About.module.scss';

export const About = () => {
   return (
      <div className={styles.aboutContainer}>
         <h1 className={styles.aboutTitle}>О нас</h1>
         <p className={styles.aboutDescription}>
            Добро пожаловать в нашу инновационную систему бронирования номеров! Мы предоставляем
            уникальную возможность легко и быстро бронировать номера в гостиницах по всему миру.
            Наша платформа создана для того, чтобы ваше путешествие было комфортным и приятным с
            самого начала.
         </p>
         <p className={styles.aboutDescription}>
            В нашем приложении вы сможете просматривать множество вариантов номеров, от уютных
            стандартных до роскошных люксов. Мы объединили лучшие предложения гостиниц, чтобы вы
            могли выбрать именно то, что соответствует вашим потребностям и бюджету. Благодаря
            интуитивно понятному интерфейсу и продуманной навигации, процесс бронирования становится
            простым и удобным.
         </p>
         <p className={styles.aboutDescription}>
            Мы понимаем, что каждый путешественник уникален, поэтому предлагаем гибкие возможности
            поиска и фильтрации номеров по различным критериям. Независимо от того, планируете ли вы
            деловую поездку, романтический уик-энд или семейный отдых, наша система подберет для вас
            наилучшие варианты.
         </p>
         <p className={styles.aboutDescription}>
            Наша команда специалистов всегда готова помочь вам в любой ситуации. Мы обеспечиваем
            круглосуточную поддержку, чтобы ответить на все ваши вопросы и решить любые проблемы,
            которые могут возникнуть. Ваше удовлетворение – наш главный приоритет.
         </p>
         <p className={styles.aboutDescription}>
            Мы постоянно работаем над улучшением нашего сервиса, добавляем новые функции и расширяем
            базу данных гостиниц, чтобы вы могли наслаждаться безупречным опытом бронирования. Мы
            ценим ваше доверие и стремимся сделать ваше путешествие максимально комфортным.
         </p>
         <div className={styles.contactInfo}>
            <h2>Контакты</h2>
            <p>
               Если у вас есть вопросы или вам нужна помощь, пожалуйста, свяжитесь с нашей службой
               поддержки:
            </p>
            <p>
               Телефон: <a href="tel:+79187436779">+7 918 743-67-79</a>
            </p>
            <p>
               Email: <a href="mailto:king777134@gmail.com">king777134@gmail.com</a>
            </p>
            <p>Адрес: RentHotel Кадырова ул, г. Грозный</p>
         </div>
      </div>
   );
};