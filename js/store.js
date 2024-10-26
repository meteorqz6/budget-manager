/**
 * dateList {
    date: new Date("2000-01-10").toLocaleDateString(),
    id: "2",
  }[]
 * detailList {
    2: {
       id: Date.now() + 1000,
       createAt: new Date(),
       description: "삼겹살",
       category: "식사",
       amount: 20000,
       fundsAtTheTime: 9978000,
     }[]
  }
 */
  export const store = {
    currentFunds: 0,
  
    isFirstEdit: true,
    todayId: 1,
  
    dateList: [
      {
        id: 1,
        date: new Date().toLocaleDateString(),
      },
    ],
    detailList: {},
  };
  
  export function updateStorage() {
    sessionStorage.setItem("store", JSON.stringify(store));
  }
  
  export function initStore() {
    const storage = sessionStorage.getItem("store"); // 아무것도 없다면 null 반환
    if (!storage) updateStorage(); // null 이면 updateStorage
  
    const { dateList, detailList, todayId, currentFunds, isFirstEdit } =
      JSON.parse(storage); // sessionStorage 에 있는 것을 가져와서 storage 에 저장
  
    store.currentFunds = currentFunds;
    store.isFirstEdit = isFirstEdit;
    store.dateList = dateList;
    store.detailList = detailList;
    store.todayId = todayId;
  }
  
  export function addNewHistory(newHistory) {
    try {
      // TODO:
      /**
       * - store의 detailList 새로 갱신
       * - store.currentFunds 새로 갱신
       */
      if (store.detailList[store.todayId]) {
        store.detailList[store.todayId].push(newHistory)
      } else {
        store.detailList[store.todayId] = [newHistory];
      }
      
      store.currentFunds -= newHistory.amount;
  
      updateStorage();
      return true;
    } catch (error) {
      alert(error);
      return false;
    }
  }
  
  export function removeHistory(dateId, itemId) {
    try {
      // TODO:
      /**
       * - store의 detailList 새로 갱신
       * - store.currentFunds 새로 갱신
       * filter 함수는 조건이 true 인 항목만 다시 배열로 만드는 역할
       */
      store.detailList[dateId] = store.detailList[dateId].filter(({id, amount}) => {
        if (id === Number(itemId)) {
          store.currentFunds += amount;
        }
        return id !== Number(itemId)
      })
  
      updateStorage();
      return true;
    } catch (error) {
      alert(error);
      return false;
    }
  }
  