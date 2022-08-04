import Layout from '../../components/layout';
import { handleAsyncReq } from '../../lib/util';
import { alertMessage } from "../../components/alert";
import { Book } from '../../components/books';

const GoogleAPI: string = process.env.GOOGLE_KEY as string;

export default function Volume(props: any) {
  if(props.data === false)
    alertMessage({ message: "Something went wrong", icon: 'error' });

  return (
    <Layout>
      <div className="grid grid-cols-2 gap-x-10">
        <Book book={props.data} />
        <div>{ props.data.description }</div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }: any) {
  let res = await handleAsyncReq({ 
    url: `https://www.googleapis.com/books/v1/volumes/${params.volume}&fields=kind,items(id,volumeInfo(title, authors, averageRating, imageLinks/thumbnail, description))&key=${GoogleAPI}`,
    body: {}
  });

  return { props: { data: ((res === false) ? false : res) } }
}
