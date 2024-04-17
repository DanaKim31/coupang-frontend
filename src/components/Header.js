import "../assets/style.css";
import {
  FaBars,
  FaMicrophone,
  FaMagnifyingGlass,
  FaUser,
  FaCartShopping,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import CategoryItem from "./CategoryItem";
import { getCategories } from "../api/product"; // List로 담겨있기 때문에 반복문 돌려야 함 > CategoryItem.js에 담으면 안됨
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // useDispatch : 액션함수 쓰기 위함
import { userSave, userLogout } from "../store/user";

const Header = () => {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState(true);

  // 로그인 관련
  const user = useSelector((state) => {
    return state.user;
  });

  const categoriesAPI = async () => {
    const response = await getCategories();
    setCategories(response.data);
  };

  useEffect(() => {
    categoriesAPI();
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
  }, []);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  // 로그아웃 : localStorage 비우기 + 만들어둔 userLogout 실행
  const logout = (e) => {
    // a 태그의 원래 기능(지정 페이지로 이동)을 막고 시작
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(userLogout());
  };

  return (
    <>
      <div className="tob-bar container">
        <div className="tob-bar-left">
          <a href="#">즐겨찾기</a>
          <a href="#">입점신청</a>
        </div>
        <div className="tob-bar-right">
          {/* 배열이 비어있지 않은 경우, 로그인이 된 경우 */}
          {Object.keys(user).length !== 0 ? (
            <a href="" onClick={logout}>
              로그아웃
            </a>
          ) : (
            <>
              <a href="login">로그인</a>
              <a href="#">회원가입</a>
            </>
          )}

          <a href="#">고객센터</a>
        </div>
      </div>
      <header className="container">
        <div className="category-btn">
          <FaBars />
          <p>카테고리</p>
          <div className="category">
            <div className="category-list">
              {categories.map((category) => (
                <CategoryItem category={category} key={category.cateCode} />
              ))}
            </div>
          </div>
        </div>

        <div className="header-main">
          <div className="header-main-top">
            <a href="#" className="logo">
              <img
                src="https://image7.coupangcdn.com/image/coupang/common/logo_coupang_w350.png"
                alt=""
              />
            </a>
            <form action="">
              <select name="" id="">
                <option value="">전체</option>
                <option value="">여성패션</option>
                <option value="">남성패션</option>
                <option value="">남녀 공용 의류</option>
                <option value="">유아동패션</option>
                <option value="">뷰티</option>
              </select>
              <input type="text" />
              <FaMicrophone />
              <button type="submit">
                <FaMagnifyingGlass />
              </button>
            </form>
            <a href="#" className="header-main-icon">
              <FaUser />
              <p>마이쿠팡</p>
            </a>
            <a href="#" className="header-main-icon">
              <FaCartShopping />
              <p>장바구니</p>
            </a>
          </div>
          <nav className="header-main-bottom">
            <FaChevronLeft onClick={() => setActive(false)} />
            <a href="#" className={active ? "header-main-bottom-right" : ""}>
              <img
                src="https://image6.coupangcdn.com/image/coupang/common/coupang_play_icon@3x.png"
                alt=""
              />
              <span>쿠팡플레이</span>
            </a>
            <a href="#" className={active ? "header-main-bottom-right" : ""}>
              <img
                src="https://image10.coupangcdn.com/image/coupang/rds/logo/xxhdpi/logo_rocket_symbol_large.png"
                alt=""
              />
              <span>로켓배송</span>
            </a>
            <a href="#" className={active ? "header-main-bottom-right" : ""}>
              <img
                src="https://image9.coupangcdn.com/image/coupang/common/pc_header_rocket_fresh_1x.png"
                alt=""
              />
              <span>로켓프레시</span>
            </a>
            <a href="#" className={active ? "header-main-bottom-right" : ""}>
              <img
                src="https://image7.coupangcdn.com/image/coupang/home/icons/Christmas/Christmas_PC_2023.png"
                alt=""
              />
              <span>크리스마스</span>
            </a>
            <a href="#" className={active ? "header-main-bottom-right" : ""}>
              <img
                src="https://image6.coupangcdn.com/image/coupang/common/logoBizonlyBrown.png"
                alt=""
              />
              <span>쿠팡비즈</span>
            </a>
            <a href="#" className={active ? "header-main-bottom-right" : ""}>
              <img
                src="https://image6.coupangcdn.com/image/coupang/home/icons/Overseas.png"
                alt=""
              />
              <span>로켓직구</span>
            </a>
            <a href="#" className={active ? "header-main-bottom-right" : ""}>
              <span>골드박스</span>
            </a>
            <a href="#" className={active ? "header-main-bottom-right" : ""}>
              <span>와우회원할인</span>
            </a>
            <a href="#" className={active ? "header-main-bottom-right" : ""}>
              <span>이벤트/쿠폰</span>
            </a>
            <a href="#" className={active ? "header-main-bottom-right" : ""}>
              <img
                src="https://image10.coupangcdn.com/image/coupang/home/icons/RETURNED_MARKET_B@2x.png"
                alt=""
              />
              <span>반품마켓</span>
            </a>
            <a href="#" className={active ? "header-main-bottom-right" : ""}>
              <img
                src="https://image9.coupangcdn.com/image/coupang/common/icon_government_promotion.png"
                alt=""
              />
              <span>착한상점</span>
            </a>
            <a href="#" className={active ? "header-main-bottom-right" : ""}>
              <span>기획전</span>
            </a>
            <a href="#" className={active ? "header-main-bottom-right" : ""}>
              <img
                src="https://image9.coupangcdn.com/image/coupang/common/icon_travel.png"
                alt=""
              />
              <span>여행/티켓</span>
            </a>
            <FaChevronRight onClick={() => setActive(true)} />
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
