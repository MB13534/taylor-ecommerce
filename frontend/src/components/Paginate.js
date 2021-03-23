import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ filter, pages, page, isAdmin = false, keyword = "" }) => {
  //only show the links if there is more than one page
  return (
    pages > 1 && (
      <Pagination className="justify-content-center mt-3">
        {/* make pages an array so we can map through it */}
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/products/search/${keyword}/page/${x + 1}/${filter}`
                  : `/products/page/${x + 1}/${filter}`
                : `/admin/productlist/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
