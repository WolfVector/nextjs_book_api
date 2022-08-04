import Image from 'next/image';

const GoogleAPI: string = process.env.NEXT_PUBLIC_GOOGLE_KEY as string;

async function handleAsyncReq(obj_req: any) {
  console.log(GoogleAPI);
  obj_req.url += GoogleAPI;

  let res = await fetch(obj_req.url, obj_req.body);
  return ((res.ok == false) ? false : await res.json());
}

export { handleAsyncReq };
