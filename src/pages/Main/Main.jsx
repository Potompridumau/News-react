import { useEffect, useState } from 'react';
import { getNews } from '../../api/apiNews'

import NewsBanner from '../../components/NewsBanner/NewsBanner';
import NewsList from '../../components/NewsList/NewsList'

import styles from './styles.module.css';

const Main = () => {

    const [news, setNews] = useState([])

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await getNews()
                setNews(res.news)
            } catch (error) {
                throw new Error(error)
            }
        }
        fetchNews()
    }, [])
    return (
        <main className={styles.main}>
            {news.length > 0 && <NewsBanner item={news[0]} />}

            <NewsList news={news} />
        </main>
    );
}

export default Main;