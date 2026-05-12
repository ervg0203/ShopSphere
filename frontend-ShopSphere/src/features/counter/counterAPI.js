import { API_URL } from "../../config";

export function fetchCount(amount = 1) {
  return new Promise(async (resolve) =>{
    const response = await fetch(API_URL) 
    const data = await response.json()
    resolve({data})
  }
  );
}
