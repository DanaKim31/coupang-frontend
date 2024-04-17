import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/public/",
});

export const getCategories = async () => {
  return await instance.get("category");
};

// 페이지별 상품 보기
export const getProduct = async (page) => {
  return await instance.get("product?page=" + page);
};

// 상품 1개 상세
export const getProductDetail = async (code) => {
  return await instance.get("product/" + code);
};
