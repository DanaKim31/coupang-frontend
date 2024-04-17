import { getProduct } from "../api/product";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledProduct = styled.div`
  display: flex;
  margin-bottom: 30px;
  cursor: pointer;

  img {
    width: 70%;
  }

  div {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1); // 1 페이지부터
  const [loading, setLoading] = useState(false);
  const detail = (code) => {
    navigate("/" + code); // Detail 컴포넌트로 이동
  };

  const productsAPI = async () => {
    setLoading(true);
    const response = await getProduct(page);
    const newData = response.data;
    console.log("page : " + page);
    setProducts((prev) => [...prev, ...newData]);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    const scroll = () => {
      //   console.log("innerHeight : " + window.innerHeight);
      //   console.log("scrollTop : " + document.documentElement.scrollTop);
      //   console.log("offsetHeight : " + document.documentElement.offsetHeight);

      // innerHeight + scrollTop >= offsetHeight : 스크롤바가 가장 아래일 때(true)
      //   console.log(
      //     window.innerHeight + document.documentElement.scrollTop >=
      //       document.documentElement.offsetHeight
      //   );

      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight &&
        !loading
      ) {
        productsAPI();
      }
    };

    window.addEventListener("scroll", scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, [page, loading]); // page가 바뀔 때, loading이 false 일 때

  return (
    <section className="category-best container">
      {products.map((product) => (
        <StyledProduct
          key={product.prodCode}
          onClick={() => detail(product.prodCode)} // 클릭 시 prodCode도 함께 보냄
        >
          <img
            src={product.prodPhoto?.replace("D:", "http://localhost:8081")} // ? : null 인 경우(이미지가 없는 상품) replace 적용 안 함
          />
          <div>
            <h2>{product.prodName}</h2>
            <p>{product.price}</p>
          </div>
        </StyledProduct>
      ))}
    </section>
  );
};

export default ProductList;
