// 프로젝트 페이지로 이동하는 함수
function navigateToProject(projectName) {
    switch(projectName) {
        case 'Vanilla_JS_Project':
            window.location.href = 'Vanilla JS Project/index.html';
            break;
        case 'FlappyBall':
            window.location.href = 'GameCoding/FlappyBall/index.html';
            break;
        case 'Password_Generator':
            window.location.href = 'Vanilla_JS_Project/Password_Generator/index.html';
            break;
        case 'QR-code-generate':
            window.location.href = 'Vanilla_JS_Project/QR-Code/index.html';
            break;
        case 'text-editor':
            window.location.href = 'Vanilla_JS_Project/TextEditor/index.html';
            break;    
        default:
            console.log('페이지를 찾을 수 없습니다.');
    }
}