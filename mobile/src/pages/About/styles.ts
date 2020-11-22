import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  padding: 15px 30px;
  background: #fff;
  flex: 1;
`;

export const EncontreeLogo = styled.Image`
  margin: 10px auto 20px;
`;

export const EncontreeVersion = styled.Text`
  margin: 0 auto;
  font-size: 16px;
`;

export const AppDescription = styled.Text`
  margin-top: 40px;
  font-size: 16px;
  text-align: justify;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    margin-top: 35px;
    font-weight: ${theme.font.bold};
    font-size: 18px;
    margin-left: 10px;
  `}
`;

export const AuthorContainer = styled.View`
  margin-top: 10px;
  background: #fff;
  border-width: 2px;
  border-color: #c2d5ff;
  border-radius: 15px;
`;

export const AuthorDetail = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;

  border-bottom-width: 1px;
  border-bottom-color: #c2d5ff;
`;

export const AuthorImage = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  margin-right: 15px;
`;

export const AuthorName = styled.Text`
  font-size: 16px;
  color: #333;
`;

export const ContactContainer = styled.View`
  padding: 5px 30px 15px;
`;

export const ContactItem = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
`;

export const ContactText = styled.Text`
  margin-left: 5px;
  color: #333;
`;

export const AdvisorContainer = styled.View`
  margin-top: 10px;
  background: #fff;
  border-width: 2px;
  border-color: #c2d5ff;
  border-radius: 15px;
`;

export const AdvisorDetail = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;

  border-bottom-width: 1px;
  border-bottom-color: #c2d5ff;
`;

export const AdvisorName = styled.Text`
  font-size: 16px;
  color: #333;
`;

export const AdvisorContact = styled.View`
  padding: 5px 30px 15px;
`;

export const AppRepository = styled.View`
  margin: 35px auto 0;
  flex-direction: row;
  align-items: center;
`;

export const AppRepositoryLink = styled.Text`
  margin-left: 5px;
  color: #333;
`;

export const ReleaseDate = styled.Text`
  margin: 15px auto 0;
  color: #333;
`;
