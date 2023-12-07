import './category-item.styles.scss'

const CategoryItem = ({ category }) => {
    const { title, imageUrl } = category;
    return (
        <div className="category-container">
            <div className='background-image' style={{
                backgroundImage: `url(${imageUrl})`
            }} />
            <div className="category-body-container">
                <h2 style={{ fontStyle: 'bold'}}>{title}</h2>
                <p style={{ fontStyle: 'italic'}}>Show Now</p>
            </div>
        </div>
    )
}

export default CategoryItem;