
const AWS = require('aws-sdk');

// // AWS SDK에 세션 토큰 설정
// const setAWSCredentials = (accessKeyId, secretAccessKey, sessionToken) => {
//     AWS.config.update({
//         accessKeyId,
//         secretAccessKey,
//         sessionToken,
//         region: "ap-northeast-2"
//     });
// };

// // EC2 인스턴스 생성 함수
// const createInstance = async () => {
//     const ec2 = new AWS.EC2();
    
//     const params = {
//       ImageId: "ami-008d41dbe16db6778",
//       InstanceType: "t2.micro",
//       KeyName: "",
//       MinCount: 1,
//       MaxCount: 1,
//       // 보안그룹 지정
//       SecurityGroupIds: [''],
//     };

//     try {
//         const data = await ec2.runInstances(params).promise();
//         console.log("인스턴스 생성 성공:", data.Instances);
//     } catch (error) {
//         console.error("인스턴스 생성 실패:", error.message);
//     }
// };

// // 사용 예
// const accessKeyId = ''; // 세션 토큰을 포함한 자격 증명
// const secretAccessKey = '';
// const sessionToken = '';

// setAWSCredentials(accessKeyId, secretAccessKey, sessionToken);
// createInstance();

// console.log(AWS.config.profile)

///////////////////////////////////////////////////////////////////////////////
//////////////////////// mfa 프로필로변경해서 ec2 생성 ////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


// process.env.AWS_PROFILE="mfa"
// AWS.config.credentials.profile= "mfa"
// // console.log(process.env.AWS_PROFILE)
// console.log(AWS.config.credentials.profile)
// console.log(AWS.config)


// 사용할 프로필 이름
const profileName = 'mfa'; // 변경할 프로필 이름

// SharedIniFileCredentials를 사용하여 프로필 설정
// new AWS.SharedIniFileCredentials = 프로필 변경 메서드
AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: profileName });

// AWS 서비스 사용 예시 (mfa 계정으로 변경됐는지 확인)
// AWS.config.getCredentials((err) => {
//     if (err) {
//         console.error("Error loading credentials:", err);
//     } else {
//         console.log("Credentials loaded successfully:", AWS.config.credentials);
//     }
// });

// 임시 region 설정
AWS.config.update({region: "ap-northeast-2" })

const createInstance = async () => {
    const ec2 = new AWS.EC2();
    
    const params = {
      // 이미지 ID
      ImageId: "ami-008d41dbe16db6778",
      // 인스턴스 type
      InstanceType: "t2.micro",
      // 키페어 이름 ( 확장자 X )
      KeyName: "",
      MinCount: 1,
      MaxCount: 1,
      // 보안그룹 지정, ID
      SecurityGroupIds: [''],
    };

    try {
        const data = await ec2.runInstances(params).promise();
        console.log("인스턴스 생성 성공:", data.Instances);
    } catch (error) {
        console.error("인스턴스 생성 실패:", error.message);
    }
};
createInstance();
