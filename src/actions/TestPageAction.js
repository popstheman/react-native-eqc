
export const testUpdate = ({prop, value}) => {
    return{
        type: "testUpdate",
        payload: {prop, value}
    }
}