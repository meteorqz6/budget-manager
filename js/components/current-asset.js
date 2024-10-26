import { store, updateStorage } from "../store";
import { toHidden, toShow } from "../util";

const $currentAssetInput = document.querySelector(".current-asset-input");
const $currentAssetValue = document.querySelector(".current-asset-value");
const $currentAssetButton = document.querySelector(".current-asset-button");
const $addItemButton = document.querySelector(".add-item-button");

export function initCurrentAsset() {
  renderCurrentAsset();
  addCurrentAssetEventListener();
}

function addCurrentAssetEventListener() {
  $currentAssetValue.addEventListener("click", function (event) {
    console.log(event.target);
    if (!store.isFirstEdit) return; // 처음 자산을 입력할 때만 input 할 수 있도록
    toHidden(event.target); // 읽기 전용 숨김
    toShow($currentAssetInput); // 입력창 보이게
    toShow($currentAssetButton); // 버튼 보이게

    $currentAssetInput.focus();
  });

  $currentAssetButton.addEventListener("click", function (event) {
    toHidden(event.target); // 버튼 클릭하면 숨기기 -> 입력이 완료 됐으니
    toHidden($currentAssetInput); // 입력창 숨기기
    toShow($currentAssetValue); // 읽기 전용 보이게
    toShow($addItemButton); // 내역 추가 버튼 활성화

    store.currentFunds = Number($currentAssetInput.value); // 입력값 업뎃
    renderCurrentAsset();

    store.isFirstEdit = false; // 한 번 입력 받았으니 false 로 바꿈

    updateStorage(); // sessionStorage 에 바뀐값들 업뎃
  });
}

export function renderCurrentAsset() {
  // TODO: 숫자에 콤마 작성 -> toLocaleString 사용
  // TODO: currentFunds가 없는 경우 -> if 문 / 삼항연산자 / 옵셔널 체이닝
  /*
  $currentAssetValue.textContent = store.currentFunds 
  ? store.currentFunds.toLocaleString()
  : "-";
  */
  $currentAssetValue.textContent = store.currentFunds?.toLocaleString() ?? "-";
  $currentAssetInput.value = store.currentFunds;
}