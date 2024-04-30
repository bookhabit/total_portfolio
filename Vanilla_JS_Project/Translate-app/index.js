const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchageIcon = document.querySelector(".exchange");
const selectTag = document.querySelectorAll("select");
const icons = document.querySelectorAll(".row i");
const translateBtn = document.querySelector("button");

selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected = id == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "de-DE" ? "selected" : "";
        // option태그 selected를 주어 select드롭다운에서 선택
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        // 지정된 텍스트를 HTML로 파싱하여 결과 노드들을 지정된 위치의 DOM트리에 삽입
        // "beforebegin" 요소 이전에 위치합니다. 오직 요소가 DOM 트리에 있고 부모 요소를 가지고 있을 때만 유효합니다.
        tag.insertAdjacentHTML("beforeend", option);
    }
});

exchageIcon.addEventListener("click",()=>{
    let tempText = fromText.value,
        tempLang = selectTag[0].value
    
        fromText.value = toText.value;
        toText.value = tempText;
        selectTag[0].value = selectTag[1].value;

})