import { useEffect, useState } from 'react';
import { getNews } from '../../api/apiNews'

import NewsBanner from '../../components/NewsBanner/NewsBanner';
import NewsList from '../../components/NewsList/NewsList'
import Skeleton from '../../components/Skeleton/Skeleton';

import styles from './styles.module.css';

const Main = () => {

    const [news, setNews] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setIsLoading(true)
                const res = await getNews()
                setNews(res.news)
                setIsLoading(false)
            } catch (error) {
                throw new Error(error)
            }
        }
        fetchNews()
    }, [])
    return (
        <main className={styles.main}>
            {news.length > 0 && !isLoading ?
                <NewsBanner item={news[0]} /> :
                <Skeleton count={1} type={'banner'} />
            }

            {!isLoading ?
                <NewsList news={news} /> :
                <Skeleton count={10} type={'item'} />
            }
        </main>
    );
}

export default Main;