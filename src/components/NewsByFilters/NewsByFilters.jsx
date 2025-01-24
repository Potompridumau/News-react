import { TOTAL_PAGES } from '../../constant/constant';
import NewsFilters from '../NewsFilters/NewsFilters';
import NewsListWithSkeleton from '../NewsList/NewsList';
import Pagination from '../Pagination/Pagination';

import styles from './styles.module.css'

const NewsByFilters = ({ filters, changeFilter, isLoading, news }) => {


    const handleNextPage = () => {
        if (filters.page_number < TOTAL_PAGES) {
            changeFilter('page_number', filters.page_number + 1)
        }
    }

    const handlePrevPage = () => {
        if (filters.page_number > 1) {
            changeFilter('page_number', filters.page_number - 1)
        }
    }

    const handlePageClick = (pageNumber) => {
        changeFilter('page_number', pageNumber)
    }

    return (
        <section className={styles.section}>
            <NewsFilters filters={filters} changeFilter={changeFilter} />

            <Pagination
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                handlePageClick={handlePageClick}
                totalPages={TOTAL_PAGES}
                currentPage={filters.page_number}
            />

            <NewsListWithSkeleton isLoading={isLoading} news={news} />

            <Pagination
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                handlePageClick={handlePageClick}
                totalPages={TOTAL_PAGES}
                currentPage={filters.page_number}
            />
        </section>
    );
}

export default NewsByFilters;