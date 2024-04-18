import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token"); // 로그인 후 새로고침 시 오류발생하지만 토큰 잘 들어감 > 호출 시 바로 처리하기 위해 getToken에 담고 authorize.interceptors.request.use ~
};

// 인증이 필요없는 RESTful API 가져올 때 기본 루트
const instance = axios.create({
  baseURL: "http://localhost:8080/api/public",
});

// 인증이 필요한 RESTful API 가져올 때 기본 루트
const authorize = axios.create({
  baseURL: "http://localhost:8080/api/",
});

authorize.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// [POST] http://localhost:8080/api/review
// 인증 필요, RequestBody로 데이터 보내야 되는 상황 (body : 쉼표 뒤에 추가)
export const addReview = async (data) => {
  return await authorize.post("review", data);
};

// [GET] http://localhost:8080/api/public/product/47/review
// 인증 필요 없음, 경로에 상품코드 보내야 되는 상황
export const getReviews = async (code) => {
  return await instance.get("product/" + code + "/review");
};

// [DELETE] http://localhost:8080/api/review/{code}
// 인증 필요 없음, 경로에 상품코드 보내야 되는 상황
export const delReview = async (code) => {
  return await authorize.delete("review/" + code);
};

// [PUT] http://localhost:8080/api/review
// 인증 필요, RequestBody로 데이터 보내야 되는 상황 (body : 쉼표 뒤에 추가)
export const updateReview = async (data) => {
  return await authorize.put("review", data);
};
