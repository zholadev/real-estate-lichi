import React from 'react';
import styles from '@/styles/apartments-page.module.sass'

/**
 * @author Zholaman Zhumanov
 * @created 15.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ApartmentAboutProject(props) {
    const {aboutContent} = props

    return (
        <section className={styles['apartment_about_project']}>
            <h2>О проекте</h2>

            <p>Потрясающая жилая башня высотой в 100 этажей станет настоящей жемчужиной среди инвесторов и покупателей,
                предпочитающих недвижимость класса люкс. Здесь будут представлены роскошные и элегантные резиденции.</p>

            <p>Отдельное внимание уделено удобствам: специально
                для резидентов в башне выделено несколько подиумов,
                где представлены оборудованные тренажерные залы, уникальный пейзажный бассейн с невероятным панорамным
                видом
                на горизонт Дубая, SPA-салон, эксклюзивный частный клуб.</p>
        </section>
    );
}

export default ApartmentAboutProject;
