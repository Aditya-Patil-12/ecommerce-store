// this will be an API call to Respective thing
export function productListAPI() {
  return new Promise(async (resolve) => {
    // console.log("entered to fetch data");
    const response = await fetch(
      "http://localhost:5000/api/v1/product/getAllProducts"
    );
    const data = await response.json();
    // console.log("data received", data);
    resolve({ data });
  });
}
