import type { NextPage } from 'next';
import { useState, useEffect, useRef } from 'react';
import Layout from "../components/layout"
import { handleAsyncReq } from '../lib/util';
import { alertMessage } from "../components/alert";
import Books, {toBookItems } from '../components/books';
import { ThreeDots } from  'react-loader-spinner';

const MAX_RESULTS: number = 9;

const Home: NextPage = () => {
  /**/
  let [bookItems, setBookItems] = useState< Array<any> >([]);
  let [inputBook, setInputBook] = useState<string>("");
  let [loadingAnim, setLoadingAnim] = useState<any>(null);

  let startIndexRef = useRef<number>(0);
  let loadRef = useRef<boolean>(false);
  
  const handleLoading = () => { return <ThreeDots color="#8c8b8b" height={80} width={60} /> }

  function handleEnter(e: any) {
    if(e.key === "Enter") 
      getBooks();
  } 

  function getBooks() {
    startIndexRef.current = 0;
    makeAPIReq([])
  }

  async function makeAPIReq(items: any) {
    setLoadingAnim(handleLoading());
  
    let res = await handleAsyncReq({ 
      url: `https://www.googleapis.com/books/v1/volumes?q=${inputBook}&startIndex=${startIndexRef.current}&maxResults=${MAX_RESULTS}&fields=kind,items(id,volumeInfo(title, authors, averageRating, imageLinks/thumbnail))&key=`,
      body: {}
    });

    setLoadingAnim(null);

    if(res === false) 
      alertMessage({ message: "Something went wrong", icon: 'error' });
    else {
      setBookItems([...items, ...toBookItems(res.items)]);
      loadRef.current = true;
    }
  }

  function handleScroll() {
    const bottom: boolean = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;

    /*
      If user is at bottom, make request and block until fulfilled using loadingAnim
    */
    if(bottom && loadRef.current && loadingAnim === null)  {
      startIndexRef.current += MAX_RESULTS;
      makeAPIReq(bookItems)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  });

  return (
    <Layout>
      <div>
        <div className="text-center">
          <h1 className="text-5xl italic">Books</h1>
          <div className="mt-4">
            <input 
              type="text" 
              className="bg-white rounded w-1/2 py-1 px-2 text-black dark:bg-slate-200" placeholder="Search..." 
              value={inputBook}
              onChange={(evt: any) => setInputBook(evt.target.value)}
              onKeyDown={handleEnter}
            />
          </div>
        </div>

          <div className="relative ml-28">
            <div className="fixed bottom-0 z-10 left-1/2"><span>{loadingAnim}</span></div>
            <Books>{bookItems}</Books>
          </div>
        
      </div>
    </Layout>
  );
}

export default Home
