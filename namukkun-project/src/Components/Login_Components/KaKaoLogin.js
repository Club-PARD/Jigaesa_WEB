import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams , useNavigate} from "react-router-dom";
import { getSendCodeAPI } from "../../API/AxiosAPI";
import { useRecoilState } from "recoil";
import { myCode } from "../../Recoil/Atom";

//카카오 로그인을 위해 카카오 로그인 페이지에서 인가코드를 추출해 서버에 보내는 함수
function KaKaoLogin(){
  const [mycode, setMyCode] =useRecoilState(myCode);
  const navigate = useNavigate();
  let state =1;

  const params = new URL(document.location.toString()).searchParams;
  const code = params.get('code');

    const sendCode = async (code) => {
      try {
        const response = await getSendCodeAPI(code);
        console.log("성공",response);
        navigate('/');  // (로그인)성공했을 때 이동할 경로
      } catch (err) {
        //회원가입을 해야하는 경우 지역과 코드를 서버에 보내야해서 인가코드를 atom에 저장함
        if (err.response && err.response.status === 401) {
          setMyCode((mycode) => ({
            ...mycode,
            code: code
          }));
          
          navigate('/selectregion');  // 401 에러(회원가입해야함)일 때 이동할 경로
        } else {
         console.error("에러", err);
        }
      }
    };

  useEffect(()=>{
    if (code && (state===1)) {
      sendCode(code);
      ++state;
    }
  },[])
  
  //아래에 스피너 등의 화면이 보여야 할 것 같음
  return(
    <div >
      로그인 중~~
    </div>
  );
}


export default KaKaoLogin; 