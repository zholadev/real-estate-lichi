import React from 'react';
import styles from '@/styles/news-page-info.module.sass'
import {IMG} from "@/shared/constants/constants";
import {TagList} from "@/shared/uikit/tags";

/**
 * @author Zholaman Zhumanov
 * @name NewsPageDetail
 * @created 20.09.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function NewsPageDetail(props) {
    const {detailData, i18n} = props

    return (
        <div className={`${styles['news_page_info']} container-lg`}>
            <h2 className={styles['title']}>Ударит ли повышение первоначального взноса по спросу, рассказал глава
                «Дом.РФ»</h2>
            <div className={styles['date']}>12 сентября 2023</div>

            <article className={styles['news_detail_info']}>
               <div>
                   <img src={IMG.templateNewsInfoPage['src']} alt=""/>
                   <TagList i18n={i18n} center/>
               </div>
                <div className={styles['text_content']}>
                    <h4>Мутко призвал не разгонять слухи, чтобы не создавать «горбы» ажиотажного спроса.</h4>
                    <div className={styles['text_divide']}/>
                    <p>Первоначальный взнос по льготной ипотеке планируют повысить до 20%. О том, как это отразится на
                        спросе, рассказал в интервью ТАСС гендиректор «Дом.РФ» Виталий Мутко.</p>
                    <p>За восемь месяцев банки выдали 1,2 млн жилищных кредитов на 4,5 трлн рублей, напомнил Мутко. Это
                        в полтора раза превышает прошлогодний показатель. Накопленный ипотечный портфель очень большой,
                        выдача ипотеки опережает прогнозы. Поэтому на результатах 2023 года это решение не отразится. Он
                        добавил, что спрос на ипотеку подогревается повышением ключевой ставки и девальвацией рубля.
                        Ажиотажным спросом пользуются застройщики, повышая цены на новостройки.</p>
                    <p>До конца года выдача ипотеки с господдержкой сократится. По оценке Мутко, снижение составит
                        примерно 20% от максимумов. Он напомнил, что в середине 2024 года срок действия льготных
                        ипотечных программ завершается. Вероятно, к этому времени правительство предложит другие меры
                        поддержки. Мутко уверен, что повышение первоначального взноса не станет критическим ударом по
                        ипотеке. Таким способом регулятор купирует риск перегрева рынка в условиях, когда доля
                        высокорискованных кредитов выросла.</p>
                    <p>До конца года выдача ипотеки с господдержкой сократится. По оценке Мутко, снижение составит
                        примерно 20% от максимумов. Он напомнил, что в середине 2024 года срок действия льготных
                        ипотечных программ завершается. Вероятно, к этому времени правительство предложит другие меры
                        поддержки. Мутко уверен, что повышение первоначального взноса не станет критическим ударом по
                        ипотеке. Таким способом регулятор купирует риск перегрева рынка в условиях, когда доля
                        высокорискованных кредитов выросла.</p>
                    <p>Глава «Дом.РФ» призвал не разгонять слухи о повышении первоначального взноса и влиянии новой
                        ключевой ставки, чтобы не создавать «горбы» ажиотажного спроса. Он также выразил уверенность в
                        том, что изменение условий ипотеки не отразится на объемах ввода жилья, так как на рынок
                        выводятся девелоперские проекты, запущенные в предыдущие годы. Сейчас динамика ввода жилья
                        совпадает с высоким прошлогодним уровнем. За восемь месяцев было построено около 70 млн кв. м
                        жилой недвижимости. Он добавил, что темпы запусков новых проектов могут замедлиться из-за
                        завершения ряда льготных программ в середине 2024 года, так как девелоперы захотят
                        минимизировать риски.</p>
                </div>
            </article>

            <div className={styles['share_place']}>
                <h4 className={styles['share_text']}>{i18n?.["site"]?.["share_title"]}</h4>
                <i className={styles['share_icon']}/>
            </div>
        </div>
    );
}

export default NewsPageDetail;
