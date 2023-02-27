
export const EditData =(data,id,posts)=>{
    const newData = data.map(item=>item._id === id ? posts :item)
    return newData
}

export const DeleteData=(data,id)=>{
    const newData = data.filter(item=>item._id !== id)
    return newData
}