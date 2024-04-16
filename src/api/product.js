import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const getCategories = async () => {
  return await instance.get("public/category");
};

// getProduct
export const getProduct = async (page) => {
  return await instance.get("public/product?page=" + page);
};
