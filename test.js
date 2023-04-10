const urls = [
  "Hello", "world", "Le Dang Khanh"
];

const result = async (urls)=>{
    const lists = await Promise.all(new Promise.resolve(urls)).then(data=>{return data})
    return lists
}

console.log(result())



