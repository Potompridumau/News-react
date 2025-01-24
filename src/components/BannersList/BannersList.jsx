
import withSkeleton from '../../helpers/hocs/withSkeleton';
import NewsBannerWithSkeleton from '../NewsBanner/NewsBanner'

import styles from './styles.module.css'

const BannersList = ({ banners }) => {
    return (
        <ul className={styles.banners}>
            {
                banners?.map(banner => (
                    <NewsBannerWithSkeleton key={banner.id} item={banner} />
                ))
            }
        </ul>
    );
}

const BannersListWithSkeleton = withSkeleton(BannersList, 'banner', 6, 'row')

export default BannersListWithSkeleton;