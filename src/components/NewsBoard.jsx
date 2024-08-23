// import { useEffect, useState } from "react";
// import NewsItem from "./NewsItem";

// const NewsBoard = ({category}) => {

//     const [articles, setArticle] = useState([]);

//     useEffect(() => {
//         let url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;
//         // let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_API_KEY}`
//         fetch(url)
//         .then(response => response.json())
//         .then(data=>setArticle(data.articles));

//     },[category])

//     return (
//         <div>
//             <h2 className="text-center">Latest<span className="badge bg-danger"> News</span></h2>
//             {
//                 articles.map((news, index) => {
//                     console.log(news)
//                     return <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url} />
                    
//                 })
//             }
//         </div>
//     );
// };

// export default NewsBoard;

import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchArticles();
  }, [category]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-center">
        Latest<span className="badge bg-danger"> News</span>
      </h2>
      {articles.length > 0 ? (
        articles.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        ))
      ) : (
        <p>No news available</p>
      )}
    </div>
  );
};

export default NewsBoard;
