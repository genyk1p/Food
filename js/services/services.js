// Запрос методом пост по определенному адресу
const postDataToDb = async function(url, json){
    const r = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: json
    });
    return  await r.json();
};
export {postDataToDb};