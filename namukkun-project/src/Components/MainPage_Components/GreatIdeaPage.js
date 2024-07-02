import styled from 'styled-components';
import { GlobalStyle } from '../../Assets/Style/theme';
import imgcontent from '../../Assets/Img/imgcontent.svg';
import bottombd from '../../Assets/Img/bottombd.svg';
import bottomwd from '../../Assets/Img/bottomwd.svg';

function GreatIdeaPage() {
    return (
        <Container>
            <GlobalStyle/>
            <GreatContentContainer>
                <TextContainer>
                    <LineTextContainer>
                        <Dot></Dot><TopicText>우수사례</TopicText>
                    </LineTextContainer>
                    <LineTextContainer>
                        <TitleText>과거의 성공한 한마디를 확인해보세요.</TitleText>
                    </LineTextContainer>
                </TextContainer>
                <ContentImageContainer>
                    <ContentTextContainer>
                        <ContentTitleText>
                            포항시 버스정류장에 공유우산서비스를 제안합니다.
                        </ContentTitleText>
                        <DetailContainer>
                            <DetailText>작성자</DetailText>
                            <DetailText $color="#5A5A5A">김**님</DetailText>
                        </DetailContainer>
                        <DetailContainer>
                            <DetailText>공감수</DetailText>
                            <DetailText $color="#5A5A5A">1234</DetailText>
                        </DetailContainer>
                        <DetailContainer>
                            <DetailText $paddingright='16px'>응원 한마디</DetailText>
                            <DetailText $color="#5A5A5A">143</DetailText>
                        </DetailContainer>
                    </ContentTextContainer>
                    <ImageContainer>
                        <img src={imgcontent} alt="content image" style={{ width: '234px' }}/>
                    </ImageContainer>
                </ContentImageContainer>
                <ContentImageContainer>
                    <ContentTextContainer>
                        <ContentTitleText>
                            포항시 버스정류장에 공유우산서비스를 제안합니다.
                        </ContentTitleText>
                        <DetailContainer>
                            <DetailText>작성자</DetailText>
                            <DetailText $color="#5A5A5A">김**님</DetailText>
                        </DetailContainer>
                        <DetailContainer>
                            <DetailText>공감수</DetailText>
                            <DetailText $color="#5A5A5A">1234</DetailText>
                        </DetailContainer>
                        <DetailContainer>
                            <DetailText $paddingright='16px'>응원 한마디</DetailText>
                            <DetailText $color="#5A5A5A">143</DetailText>
                        </DetailContainer>
                    </ContentTextContainer>
                    <ImageContainer>
                        <img src={imgcontent} alt="content image" style={{ width: '234px' }}/>
                    </ImageContainer>
                </ContentImageContainer>
            </GreatContentContainer>
            <DuckContainer>
                <BottomBlueDuck><img src={bottombd} alt="content image" style={{ width: '230px' }}/></BottomBlueDuck>
                <BottomWhiteDuck><img src={bottomwd} alt="content image" style={{ width: '494px' }}/></BottomWhiteDuck>
            </DuckContainer>
        </Container>
    );
}

export default GreatIdeaPage;

const Container = styled.div`
    margin-top: 100px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: transparent;
    position: relative;
`;

const GreatContentContainer = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: transparent;
    position: relative;
    z-index: 2;
`;

const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 50px;
`;

const LineTextContainer = styled.div`
    display: flex;
    align-items: center;
    background: transparent;
`;

const TopicText = styled.span`
    color: #005AFF;
    font-family: "Min Sans";
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    margin-bottom: 10px;
`;

const Dot = styled.span`
    width: 27px;
    height: 27px;
    border-radius: 50%;
    background-color: #005AFF;
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 13px;
`;

const TitleText = styled.div`
    color: #191919;
    font-family: "Min Sans";
    font-size: 36px;
    font-style: normal;
    font-weight: 600;
    background: transparent;
`;

const ContentImageContainer = styled.div`
    width: 100%;
    height: 210px;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #DEDEDE;
    background: transparent;
`;

const DetailText = styled.span`
    color: ${(props) => props.$color || '#9D9D9D'};
    font-family: "Min Sans";
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    padding-right: ${(props) => props.$paddingright || '55px'};
    background: transparent;
`;

const DetailContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding-bottom: 18px;
    background: transparent;
`;

const ContentTitleText = styled.div`
    color: #191919;
    font-family: "Min Sans";
    font-size: 26px;
    font-style: normal;
    font-weight: 600;
    padding-bottom: 18px;
    background: transparent;
`;

const ContentTextContainer = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: transparent;
`;

const ImageContainer = styled.div`
    width: 20%;
    height: 210px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: transparent;
`;

const BottomBlueDuck = styled.div`
    margin-left: 193px;
    background: transparent;
`;

const BottomWhiteDuck = styled.div`
    margin-right: 193px;
    background: transparent;
`;

const DuckContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    position: absolute;
    top: calc(100% - 190px); 
    z-index: 1;
    background: transparent;
`;