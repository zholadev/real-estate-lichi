import React from 'react';
import styles from '@/styles/about-page.module.sass'

/**
 * @author Zholaman Zhumanov
 * @created 13.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function AboutTopContent(props) {
    const {i18n} = props

    return (
        <div className={styles['page_top_content']}>
            <p className={styles['left_content']}>
                <span>
                    META TRUST REAL ESTATE BROCKERS LLC — компания по недвижимости, основанная в Дубае, ОАЭ, с 2022 года. Продажа, аренда и управление жилой и коммерческой недвижимостью.
                </span>
            </p>

            <p className={styles['right_content']}>
                <span>
                    Наши специализированные консультанты по недвижимости охватывают все районы Дубая
                    и хорошо осведомлены о новинках рынка; их основная задача – помочь покупателям найти недвижимость в соответствии с их требованиями и бюджетом, а также помочь арендодателям продать или сдать в аренду свою недвижимость. Мы заботимся о том, чтобы обе стороны заключили выгодные соглашения, поскольку мы стремимся укреплять прочные, долгосрочные отношения с нашими клиентами, предоставляя наши безупречные услуги с профессионализмом.
                </span>
            </p>
        </div>
    );
}

export default AboutTopContent;
