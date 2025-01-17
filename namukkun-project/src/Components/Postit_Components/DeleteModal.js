import React, { useEffect } from "react";
import styled from "styled-components";
import { GlobalStyle } from "../../Assets/Style/theme";
import { deletePostAPI } from "../../API/AxiosAPI";
import { useNavigate } from 'react-router-dom';

function DeleteModal({ isOpen, closeModal, postId, setUpdate, update }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const DeletePostFunc = async (postId) => {
    try {
      const response = await deletePostAPI(postId);
      console.log(response);
      setUpdate(!update);
      closeModal();
      navigate('/mypage'); // 게시물 삭제 후 메인 페이지로 이동
    } catch (error) {
      console.error('게시물 삭제에 실패했습니다:', error);
    }
  };

  return (
    <Background style={{ display: isOpen ? "block" : "none" }} onClick={closeModal}>
      <GlobalStyle />
      <Container onClick={(e) => e.stopPropagation()}>
        <Title>정말 삭제하시겠어요?</Title>
        <Contents>삭제된 글은 다시 불러올 수 없어요.</Contents>
        <BtnContainer>
          <ContinueBtn onClick={closeModal}>취소</ContinueBtn>
          <OutButton onClick={() => DeletePostFunc(postId)}>확인</OutButton>
        </BtnContainer>
      </Container>
    </Background>
  );
}

const Background = styled.div`
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.30);
  z-index: 2000;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
  height: 240px;
  flex-shrink: 0;
  border-radius: 20px;
  background: var(--white-001, #FFF);
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.10);
`;

const Title = styled.div`
  color: var(--gray-008, #191919);
  text-align: center;
  font-family: 'MinSans-Regular';
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px; /* 125% */
  margin-top: 38px;
`;

const Contents = styled.div`
  color: var(--gray-005, #707070);
  text-align: center;
  font-family: 'MinSans-Regular';
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  margin-top: 31px;
  white-space: pre-line;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  gap: 4px;
  margin-top: 46px;
  margin-right: 29px;
`;

const ContinueBtn = styled.button`
  display: flex;
  width: 72px;
  height: 34px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: var(--Corner-Full, 1000px);
  border: 1px solid var(--gray-002, #C7C7C7);
  background: var(--white-001, #FFF);
  color: var(--gray-004, #959595);
  text-align: center;
  font-family: 'MinSans-Regular';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  white-space: nowrap;

  &:hover {
    cursor: pointer;
    background: #F7F7F7;
  }
`;

const OutButton = styled.button`
  display: flex;
  width: 72px;
  height: 34px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: var(--Corner-Full, 1000px);
  background: var(--Main-001, #005AFF);
  margin-right: 20px;
  margin-bottom: 10px;
  color: var(--white-001, #FFF);
  text-align: center;
  font-family: 'MinSans-Regular';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  white-space: nowrap;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

export default DeleteModal;
