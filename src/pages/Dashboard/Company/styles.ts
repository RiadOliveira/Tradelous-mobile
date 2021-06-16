import styled from 'styled-components/native';

interface EmployeeInterface {
    isAdmin: boolean;
}

export const Container = styled.View`
    background-color: #49b454;
    flex: 1;
    flex-direction: column;
    align-items: center;
    padding-bottom: 30px;
`;

export const CompanyContainer = styled.View`
    width: 80%;
    flex-direction: row;
    align-items: center;
    margin: 10% 0;
    position: relative;
`;

export const LogoContainer = styled.View`
    width: 100px;
    height: 100px;
    background-color: #5170e0;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
    border: 2px solid #1c274e;
`;

export const CompanyImage = styled.Image`
    width: 98px;
    height: 98px;
    border-radius: 49px;
`;

export const CompanyData = styled.View`
    background-color: #1c274e;
    height: 100px;
    width: 90%;
    justify-content: center;
    align-items: flex-start;
    position: absolute;
    left: 10%;
    border-radius: 20px;
`;

export const CompanyName = styled.Text`
    font-family: Poppins-Bold;
    font-size: 18px;
    color: #ffffff;
    margin-left: 30%;
`;

export const CompanyCNPJ = styled.Text`
    font-family: Poppins-Bold;
    font-size: 12px;
    color: #ffffff;
    margin-left: 30.5%;
`;

export const Employee = styled.View`
    width: 66%;
    flex-direction: row;
    position: relative;
    margin-bottom: 4%;
`;

export const EmployeeData = styled.View<EmployeeInterface>`
    background-color: ${props => (props.isAdmin ? '#1c274e' : '#2c3f82')};
    height: 60px;
    width: 97%;
    position: absolute;
    justify-content: center;
    align-items: flex-start;
    left: 5%;
    border-radius: 20px;
`;

export const EmployeeName = styled.Text`
    margin-left: 10px;
    font-family: Poppins-Bold;
    font-size: 14px;
    color: #ffffff;
    margin-left: 22%;
`;

export const EmployeeId = styled.Text`
    margin-left: 10px;
    font-family: Poppins-Bold;
    font-size: 8px;
    color: #ffffff;
    margin-left: 22.5%;
`;

export const EmployeeImage = styled.Image`
    width: 58px;
    height: 58px;
    border-radius: 29px;
`;

export const EmployeeIcon = styled.View<EmployeeInterface>`
    width: 60px;
    height: 60px;
    background-color: #5170e0;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    border: 2px solid ${props => (props.isAdmin ? '#1c274e' : '#2c3f82')};
`;
