import type { PageServerLoad } from "./$types";
export const load: PageServerLoad = async ({ request }) => {
  // const queryParams = new URL(request.url).searchParams;
  // const token = queryParams.get("t");
  // const values = AES.decrypt(token ?? "", ENCRYPTION_KEY);
  // const value = values.toString(enc.Utf8);
  // if (value.length === 0) {
  //   throw error(
  //     StatusCodes.NOT_FOUND,
  //     "The page you are looking for cannot be found."
  //   );
  // }
  // const obj = JSON.parse(value);
  // if (Date.now() > obj?.expire ?? 0) {
  //   throw error(
  //     StatusCodes.NOT_FOUND,
  //     "The page you are looking for cannot be found."
  //   );
  // }
};
