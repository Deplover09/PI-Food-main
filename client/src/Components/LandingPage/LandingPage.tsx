import React from 'react';
import styles from './LandingPage.module.css'
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className={styles.landingContainer}>
            <div className={styles.welcome}>
                <h1> Welcome to my Pi </h1>
            </div>
            <div className={styles.buttonContainer}>
                <Link to="/Home">
                    <button className={styles.btn}>Home</button>
                </Link>
            </div>
        </div>
    );
}
