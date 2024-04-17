import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../api/product";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { addReview, getReviews } from "../api/review";
import { formToJSON } from "axios";

const Div = styled.div`
  .product-info {
    display: flex;
    img {
      width: 50%;
      margin-right: 20px;
    }
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }

  .review-add {
    margin-top: 20px;

    input {
      margin-bottom: 10px;
    }
    textarea {
      resize: none;
      margin-bottom: 10px;
    }
  }
`;
const Detail = () => {
  const { code } = useParams();
  const [productDetail, setProductDetail] = useState({
    // prodName: "", price: 0, prodPhoto: "",
  }); // 초기값 설정 안해줘도 됨!
  const [user, setUser] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  // 로그인 관련
  const info = useSelector((state) => {
    return state.user;
  });

  const productDetailAPI = async () => {
    const response = await getProductDetail(code);
    setProductDetail(response.data);
  };

  useEffect(() => {
    productDetailAPI();
    if (Object.keys(info).length === 0) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      setUser(info);
    }
  }, []);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  const reviewSubmit = async () => {
    // file이 있기 때문에 그냥 JSON 방식으로는 전송 안됨 > form 태그 사용.
    // form 태그 사용하지 못할 경우 formData에 담아서 보내기
    const formData = new formData();
    formData.append("id", user.id); // user 정보를 front 단에서 던질 때
    formData.append("prodCode", code); /// useParams로 code 정보 가지고 있음
    formData.append("reviTitle");
    formData.append("reviDesc");
    formData.append("files");

    await addReview();
  };

  return (
    <Div key={productDetail.prodCode}>
      <div className="product-info">
        <img
          src={productDetail.prodPhoto?.replace("D:", "http://localhost:8081")}
        />
        <div>
          <h2>{productDetail.prodName}</h2>
          <h3>{productDetail.price}</h3>
        </div>
      </div>
      <div className="review-add">
        {/* 파일이 있기 때문에 form 태그 */}
        <Form.Control type="file" multiple accept="image/*" />
        <Form.Control type="text" placeholder="제목 작성" />
        <Form.Control as="textarea" placeholder="글 작성" />
        <Button onClick={reviewSubmit}>리뷰 작성</Button>
      </div>
    </Div>
  );
};

export default Detail;
