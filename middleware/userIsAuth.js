export default async ({store}) => {
    let reqToken = localStorage.getItem('reqToken')
    reqToken == '' ? store.commit('SET_TOKEN', '87f4') : store.commit('SET_TOKEN', reqToken)
}