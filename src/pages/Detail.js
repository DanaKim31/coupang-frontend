import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../api/product";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { addReview, getReviews, delReview, updateReview } from "../api/review";
// import { formToJSON } from "axios";

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
    button {
      width: 100%;
    }
  }

  .review-contents {
    margin-top: 30px;
    .review-content {
      margin-top: 15px;
    }
    img {
      width: 200px;
    }
    .btn-container {
      display: flex;
      justify-content: flex-end;
      button {
        margin-left: 5px;
      }
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
  const [images, setImages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [edit, setEdit] = useState(null); // 리뷰 수정

  // ================ 로그인 관련 ================
  const info = useSelector((state) => {
    return state.user;
  });

  // ============= 상품정보 불러오기 ==============
  const productDetailAPI = async () => {
    const response = await getProductDetail(code);
    setProductDetail(response.data);
  };

  // =========== 각 상품 리뷰 불러오기 ===========
  const reviewsAPI = async () => {
    const response = await getReviews(code);
    console.log(response.data);
    setReviews(response.data);
  };

  useEffect(() => {
    productDetailAPI(); // 상품정보 불러오기
    reviewsAPI(); // 리뷰 불러오기
    if (Object.keys(info).length === 0) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      setUser(info);
    }
  }, []);
  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  // ============= 리뷰 등록하기 ==============
  const reviewSubmit = async () => {
    // file이 있기 때문에 그냥 JSON 방식으로는 전송 안됨 > form 태그 사용.
    // form 태그 사용하지 못할 경우 formData에 담아서 보내기
    const formData = new FormData();
    formData.append("id", user.id); // user 정보를 front 단에서 던질 때
    formData.append("prodCode", code); /// useParams로 code 정보 가지고 있음
    formData.append("reviTitle", title);
    formData.append("reviDesc", desc);
    // formData에서 배열에 담을 때 반복문 돌려야 함!
    images.forEach((image, index) => {
      formData.append(`files[${index}]`, image);
    });
    // formData.append("files");
    await addReview(formData);
    setImages([]); // 문제있음!! css로 스타일링 하면 문제가 있는게 아니고 비어지기 때문! (브라우저 보안상 문제 때문)
    setTitle(""); // 등록 후 입력했던 데이터 지우기 > 초기값 설정
    setDesc(""); // 등록 후 입력했던 데이터 지우기 > 초기값 설정
    reviewsAPI(); // 추가 하자마자 리로드 필요없이 바로 등록을 위해 재호출
  };

  const imageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };
  // useEffect(() => {
  //   console.log(images);
  // }, [images]);

  // =========== 각 리뷰 삭제하기 ===========
  const deleteRevi = async (code) => {
    await delReview(code);
    reviewsAPI();
  };

  // =========== 각 리뷰 수정하기 ===========
  const updateRevi = async (review) => {
    setEdit(review);
  };
  // useEffect(() => {
  //   console.log(edit);
  // }, [edit]);

  // 각 리뷰 수정 버튼 > 이미지 선택 시 등록된 이미지 삭제
  const deleteImage = (code) => {
    setEdit((prev) => {
      const images = prev.images.filter((image) => image.reviImgCode !== code);
      return { ...prev, images: images };
    });
  };

  // 수정화면에서 취소 버튼 선택
  const cancel = () => {
    setEdit(null);
  };

  // 수정화면에서 완료 버튼 선택
  const reviewUpdate = async () => {
    // FormData 방식으로 전달
    const formData = new FormData();
    // append로 필요한 값(console에 찍힌 dto 참고) 추가
    formData.append("reviCode", edit.reviCode);
    formData.append("reviTitle", edit.reviTitle);
    formData.append("reviDesc", edit.reviDesc);
    images.forEach((image, index) => {
      console.log(image);
      formData.append(`files[${index}]`, image);
    }); // 새로 추가된 이미지
    formData.append("id", user.id);
    formData.append("prodCode", code);
    edit.images.forEach((image, index) => {
      console.log(image);
      formData.append(`images[${index}]`, image.reviUrl);
    }); // 수정된 이미지
    // updateReview로 formData 값 전달
    await updateReview(formData);
    // images 비우기, edit 비우기
    setImages([]);
    setEdit(null);
    // review 다시 호출
    reviewsAPI();
  };

  // ================= RETURN ==================
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
        <Form.Control
          type="file"
          multiple
          accept="image/*"
          onChange={imageChange}
        />
        <Form.Control
          type="text"
          placeholder="제목 작성"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.Control
          as="textarea"
          placeholder="글 작성"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Button variant="dark" onClick={reviewSubmit}>
          리뷰 작성
        </Button>
      </div>

      <div className="review-contents">
        {reviews?.map((review) => (
          <div key={review.reviCode} className="review-content">
            {edit?.reviCode === review.reviCode ? (
              <>
                {/* 편집목록 */}
                {edit.images.map((image) => (
                  <img
                    key={image.reviImgCode}
                    src={image.reviUrl.replace("D:", "http://localhost:8081")}
                    onClick={() => deleteImage(image.reviImgCode)}
                  />
                ))}
                <Form.Control
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={imageChange}
                />
                <Form.Control
                  type="text"
                  value={edit.reviTitle}
                  onChange={(e) =>
                    setEdit((prev) => ({ ...prev, reviTitle: e.target.value }))
                  }
                />
                <Form.Control
                  as="textarea"
                  value={edit.reviDesc}
                  onChange={(e) =>
                    setEdit((prev) => ({ ...prev, reviDesc: e.target.value }))
                  }
                />
                <div className="btn-container">
                  <Button variant="warning" onClick={reviewUpdate}>
                    완료
                  </Button>
                  <Button variant="danger" onClick={cancel}>
                    취소
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* 리뷰목록 */}
                {review.images?.map((image) => (
                  <img
                    key={image.reviImgCode}
                    src={image.reviUrl?.replace("D:", "http://localhost:8081")}
                  />
                ))}
                <h4>{review.reviTitle}</h4>
                <p>{review.reviDesc}</p>
                <div className="btn-container">
                  <Button variant="warning" onClick={() => updateRevi(review)}>
                    수정
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteRevi(review.reviCode)}
                  >
                    삭제
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </Div>
  );
};

export default Detail;
