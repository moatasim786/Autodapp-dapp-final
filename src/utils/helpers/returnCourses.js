import {coursesApi} from "../api/courses";

export const returnCourses = () => {
    return Promise.allSettled([coursesApi.getCourses(), coursesApi.getRUR()])
        .then(res => res.map(el => el.value?.data))
        .then(data => {
            let newCourse = [];

            data.forEach(el => {
                if (el?.RAW) {
                    const newArr = Object.entries(el?.RAW);
                    newArr.forEach(([key, value]) => {
                        if (key === 'BTC' || key === 'ETH') {
                            newCourse.push({ key, price: value?.USD?.PRICE})
                        }
                    })
                } else {
                    if (el?.Valute?.USD?.Value) {
                        newCourse.push({key: 'RUR', price: el?.Valute?.USD?.Value})
                    }
                }
            })
            return newCourse
        })
}