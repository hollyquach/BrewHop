import Pagination from 'react-bootstrap/Pagination';
import './List.scss';

const Pages = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
    const pagesCount = Math.ceil(itemsCount / pageSize)
    const pages = [...Array(pagesCount).keys()].map((n) => n + 1)

    return (
        <>
            <br></br>
            <div className="px=3">
                <Pagination size="sm">
                    <Pagination.First
                        onClick={() => onPageChange(1)}
                        disabled={currentPage === 1 ? true : false}
                    />
                    <Pagination.Prev
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1 ? true : false}
                    />
                    {pages.map((page) => (
                        <Pagination.Item
                            key={page}
                            className={page === currentPage ? 'page-item active' : 'page-item'}
                            onClick={() => onPageChange(page)}>
                            {page}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === pagesCount ? true : false}
                    />
                    <Pagination.Last
                        onClick={() => onPageChange(pagesCount)}
                        disabled={currentPage === pagesCount ? true : false}
                    />
                </Pagination>
            </div>
            <br></br>
        </>
    )
}

export default Pages
