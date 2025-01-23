import { useEffect, useState } from 'react';
import { getCategories, getNews } from '../../api/apiNews'

import NewsBanner from '../../components/NewsBanner/NewsBanner';
import NewsList from '../../components/NewsList/NewsList'
import Skeleton from '../../components/Skeleton/Skeleton';
import Pagination from '../../components/Pagination/Pagination';

import styles from './styles.module.css';
import Categories from '../../components/Categories/Categories';
import Search from '../../components/Search/Search';
import { useDebounce } from '../../helpers/hooks/useDebounce';

const Main = () => {

    const [news, setNews] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [keywords, setKeywords] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = 10
    const pageSize = 10

    const debouncedKeywords = useDebounce(keywords, 1500)

    const fetchNews = async (currentPage) => {
        try {
            setIsLoading(true)
            const res = await getNews({
                page_number: currentPage,
                page_size: pageSize,
                category: selectedCategory === 'All' ? null : selectedCategory,
                keywords: debouncedKeywords
            })
            setNews(res.news)
            setIsLoading(false)
        } catch (error) {
            throw new Error(error)
        }
    }

    const fetchCategories = async () => {
        try {
            const res = await getCategories()
            setCategories(['All', ...res.categories])
        } catch (error) {
            throw new Error(error)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        fetchNews(currentPage)
    }, [currentPage, selectedCategory, debouncedKeywords])

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }



    return (
        <main className={styles.main}>
            <Categories
                categories={categories}
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
            />

            <Search
                keywords={keywords}
                setKeywords={setKeywords}
            />

            {news.length > 0 && !isLoading ?
                <NewsBanner item={news[0]} /> :
                <Skeleton count={1} type={'banner'} />
            }

            <Pagination
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                handlePageClick={handlePageClick}
                totalPages={totalPages}
                currentPage={currentPage}
            />

            {!isLoading ?
                <NewsList news={news} /> :
                <Skeleton count={10} type={'item'} />
            }

            <Pagination
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                handlePageClick={handlePageClick}
                totalPages={totalPages}
                currentPage={currentPage}
            />
        </main>
    );
}

export default Main;