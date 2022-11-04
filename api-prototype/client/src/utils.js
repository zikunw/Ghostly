import axios, * as others from 'axios';

export async function getBook(data) {
    const res = await axios.get('http://localhost:3080/api/getbook', { params: { title: data } });
    return res.data;
}