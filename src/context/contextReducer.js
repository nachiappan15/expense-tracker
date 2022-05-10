const contexReducer = (state, action) => {
    let transactions
    switch (action.type) {
        case "delete":
             transactions = state.filter(i=> i.id !== action.payload)
             localStorage.setItem('transactions', JSON.stringify(transactions));
            return transactions
            
            break;
        case "add":
             transactions =[action.payload , ...state]
             localStorage.setItem('transactions', JSON.stringify(transactions));
            return transactions
        default:
            break;
    }
}
export default contexReducer