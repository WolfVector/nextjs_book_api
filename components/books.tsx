import Image from 'next/image';
import Link from 'next/link'
import StarView from './starRating';
import React from 'react';

const Books = React.memo(({ children }: any) => {
  return (
    <div className="mt-24 grid grid-cols-3 gap-x-16 gap-y-24 mb-10">
      {children}
    </div>
  );
});

function Book({ book }: any) {
  return ( (book)
    ?
    <div>
      <div>
        <Image src={(book.volumeInfo.imageLinks) ? book.volumeInfo.imageLinks.thumbnail : '/J5LVHEL.jpg'} width={150} height={160} />
      </div>
      <div className="mt-1">
        <div>
          <Link href={`/volume/${book.id}`}>
            <a className="text-blue-500 hover:underline">{book.volumeInfo.title}</a>
          </Link>
        </div>
        <div className="text-sm italic dark:text-gray-400 text-neutral-400">{(book.volumeInfo.authors) ? book.volumeInfo.authors.join(", ") : 'Undefined' }</div>
        <StarView stars={book.volumeInfo.averageRating} />
      </div>
    </div>
    :
    <div></div>
  );
}

function toBookItems(items: any) {
  return items.map((book: any) => {
    return (
      <div key={book.id}>
        <Book book={book} />
      </div>
    );  
  });
}

Books.displayName = 'Books';
export default Books;
 export { Book, toBookItems }
