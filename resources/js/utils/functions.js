import saveAs from 'file-saver';

export const groupBy = (array, group) => {
    const grouped = {};
    array.forEach((item) => {
        grouped[item[group]]=[...(grouped[item[group]]||[]), item];
    })
    return grouped;
}

export const makeOptions = (array, obj={}) => {
    return array.map((item, i)=>{
        return { value: (obj.value)?item[obj.value]:item, label: (obj.label)?item[obj.label]:item }
    });
}

export const optionByValue = (val, arr) => {
    if(val!='') {
        const option = arr.find(e => e.value==val);
        return option || {value:val, label:val};
    }
    return false;
}
