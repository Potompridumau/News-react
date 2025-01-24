
import { forwardRef } from 'react';
import styles from './styles.module.css'

const Categories = forwardRef(({ categories, setSelectedCategory, selectedCategory }, ref) => {
    return (
        <div ref={ref} className={styles.categories}>
            <button
                className={!selectedCategory ? styles.active : styles.item}
                onClick={() => setSelectedCategory(null)}
            >
                All
            </button>
            {categories.map(category => {
                return (
                    <button
                        className={selectedCategory === category ? styles.active : styles.item}
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                )
            })}
        </div>
    );
})

Categories.displayName = 'Categories'

export default Categories;