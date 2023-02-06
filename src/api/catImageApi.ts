import requester from "./config/config";

export default async function CatImageApi(amount: number) {
  const response = await requester.get(`/images/search?limit=${amount}`);

  if (response.status !== 200) {
    alert("다시 시도해주세요.");
    return;
  }
  return response.data;
}
