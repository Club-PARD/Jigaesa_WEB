import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { GlobalStyle } from '../../Assets/Style/theme';
import sendbrave from '../../Assets/Img/sendbrave.svg';
import onclicksendbrave from '../../Assets/Img/onclicksendbrave.svg';
import hoversendbrave from '../../Assets/Img/hoversendbrave.svg';
import fileimg from '../../Assets/Img/fileimg.svg';
import { getPost, increaseUpCount, decreaseUpCount, getUserInfo } from '../../API/AxiosAPI'; // API 가져오기

// 이미지 URL을 추출하여 <img> 태그로 변환하고 문단 띄기를 추가하는 함수
const convertTextToImages = (text) => {
    const regex = /\[이미지: (https?:\/\/[^\]]+)\]/g;
    const parts = text.split(regex);
    return parts.map((part, index) =>
        part.startsWith('http') ? (
            `<img key=${index} src=${part} alt=content-${index} style="width: 100%; height: auto;" />`
        ) : (
            part.split('\n').map((line) => `${line}<br />`).join('')
        )
    ).join('');
};

// 텍스트에 태그를 적용하는 함수임
const applyTags = (text) => {
    return convertTextToImages(
        text
            .replace(/\[small\](.*?)\[\/small\]/g, '<h4>$1</h4>')
            .replace(/\[normal\](.*?)\[\/normal\]/g, '<h3>$1</h3>')
            .replace(/\[large\](.*?)\[\/large\]/g, '<h2>$1</h2>')
            .replace(/\[huge\](.*?)\[\/huge\]/g, '<h1>$1</h1>')
            .replace(/\[bold\](.*?)\[\/bold\]/g, '<strong>$1</strong>')
    );
};

// HTML을 React 컴포넌트로 변환하는 함수 
const convertHtmlToReact = (htmlString) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

// 파일 이름을 자르고 형식을 붙여주는 함수
const truncateFileName = (fileName, maxLength) => {
    const fileExtension = fileName.slice(fileName.lastIndexOf('.'));
    const nameWithoutExtension = fileName.slice(0, fileName.lastIndexOf('.'));
    const nameParts = nameWithoutExtension.split('_');
    let truncatedName = nameParts.length > 1 ? nameParts[1] : nameParts[0]; // 첫 번째 언더바 다음의 이름만 사용
    
    // 디코딩
    truncatedName = decodeURIComponent(truncatedName);

    if (truncatedName.length > maxLength) {
        return truncatedName.slice(0, maxLength) + '...' + fileExtension;
    }
    return truncatedName + fileExtension;
};

function DetailContent() {
    // URL 파라미터에서 postId를 가져옴
    const { postId } = useParams();

    // State variables
    const [isClicked, setIsClicked] = useState(false);
    const [activeButton, setActiveButton] = useState('진행중'); // 기본값을 '진행중'으로 설정
    const [sendBraveClicked, setSendBraveClicked] = useState(false); // sendbravebutton 클릭 상태
    const [commentsCount, setCommentsCount] = useState(0); // 한마디 수 상태 추가, 초기값을 0으로 설정
    const [postData, setPostData] = useState(null); // API 데이터를 저장할 상태 추가
    const [isProcessing, setIsProcessing] = useState(false); // 버튼 클릭 중복 방지 상태

    // API 호출을 통해 데이터를 가져옴
    useEffect(() => {
        async function fetchData() {
            const data = await getPost(postId); // URL 파라미터로 ID를 설정
            setPostData(data); // 가져온 데이터를 상태에 저장
            setCommentsCount(data.upCountPost); // postData.upCountPost로 한마디 수 설정

            const userInfo = await getUserInfo();
            if (userInfo.postUpList.includes(Number(postId))) {
                setSendBraveClicked(true); // 좋아요를 누른 상태로 설정
            }
        }
        fetchData(); // fetchData 함수 호출
    }, [postId]);

    // 버튼 클릭 핸들러
    const handleButtonClick = (button) => {
        setActiveButton(button); // 클릭된 버튼을 활성화 상태로 설정
    };

    // sendBrave 버튼 클릭 핸들러
    const handleSendBraveClick = async () => {
        if (isProcessing) return; // 이미 처리 중인 경우 함수 종료
        setIsProcessing(true); // 처리 중 상태로 설정

        try {
            let response;
            if (sendBraveClicked) {
                // 좋아요 취소
                setCommentsCount(prevCount => prevCount - 1); // 한마디 수 즉시 업데이트
                setSendBraveClicked(false); // 좋아요 상태 토글

                response = await decreaseUpCount(postId);
                if (!response[0].state) {
                    // 서버 요청 실패 시 롤백
                    setCommentsCount(prevCount => prevCount + 1);
                    setSendBraveClicked(true);
                }
            } else {
                // 좋아요 추가
                setCommentsCount(prevCount => prevCount + 1); // 한마디 수 즉시 업데이트
                setSendBraveClicked(true); // 좋아요 상태 토글

                response = await increaseUpCount(postId);
                if (!response[0].state) {
                    // 서버 요청 실패 시 롤백
                    setCommentsCount(prevCount => prevCount - 1);
                    setSendBraveClicked(false);
                }
            }
        } catch (error) {
            console.error("Error updating up count:", error);
        } finally {
            setIsProcessing(false); // 처리 완료 상태로 설정
        }
    };

    // 텍스트 길이를 줄여주는 함수
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    const intToRegion = {
        0: '경산시',
        1: '경주시',
        2: '구미시',
        3: '김천시',
        4: '문경시',
        5: '상주시',
        6: '안동시',
        7: '영주시',
        8: '영천시',
        9: '포항시'
    };

    return (
        <div>
            <Container>
                <GlobalStyle />
                {postData && ( // postData가 존재할 때만 렌더링
                    <>
                        <TitleContainer>
                            <TitleText>{postData.title}</TitleText> {/* 제목 표시 */}
                            <DateText>{postData.postTime}</DateText> {/* 날짜 표시 */}
                        </TitleContainer>
                        <StateContainer>
                            <StateBox>
                                <StateInfoContainer>
                                    <StateName>작성자</StateName>
                                    <StateContent>{truncateText(postData.userName, 4)}</StateContent> {/* 작성자 표시 */}
                                </StateInfoContainer>
                                <StateInfoContainer>
                                    <StateName>지역</StateName>
                                    <StateContent>{intToRegion[postData.postLocal]}</StateContent> {/* 지역 표시 */}
                                </StateInfoContainer>
                                <StateInfoContainer>
                                    <StateName2>종료기간</StateName2>
                                    <StateContent>D-{postData.deadLine}</StateContent> {/* 종료기간 표시 */}
                                </StateInfoContainer>
                                <StateInfoContainer>
                                    <StateName3>한마디 수</StateName3>
                                    <StateContent>{postData.comments.length}</StateContent> {/* 한마디 수 표시 */}
                                </StateInfoContainer>
                                <StateInfoContainer>
                                    <StateName>용기 수</StateName>
                                    <StateContent>{commentsCount}</StateContent> {/* 용기 수 표시 */}
                                </StateInfoContainer>
                            </StateBox>
                        </StateContainer>
                        <BackgroundContainer>
                            <BackgroundContent>
                                <BackgroundTitle>제안배경</BackgroundTitle>
                                <BackgroundWriting>
                                    {convertHtmlToReact(applyTags(postData.proBackground))} {/* 제안배경 표시 */}
                                </BackgroundWriting>
                            </BackgroundContent>
                        </BackgroundContainer>
                        <BackgroundContainer>
                            <BackgroundContent>
                                <BackgroundTitle>해결방안</BackgroundTitle>
                                <BackgroundWriting>
                                    {convertHtmlToReact(applyTags(postData.solution))} {/* 해결방안 표시 */}
                                </BackgroundWriting>
                            </BackgroundContent>
                        </BackgroundContainer>
                        <BackgroundContainer>
                            <BackgroundContent>
                                <BackgroundTitle>기대효과</BackgroundTitle>
                                <BackgroundWriting>
                                    {convertHtmlToReact(applyTags(postData.benefit))} {/* 기대효과 표시 */}
                                </BackgroundWriting>
                            </BackgroundContent>
                        </BackgroundContainer>
                        {postData.s3Attachments && postData.s3Attachments.length > 0 && (
                            <FileContainer>
                                {postData.s3Attachments.map((file, index) => (
                                    <FileContent key={index}>
                                        <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
                                            <img src={fileimg} style={{ width: '17px', height: '18px' }} alt="fileimg" />&nbsp;
                                            {truncateFileName(file.fileUrl, 30)}
                                        </a>
                                    </FileContent>
                                ))}
                            </FileContainer>
                        )}
                        <BraveBtuContainer>
                            <SendBraveButton
                                onClick={handleSendBraveClick} // sendBrave 버튼 클릭 시 함수 호출
                                isClicked={sendBraveClicked}
                                disabled={isProcessing} // 처리 중일 때 버튼 비활성화
                            >
                                <img src={sendBraveClicked ? onclicksendbrave : sendbrave} alt="send brave" /> {/* sendBrave 버튼 이미지 변경 */}
                            </SendBraveButton>
                        </BraveBtuContainer>
                    </>
                )}
            </Container>
        </div>
    );
}

export default DetailContent;

// 스타일 컴포넌트 정의
const Container = styled.div`
    width: 684px;
    display: flex;
    flex-direction: column;
`

const TitleContainer = styled.div`
    margin-top: 67px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const TitleText = styled.div`
    width: 403px;
    color: #191919;
    text-align: center;
    font-family: 'MinSans-Regular';
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
`

const DateText = styled.div`
    margin-top: 10px;
    color: var(--gray-006, #575757);
    text-align: center;
    font-family: 'MinSans-Regular';
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 18px */
`

const StateContainer = styled.div`
    margin-top: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const StateBox = styled.div`
    width: 505px;
    display: flex;
    padding: 24px 40px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background-color: #F8FBFF;
    gap: 60px;
`

const StateName = styled.div`
    width: 49px;
    color: #A4BAE1;
    font-family: 'MinSans-Regular';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
`
const StateName2 = styled.div`
    width: 58px;
    color: #A4BAE1;
    font-family: 'MinSans-Regular';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
`

const StateName3 = styled.div`
    width: 62px;
    color: #A4BAE1;
    font-family: 'MinSans-Regular';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
`

const StateContent = styled.div`
    color: #738EBF;
    font-family: 'MinSans-Regular';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
`

const StateInfoContainer = styled.div`
    gap: 13px;
    display: flex;
    flex-direction: column;
`

const BackgroundContainer = styled.div`
    margin-top: 76px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const BackgroundContent = styled.div`
    width: 585px;
    display: flex;
    flex-direction: column;
`

const BackgroundTitle = styled.div`
    padding-bottom: 30px;
    color: var(--gray-007, #393939);
    font-family: 'MinSans-Regular';
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
`

const BackgroundWriting = styled.div`
    padding-bottom: 26px;
    color: var(--gray-006, #575757);
    font-family: 'MinSans-Regular';
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
`

const BraveBtuContainer = styled.div`
    margin-top: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const FileContainer = styled.div`
    margin-top: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const FileContent = styled.div`
    width: 585px;
    height: 38px;
    display: flex;
    align-items: center;
    color: var(--gray-005, #707070);
    font-family: 'MinSans-Regular';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    text-decoration-line: underline;
`

const SendBraveButton = styled.button`
    width: 134px;
    height: 134px;
    border: none;
    background: transparent;
    cursor: pointer;

    &:hover img {
        ${({ isClicked }) => !isClicked && `content: url(${hoversendbrave});`}
    }
`;
