import React from 'react';
import styles from '@/styles/apartments-page.module.sass'
import {ConstructorHtml} from "@/entities/constructorHtml";

/**
 * @author Zholaman Zhumanov
 * @created 15.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ResidenceAboutProject(props) {
    const {data} = props

    return (
        <section className={styles['apartment_about_project']}>
           <ConstructorHtml jsonHtmlData={data}/>
        </section>
    );
}

export default ResidenceAboutProject;
