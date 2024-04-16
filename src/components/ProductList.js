import { getProduct } from "../api/product";
import { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1); // 1 페이지부터
  const [loading, setLoading] = useState(false);

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
        <div key={product.prodCode}>
          <img
            src={product.prodPhoto?.replace("D:", "http://localhost:8081")} // ? : null 인 경우(이미지가 없는 상품) replace 적용 안 함
          />
          <h2>{product.prodName}</h2>
          <p>{product.price}</p>
        </div>
      ))}
    </section>
  );
};

export default ProductList;
