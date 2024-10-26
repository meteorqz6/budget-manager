export function toShow(node) {
  // .className -> node 에 있는 클래스명을 문자열로 바꿈 
  // .replace -> 문자열로 바뀐 클래스명 중 제일 먼저 있는 v-none 을 v-show 로 바꿈
  node.className = node.className.replace("v-none", "v-show");
}

export function toHidden(node) {
  node.className = node.className.replace("v-show", "v-none");
}

export function validatePrice(currentFunds, currentAmount) {
  // TODO: 금액이 현재 자산보다 이하인지
  return currentFunds >= currentAmount;
}

export function validateRequired({ category, description, price }) {
  // TODO: 값이 존재하는지
  return Boolean(category) && Boolean(description) && Boolean(price) && price > 0 ;
}