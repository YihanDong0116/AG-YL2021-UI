/*
A modal component (actually a function) created by Matt in May, 2021.
The user can either create a correct or incorrect modal based on the answer of the user.
A correct modal has its own styles and an img of encouragement.
An incorrect modal also has its own styles and have some feedback passed from its parent.
*/
import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

/* **************************Styles using styled-components******************************** */
const ModalContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background:rgba(37, 150, 255, 0.5);
  position: fixed;
`;

const ModalWrapper = styled.div`
  min-width: 330px;
  max-width: 600px;
  min-height: 140px;
  display: grid;
  position: relative;

  background: #FFFFFF;
  border: 4px solid #000000;
  box-sizing: border-box;
  border-radius: 8px;
`;

const HeaderWrapperDefault = styled.div`
  position: relative;
  height: 34px;

  display: flex;
  justify-content: left;
  align-items: center;

  background: #2596FF;
  border-bottom: 4px solid black;
  border-radius: 4px 4px 0px 0px;
  padding: 5px;
`;

const HeaderWrapperCorrect = styled(HeaderWrapperDefault)`
  background: #00D315;
`;

const HeaderWrapperIncorrect = styled(HeaderWrapperDefault)`
  background: #FF4D00;
`;

const ModalHeader = styled.h1`
  margin-left: 5px;
  text-align: center;

  font-weight: bold;
  font-size: 18px;

  color: #FFFFFF;
`;

const ModalContent = styled.div`
  display: relative;
  justify-content: left;
  align-items: top;
  position: relative;
  margin-left: 10px;
  margin-right: 10px;
  text-align: left;
  
  font-size: 16px;

  color: #2B1953;
`;

const SuccessImg = styled.div`
  position: relative;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  align-items: center;
  border-radius: 10px 0 0 10px;
  background: #FFFFFF;
`;

const CloseModalButtonDefault = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  z-index: 10;

  color: #B3DAFF;
  background: #2596FF;
  border: 1.4px solid #B3DAFF;
  box-sizing: border-box;
  border-radius: 3px;

  &:hover {
    color:  #2596FF;
    background: #B3DAFF;
    border: 1.4px solid #2596FF;
  }
`;

const CloseModalButtonCorrect = styled(CloseModalButtonDefault)`
  color: #AAFFB2;
  background: #00D315;
  border-color: #AAFFB2;

  &:hover {
    color: #00D315;
    background: #AAFFB2;
    border-color: #00D315;
  }
`;

const CloseModalButtonIncorrect = styled(CloseModalButtonDefault)`
  color: #FFBEA2;
  background: #FF4D00;
  border-color: #FFBEA2;

  &:hover {
    color: #FF4D00;
    background: #FFBEA2;
    border-color: #FF4D00;
  }
`;

/* **************************Function that  returns a modal******************************* */
export default function Modal({
  title, status, showModal, children, closeModal,
}) {
  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? 'translateY(0%)' : 'translateY(-100%)',
  });

  let modalJsx;
  if (status === 'incorrect') {
    modalJsx = (
      <>
        <HeaderWrapperIncorrect>
          <ModalHeader>{title}</ModalHeader>
        </HeaderWrapperIncorrect>
        <ModalContent>
          {children}
        </ModalContent>
        <CloseModalButtonIncorrect onClick={closeModal} />
      </>
    );
  } else if (status === 'correct') {
    modalJsx = (
      <>
        <HeaderWrapperCorrect>
          <ModalHeader>{title}</ModalHeader>
        </HeaderWrapperCorrect>
        <ModalContent display="none">
          {children}
        </ModalContent>
        <SuccessImg>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.3333 60C43.9813 60 56.6666 47.3147 56.6666 31.6667C56.6666 16.0186 43.9813 3.33334 28.3333 3.33334C12.6852 3.33334 0 16.0186 0 31.6667C0 47.3147 12.6852 60 28.3333 60Z" fill="#FFCC4D" />
            <path d="M29.9984 47.5C31.8393 47.5 33.3317 45.6345 33.3317 43.3333C33.3317 41.0322 31.8393 39.1667 29.9984 39.1667C28.1574 39.1667 26.665 41.0322 26.665 43.3333C26.665 45.6345 28.1574 47.5 29.9984 47.5Z" fill="#664500" />
            <path d="M13.5183 35.6384C13.2205 35.638 12.9282 35.5579 12.6718 35.4063C12.4154 35.2546 12.2043 35.0371 12.0606 34.7762C11.9168 34.5154 11.8455 34.2208 11.8542 33.923C11.8629 33.6253 11.9512 33.3354 12.11 33.0834C13.6367 30.6617 18.2783 26.52 24.9266 28.1467C25.3471 28.2599 25.7066 28.5333 25.9281 28.9082C26.1497 29.2831 26.2156 29.7298 26.112 30.1528C26.0083 30.5757 25.7432 30.9413 25.3734 31.1713C25.0036 31.4013 24.5585 31.4774 24.1333 31.3834C18.1266 29.9134 14.9633 34.81 14.9317 34.86C14.7811 35.0987 14.5725 35.2953 14.3253 35.4314C14.0782 35.5675 13.8005 35.6387 13.5183 35.6384ZM33.4733 29.4017C33.1294 29.402 32.7938 29.2958 32.5125 29.0979C32.2313 28.8999 32.0182 28.6198 31.9025 28.2959C31.7867 27.9721 31.774 27.6203 31.8661 27.2889C31.9581 26.9576 32.1504 26.6628 32.4166 26.445C37.7099 22.105 43.6866 23.8417 46.1083 25.3684C46.4827 25.6035 46.7483 25.9778 46.8468 26.4088C46.9452 26.8398 46.8684 27.2923 46.6333 27.6667C46.3981 28.0411 46.0238 28.3067 45.5928 28.4052C45.1618 28.5036 44.7093 28.4268 44.3349 28.1917C44.1049 28.0517 39.2483 25.1534 34.5283 29.0234C34.2314 29.2684 33.8583 29.4023 33.4733 29.4017Z" fill="#664500" />
            <path d="M22.2433 52.1217C22.0501 52.1217 21.8595 52.077 21.6865 51.991C21.5135 51.905 21.3627 51.7801 21.2461 51.626C21.1295 51.4719 21.0502 51.2929 21.0145 51.103C20.9787 50.9132 20.9874 50.7176 21.04 50.5317C21.7683 47.965 21.47 45.4833 20.2233 43.7217C19.395 42.5517 18.215 41.8367 16.985 41.7583C16.295 41.7167 15.7717 41.1217 15.815 40.4333C15.8583 39.745 16.45 39.1817 17.14 39.265C19.1283 39.3883 20.995 40.4867 22.2617 42.2767C23.9467 44.6583 24.3783 47.915 23.4433 51.2117C23.3697 51.4733 23.2126 51.7038 22.996 51.868C22.7794 52.0322 22.5151 52.1213 22.2433 52.1217ZM40.6383 47.02C40.394 47.0202 40.1552 46.9483 39.9516 46.8133C38.0066 45.53 36.9183 43.285 36.965 40.655C37.0133 37.93 38.3133 35.4 40.2716 34.2067C40.4117 34.121 40.5673 34.0639 40.7295 34.0386C40.8918 34.0133 41.0574 34.0203 41.2169 34.0592C41.3764 34.0981 41.5266 34.1681 41.659 34.2651C41.7914 34.3622 41.9033 34.4845 41.9883 34.625C42.0739 34.7651 42.131 34.9207 42.1563 35.0829C42.1816 35.2451 42.1746 35.4107 42.1358 35.5702C42.0969 35.7297 42.0269 35.88 41.9298 36.0124C41.8327 36.1448 41.7104 36.2567 41.57 36.3417C40.345 37.0883 39.4966 38.84 39.4633 40.6983C39.43 42.4567 40.1116 43.925 41.3266 44.7267C41.551 44.8747 41.7216 45.0911 41.8133 45.3438C41.9049 45.5964 41.9127 45.8719 41.8354 46.1293C41.7582 46.3868 41.6 46.6124 41.3843 46.7729C41.1687 46.9333 40.9071 47.02 40.6383 47.02Z" fill="#E2A62D" />
            <path d="M28.6316 4.53328C28.5462 4.4493 28.4355 4.39596 28.3166 4.38161C28.3166 4.38161 1.77662 -0.656721 0.628292 0.356612C-0.518372 1.37161 1.23329 28.3299 1.23329 28.3299C1.24162 28.4649 1.27162 28.5799 1.34496 28.6616C2.35162 29.8016 9.27494 25.3216 16.8099 18.6599C24.3466 11.9966 29.6382 5.67328 28.6316 4.53328Z" fill="#DD2E44" />
            <path d="M0.581644 0.451672C0.551536 0.516895 0.530238 0.585833 0.518311 0.656672C0.78331 2.94167 3.34331 21.7433 4.9383 27.62C7.33163 26.2817 9.7633 24.4633 12.62 22.1983C10.1933 17.7567 1.92997 0.243339 0.581644 0.451672Z" fill="#EA596E" />
            <path d="M49.8365 48.715L32.2149 46.5433C30.3316 46.3733 27.0199 46.3567 27.1899 43.3733C27.3449 40.6683 30.5899 41.085 32.9882 41.44L50.7182 44.3967L49.8365 48.715Z" fill="#3B88C3" />
            <path d="M50.7165 44.3983L43.6799 43.1916C42.8566 43.0433 42.1232 44.27 42.0866 45.5683C42.0449 47.0116 42.4649 47.7416 43.2966 47.9116L50.2032 48.765L50.7165 44.3983Z" fill="#88C9F9" />
            <path d="M58.1965 43.9017L53.8265 47.92L46.0149 39.425L50.3849 35.4067C51.4808 34.4046 52.9288 33.877 54.4125 33.9392C55.8961 34.0013 57.2949 34.6481 58.3032 35.7384L58.5282 35.9834C59.5299 37.0795 60.0572 38.5274 59.995 40.0109C59.9329 41.4945 59.2863 42.8932 58.1965 43.9017Z" fill="#3B88C3" />
            <path d="M53.8239 47.9223C55.7008 46.1966 55.4739 42.8959 53.317 40.5501C51.1602 38.2043 47.8901 37.7016 46.0132 39.4273C44.1363 41.1531 44.3632 44.4537 46.5201 46.7996C48.677 49.1454 51.947 49.6481 53.8239 47.9223Z" fill="#88C9F9" />
            <path d="M52.2614 46.223C53.1999 45.3602 52.9117 43.5198 51.6177 42.1124C50.3237 40.7051 48.5139 40.2637 47.5755 41.1265C46.637 41.9894 46.9252 43.8298 48.2192 45.2371C49.5132 46.6445 51.323 47.0859 52.2614 46.223Z" fill="#226699" />
            <path d="M4.16674 58.3333C5.54745 58.3333 6.66674 57.214 6.66674 55.8333C6.66674 54.4526 5.54745 53.3333 4.16674 53.3333C2.78603 53.3333 1.66675 54.4526 1.66675 55.8333C1.66675 57.214 2.78603 58.3333 4.16674 58.3333Z" fill="#55ACEE" />
            <path d="M48.3333 6.66667C50.1743 6.66667 51.6667 5.17428 51.6667 3.33333C51.6667 1.49238 50.1743 0 48.3333 0C46.4924 0 45 1.49238 45 3.33333C45 5.17428 46.4924 6.66667 48.3333 6.66667Z" fill="#55ACEE" />
            <path d="M8.10675 48.7433L4.21009 39.3833L0.686768 49.4583L8.10675 48.7433ZM43.3334 8.33334L36.6667 10L38.3334 3.33334L43.3334 8.33334Z" fill="#EA596E" />
            <path d="M53.3315 21.6667L59.9999 13.3317L54.9999 10L53.3315 21.6667Z" fill="#77B255" />
          </svg>
        </SuccessImg>
        <CloseModalButtonCorrect onClick={closeModal} />
      </>
    );
  } else {
    modalJsx = (
      <>
        <HeaderWrapperDefault>
          <ModalHeader>{title}</ModalHeader>
        </HeaderWrapperDefault>
        <ModalContent display="none">
          {children}
        </ModalContent>
        <CloseModalButtonDefault onClick={closeModal} />
      </>
    );
  }

  return (showModal
    && (
      <ModalContainer>
        <Background onClick={closeModal} />
        <animated.div style={animation}>
          <ModalWrapper showModal={showModal}>
            {modalJsx}
          </ModalWrapper>
        </animated.div>
      </ModalContainer>
    )
  );
}
Modal.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  children: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};
Modal.defaultProps = {
  children: '',
};
