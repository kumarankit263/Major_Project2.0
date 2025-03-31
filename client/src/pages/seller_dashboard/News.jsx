import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
// import './App.css'; // Ensure Tailwind CSS is imported

const News = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const loader = useRef(null);

  const fetchNews = async (pageNum) => {
    try {
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
            q: 'India Mandi News OR harvest OR crop insurance OR subsidy OR agriculture OR farmer OR farming OR government farmer OR crop harvest OR crop insurance OR subsidy',
            apiKey: 'e74fdafcca464b7c8186e1541204fa4a',
            language: 'en',
            pageSize: 6,
            page: pageNum,
          }, 
          
      });
      console.log("response:",response);
      setNews((prevNews) => [...prevNews, ...response.data.articles]);
      if (response.data.articles.length === 0) setHasMore(false);
    } catch (err) {
      setError('Failed to fetch news. Please try again later.');
    }
  };

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore]);

  useEffect(() => {
    fetchNews(page);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1.0 });
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  const bankDetails = [
    { name: 'Central Bank of India', rate: 'MCLR + 1.35%', fee: 'Up to 1% of the loan amount', link: 'https://www.centralbankofindia.co.in/' },
    { name: 'IndusInd Bank', rate: '9.10% onwards', fee: 'Up to 2% + GST', link: 'https://www.indusind.com/' },
    { name: 'HDFC Bank', rate: '9.10% - 16.05% p.a.', fee: '2% to 4% or Rs.2,500', link: 'https://www.hdfcbank.com/' },
    { name: 'Federal Bank', rate: 'At the discretion of the bank', fee: 'As per lender\'s terms', link: 'https://www.federalbank.co.in/' },
    { name: 'Union Bank of India', rate: 'Based on credit rating and loan amount', fee: 'As per lender\'s terms', link: 'https://www.unionbankofindia.co.in/' },
    { name: 'Karur Vysya Bank', rate: 'One year MCLR + 0.35%', fee: 'As per lender\'s terms', link: 'https://www.kvb.co.in/' },
    { name: 'UCO Bank', rate: 'Base Rate, Simple rate at half yearly rest', fee: 'As per lender\'s terms', link: 'https://www.ucobank.com/' },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="relative w-full min-h-screen bg-gradient-to-r from-teal-400 to-yellow-200 p-0 m-0 flex justify-center items-center">
        <div className="w-full p-8">
          <button onClick={() => setIsOpen(!isOpen)} className="mb-4 p-3 text-white bg-gradient-to-br from-green-400 to-teal-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-teal-200 dark:focus:ring-black-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            {isOpen ? 'Hide Interest Rates' : 'Show Interest Rates'}
          </button>
          {isOpen && (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-8">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Bank Name</th>
                    <th className="px-6 py-3">Interest Rate</th>
                    <th className="px-6 py-3">Processing Fee</th>
                    <th className="px-6 py-3">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {bankDetails.map((bank, index) => (
                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{bank.name}</td>
                      <td className="px-6 py-4">{bank.rate}</td>
                      <td className="px-6 py-4">{bank.fee}</td>
                      <td className="px-6 py-4 text-blue-600 underline">
                        <a href={bank.link} target="_blank" rel="noopener noreferrer">Visit</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex flex-wrap w-full mb-4 p-4 mt-0">
            <div className="w-full mb-6 lg:mb-0">
              <h1 className="sm:text-6xl text-7xl font-extrabold title-font mb-4 text-gray-900 text-center flex items-center justify-center">
                🌾 <span className="mx-2">Farming News</span> 🌿
              </h1>
              <div className="h-1 w-36 bg-indigo-600 rounded mx-auto"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              news.map((article, index) => (
                <div key={index} className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-full">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      className="w-full object-cover"
                      src={article.urlToImage || 'https://via.placeholder.com/720x400'}
                      alt={article.title}
                    />
                  </div>
                  <div className="p-4">
                    <h6 className="mb-2 text-slate-800 text-xl font-semibold">{article.title}</h6>
                    <p className="text-slate-600 leading-normal font-light">{article.description || 'No description available.'}</p>
                  </div>
                  <div className="px-4 pb-4">
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      <button className="rounded-md bg-slate-800 py-2 px-4 text-white transition-all shadow-md hover:shadow-lg">Read more</button>
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>

          {hasMore && <div ref={loader} className="text-center my-4">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          </div>}
        </div>
      </div>
    </section>
  );
};

export default News;