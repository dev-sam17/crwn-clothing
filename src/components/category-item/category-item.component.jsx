import { Link } from 'react-router-dom';

import './category-item.styles.scss'

const CategoryItem = ({ category }) => {
    const { title, imageUrl } = category;
    return (
        <Link to={`shop/${title.toLowerCase()}`} className="category-container">
            <div className='background-image' style={{
                backgroundImage: `url(${imageUrl})`
            }} />
            <div className="category-body-container">
                <h2 style={{ fontStyle: 'bold' }}>{title}</h2>
                <p style={{ fontStyle: 'italic' }}>Show Now</p>
            </div>
        </Link>
    )
}

export default CategoryItem;