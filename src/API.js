const BASE_URL =
  " https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev/";
const fetchData = async (query) => {
  try {
    const result = await fetch(BASE_URL + `languages?keyword=${query}`);
    if (!result.ok) throw new Error("API ERROR");
    return result.json();
  } catch (error) {
    throw error;
  }
};

export default fetchData;
