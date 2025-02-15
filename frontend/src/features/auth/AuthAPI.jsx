export default function AuthSlice() {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await fetch();
      const data = await resp.json();
      resolve({ data });
    } catch (error) {
      console.log("Auth Slice Error ");
    }
  });
}
